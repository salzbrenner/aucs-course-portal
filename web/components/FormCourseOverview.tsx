import React, {
  ChangeEvent,
  Component,
  FormEvent,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import {
  convertFromHTML,
  EditorState,
  ContentState,
} from 'draft-js';
import { CourseProps } from '../hoc/withCourseData';
import { AppActionType } from '../state/context.interfaces';
import { AppContext } from '../state';
import { coursesActions } from '../state/reducers/coursesReducesr';
import { ApiAuthInterface } from '../lib/api-auth.service';

export interface FormCourseOverviewProps
  extends CourseProps {
  submitHandler:
    | ApiAuthInterface['createCourse']
    | ApiAuthInterface['updateCourse'];
  submitActionType?: AppActionType;
  emptyCid?: '';
}

class EditorConvertToHTML extends Component<
  FormCourseOverviewProps
> {
  static contextType = AppContext;
  state: any = {
    description: this.getContent(),
    name: this.props.name,
    cid: this.props.cid,
    instructor: this.props.instructor,
    emptyCid: this.props.emptyCid,
    canSubmit: true,
    prereq: this.props.prereq,
  };

  constructor(props: FormCourseOverviewProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePrereqChange = this.handlePrereqChange.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPreReqGroup = this.addPreReqGroup.bind(this);
  }

  getContent() {
    if (this.props.description) {
      try {
        const contentState = ContentState.createFromBlockArray(
          convertFromHTML(this.props.description!) as any
        );
        return EditorState.createWithContent(contentState);
      } catch (e) {
        return EditorState.createEmpty();
      }
    } else {
      return EditorState.createEmpty();
    }
  }

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      description: editorState,
    });
  };

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlePrereqChange(
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    const { value } = event.target;
    this.setState({
      prereq: {
        ...this.state.prereq,
        [key]: value,
      },
    });
  }

  addPreReqGroup() {
    this.setState({
      prereq: {
        ...this.state.prereq,
        [Object.keys(this.state.prereq).length]: '',
      },
    });
  }

  deletePreReqGroup(key: string) {
    const { [key]: toDelete, ...rest } = this.state.prereq;
    this.setState({
      prereq: {
        ...rest,
      },
    });
  }

  prereqAreValid(prereq: any): boolean {
    let valid = true;
    Object.keys(prereq).forEach(key => {
      const numbers = prereq[key].trim().split(' ');
      if (numbers[0] !== '') {
        numbers.forEach((courseNumber: string) => {
          if (courseNumber.search(/^\d+$/)) {
            valid = false;
          }
        });
      }
    });

    return valid;
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const {
      name,
      instructor,
      cid,
      description,
      prereq,
    } = this.state;

    if (!this.prereqAreValid(prereq)) {
      alert(
        'Make sure prereq are space separated numbers only'
      );
      return;
    }

    this.setState({
      canSubmit: false,
    });

    // post to api
    const res = await this.props.submitHandler(
      name,
      instructor,
      stateToHTML(description.getCurrentContent()),
      cid,
      prereq
    );

    // update state/context
    const { submitActionType } = this.props;
    if (submitActionType) {
      const [{}, dispatch] = this.context;

      dispatch({
        type: submitActionType,
        payload: {
          name,
          instructor,
          cid,
          description,
          prereq,
        },
      });

      if (submitActionType === coursesActions.ADD_COURSE) {
        this.setState({
          description: EditorState.createEmpty(),
          name: '',
          cid: '',
          instructor: '',
          canSubmit: true,
          prereq: { 0: '' },
        });
      } else if (
        submitActionType === coursesActions.UPDATE_COURSE
      ) {
        this.setState({ canSubmit: true });
      }
    }
  }

  render() {
    const {
      description,
      name,
      cid,
      canSubmit,
      instructor,
      prereq,
    } = this.state;

    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label
              htmlFor="name"
              className={'form-control-label'}
            >
              <span>Name</span>
              <input
                type="text"
                name={'name'}
                value={name}
                required={true}
                onChange={this.handleChange}
              />
            </label>

            <div>
              <label
                htmlFor="cid"
                className={'form-control-label'}
              >
                <span>Course ID</span>
                <input
                  type="number"
                  name={'cid'}
                  value={cid}
                  required={true}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="instructor"
                className={'form-control-label'}
              >
                <span>Instructor</span>
                <input
                  type="text"
                  name={'instructor'}
                  value={instructor}
                  required={true}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <Editor
              defaultEditorState={description}
              editorClassName={'editor'}
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                inline: {
                  options: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'monospace',
                  ],
                },
              }}
            />

            {Object.keys(prereq).map(key => (
              <div key={key}>
                <label className={'form-control-label'}>
                  <span>Prereqs group</span>
                  <input
                    type="text"
                    name={`prereq-group-${key}`}
                    value={prereq[key]}
                    onChange={e =>
                      this.handlePrereqChange(e, key)
                    }
                  />
                </label>
                <div>
                  Enter course numbers, separated by space
                </div>

                <button
                  onClick={() =>
                    this.deletePreReqGroup(key)
                  }
                >
                  delete group
                </button>
              </div>
            ))}

            <div className={'mt-30'}>
              <button
                onClick={this.addPreReqGroup}
                type={'button'}
              >
                add group
              </button>
            </div>

            <input
              type="submit"
              value="Submit"
              className={'button mt-30'}
              disabled={!canSubmit}
            />
          </form>

          <style jsx global>{`
            .editor {
              padding: 10px;
              min-height: 500px;
              background: white;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default EditorConvertToHTML;
