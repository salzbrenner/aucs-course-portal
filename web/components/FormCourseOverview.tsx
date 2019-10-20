import React, {
  ChangeEvent,
  Component,
  FormEvent,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import {
  convertFromHTML,
  EditorState,
  ContentState,
} from 'draft-js';
import { createCourse } from '../lib/api-auth.service';
import { CourseProps } from './CourseContainer';

export interface FormCourseOverviewProps
  extends CourseProps {}

class EditorConvertToHTML extends Component<
  FormCourseOverviewProps
> {
  state = {
    description: this.getContent(),
    name: this.getCourseData().name,
    cid: this.getCourseData().cid,
    instructor: this.getCourseData().instructor,
    canSubmit: true,
  };

  constructor(props: CourseProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getContent() {
    if (this.getCourseData().description) {
      const contentState = ContentState.createFromBlockArray(
        convertFromHTML(
          this.getCourseData().description!
        ) as any
      );
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  }

  getCourseData() {
    return this.props.courseData;
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

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState({
      canSubmit: false,
    });

    const {
      name,
      instructor,
      cid,
      description,
    } = this.state;

    const res = await createCourse(
      name,
      cid!,
      instructor,
      stateToHTML(description.getCurrentContent())
    );

    this.setState({ canSubmit: true });
  }

  render() {
    const {
      description,
      name,
      cid,
      canSubmit,
      instructor,
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
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <Editor
              toolbarClassName="demo-toolbar-absolute"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              defaultEditorState={description}
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
                  // bold: {
                  //   className: 'bordered-option-classname',
                  // },
                  // italic: {
                  //   className: 'bordered-option-classname',
                  // },
                  // underline: {
                  //   className: 'bordered-option-classname',
                  // },
                  // strikethrough: {
                  //   className: 'bordered-option-classname',
                  // },
                  // code: {
                  //   className: 'bordered-option-classname',
                  // },
                },
                // blockType: {
                //   className: 'bordered-option-classname',
                // },
                // fontSize: {
                //   className: 'bordered-option-classname',
                // },
                // fontFamily: {
                //   className: 'bordered-option-classname',
                // },
              }}
            />
            <input
              type="submit"
              value="Submit"
              className={'button mt-30'}
              disabled={!canSubmit}
            />
          </form>
        </div>
      </>
    );
  }
}

export default EditorConvertToHTML;
