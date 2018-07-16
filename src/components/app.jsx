import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import '../css/main.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD',
    ));
  }

  render() {
    return (
      <div className="content">
        <h1>Doc Clone!</h1>
        <button onClick={() => this.onBoldClick()}>Bold</button>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>);
  }
}
