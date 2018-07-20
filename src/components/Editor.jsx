import React from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw,convertToRaw, ContentState } from 'draft-js';
import ColorPicker, { colorPickerPlugin } from 'draft-js-color-picker';
import { Link } from 'react-router-dom';


function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'right') {
    return 'alignRight';
  } else if (type === 'center') {
    return 'alignCenter';
  } return 'alignLeft';
}

const numbers = ['8px', '10px', '12px', '14px', '18px', '24px', '30px', '36px', '48px'];
const fonts = ['Times New Roman', 'Arial', 'Helvetica', 'Courier', 'Verdana', 'Georgia', 'Comic Sans MS', 'Impact'];

const styleMap = {
  UPPERCASE: {
    textTransform: 'uppercase',
  },
  LOWERCASE: {
    textTransform: 'lowercase',
  },
  '8px': {
    fontSize: '8px',
  },
  '10px': {
    fontSize: '10px',
  },
  '12px': {
    fontSize: '12px',
  },
  '14px': {
    fontSize: '14px',
  },
  '18px': {
    fontSize: '16px',
  },
  '24px': {
    fontSize: '18px',
  },
  '30px': {
    fontSize: '20px',
  },
  '36px': {
    fontSize: '22px',
  },
  '48px': {
    fontSize: '24px',
  },
  'Times New Roman': {
    fontFamily: 'Times New Roman',
  },
  Arial: {
    fontFamily: 'Arial',
  },
  Helvetica: {
    fontFamily: 'Helvetica',
  },
  Courier: {
    fontFamily: 'Courier',
  },
  Verdana: {
    fontFamily: 'Verdana',
  },
  Georgia: {
    fontFamily: 'Tahoma',
  },
  'Comic Sans MS': {
    fontFamily: 'Comic Sans MS',
  },
  Impact: {
    fontFamily: 'Impact',
  },
};
// Colors for fonts
const presetColors = [
  '#ff00aa',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      editorState: EditorState.createEmpty(),
    //  doc: this.props.location.state.doc
    };
    this.onChange = editorState => {
      this.setState({ editorState })
    };
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
  }

  componentDidMount(){
    fetch('http://localhost:3000/doc/find?_id='+this.props.location.state.id, {
      credentials: 'same-origin' // <- this is mandatory to deal with cookies
    })
    .then(resp => resp.json())
    .then(json =>{
      console.log(json.content);
      this.setState({title:json.docName })
      if(json.content){
        console.log("rv there yet")
        console.log(json.content)
        // var blocks = convertFromRaw(json.content);
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(json.content))),
        })
      }
      // if(json.content.length>0){
      // console.log("json is: ",json);
      // const editorState1 = EditorState.createWithContent(JSON.parse(json.content[json.content.length-1]))
      // console.log("edit state is", editorState1)
    }
    )
  }

  toggleInlineStyle(e, inlineStyle) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  toggleBlockType(e, blockType) {
    e.preventDefault();
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  // toggleFontSize(e, size) {
  //   e.preventDefault();
  //   this.onChange();
  // }
  onSave(){
    // let saveContent = JSON.stringify(this.state.editorState.getCurrentContent())
    let saveContent = convertToRaw(this.state.editorState.getCurrentContent());
    console.log(this.state.editorState.getCurrentContent().getPlainText())
    console.log(saveContent);
    fetch('http://localhost:3000/doc/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // <- this is mandatory to deal with cookies
      body: JSON.stringify({
        _id: this.props.location.state.id,
        content: JSON.stringify(saveContent),
      })
    })
    .then(resp=>resp.json())
    .then(json=>console.log('it worked!'+ json))
  }


  render() {
    return (
      <div className="editorPage">
        <h2>{this.state.title}</h2>
        <div className="toolbar">
          <button className="btn" onClick={()=>this.onSave()}>Save</button>
          <button className="btn" onClick={()=>this.props.history.goBack()}>Back</button>
          <button className="btn" onClick={e => this.toggleInlineStyle(e, 'BOLD')}><i className="fa fa-bold" /></button>
          <button className="btn" onClick={e => this.toggleInlineStyle(e, 'ITALIC')}><i className="fa fa-italic" /></button>
          <button className="btn" onClick={e => this.toggleInlineStyle(e, 'UNDERLINE')}><i className="fa fa-underline" /></button>
          <button className="btn" onClick={e => this.toggleInlineStyle(e, 'STRIKETHROUGH')}><i className="fa fa-strikethrough" /></button>
          <button className="btn" onMouseDown={e => this.toggleInlineStyle(e, 'UPPERCASE')}>abc</button>
          <button className="btn" onMouseDown={e => this.toggleInlineStyle(e, 'LOWERCASE')}>ABC</button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'unordered-list-item')}><i className="fa fa-list-ul" /></button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'ordered-list-item')}><i className="fa fa-list-ol" /></button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'header-one')}> H1 </button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'header-two')}> H2</button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'header-three')}> H3 </button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'left')}><span className="glyphicon glyphicon-align-left" /></button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'right')}><span className="glyphicon glyphicon-align-right" /></button>
          <button className="btn" onMouseDown={e => this.toggleBlockType(e, 'center')}> <span className="glyphicon glyphicon-align-center" /></button>
          <select onChange={e => this.toggleInlineStyle(e, e.target.value)}>
            {numbers.map(item => <option key={item}>{item}</option>)}
          </select>
          <select onChange={e => this.toggleInlineStyle(e, e.target.value)}>
            {fonts.map(item => <option key={item}>{item}</option>)}
          </select>
          <ColorPicker
            toggleColor={color => this.picker.addColor(color)}
            presetColors={presetColors}
            color={this.picker.currentColor(this.state.editorState)}
          />
          <button onClick={this.picker.removeColor}>clear</button>
        </div>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            customStyleFn={this.picker.customStyleFn}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
          />
        </div>
      </div>
    );
  }
}
