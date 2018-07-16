import React from 'react';

import { Editor, EditorState, RichUtils } from 'draft-js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
  }
  boldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'BOLD'));
  }

  italicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'ITALIC',
    ));
  }
  underClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState, 'UNDERLINE',
    ));
  }
  render() {
    return (<div>
      <h2>Doc Clone</h2>
      <button onClick={() => this.boldClick()}>Bold</button>
      <button onClick={() => this.italicClick()}>Italic</button>
      <button onClick={() => this.underClick()}>Underline</button>
      <div className="editor">
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    </div>);
  }
}
