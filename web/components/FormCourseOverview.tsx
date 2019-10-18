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
  convertToRaw,
  EditorState,
  ContentState,
} from 'draft-js';

const contentBlocks = convertFromHTML(
  '<p>Lorem <h1>ipsum</h1> ' +
    'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
    'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
    'commodo quis dolor in, sagittis scelerisque nibh. ' +
    'Suspendisse consequat, sapien sit amet pulvinar  ' +
    'tristique, augue ante dapibus nulla, eget gravida ' +
    'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
    'accumsan. Vivamus porta cursus libero vitae mattis. ' +
    'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
    'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>'
);
const sampleEditorContent = ContentState.createFromBlockArray(
  contentBlocks as any
);

class EditorConvertToHTML extends Component {
  state = {
    description: EditorState.createWithContent(
      sampleEditorContent
    ),
    name: '',
    cid: '',
    instructor: '',
    canSubmit: true,
  };

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onEditorStateChange = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    console.log(html);

    this.setState({
      description: editorState,
    });
  };

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log(name);
    this.setState({ [name]: value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    this.setState({
      canSubmit: false,
    });

    setTimeout(
      () => this.setState({ canSubmit: true }),
      1000
    );
    // TODO: form response
    event.preventDefault();
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
            <div>
              <label htmlFor="name">
                Name of Class
                <input
                  type="text"
                  name={'name'}
                  value={name}
                  required={true}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div>
              <label htmlFor="cid">
                Course ID
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
              <label htmlFor="instructor">
                Instructor
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
              toolbarClassName="demo-toolbar-absolute"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarOnFocus
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
                  bold: {
                    className: 'bordered-option-classname',
                  },
                  italic: {
                    className: 'bordered-option-classname',
                  },
                  underline: {
                    className: 'bordered-option-classname',
                  },
                  strikethrough: {
                    className: 'bordered-option-classname',
                  },
                  code: {
                    className: 'bordered-option-classname',
                  },
                },
                blockType: {
                  className: 'bordered-option-classname',
                },
                fontSize: {
                  className: 'bordered-option-classname',
                },
                fontFamily: {
                  className: 'bordered-option-classname',
                },
              }}
            />
            <input
              type="submit"
              value="Submit"
              disabled={!canSubmit}
            />
          </form>
        </div>
      </>
    );
  }
}

export default EditorConvertToHTML;
