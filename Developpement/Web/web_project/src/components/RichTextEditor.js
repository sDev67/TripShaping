import React, { useEffect, useState } from "react";
import {  Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField } from "@mui/material";



const RichTextEditor = ({setValue, value}) => 
{
  const [state, setState] = useState([
    {
      editorState:EditorState.createEmpty
    }
  ])

  /*const content = window.localStorage.getItem('content');*/
  const content = value;

  useEffect(() => {

    if(content !== null){
  
      setState({editorState:EditorState.createWithContent(convertFromRaw(JSON.parse(content)))});

    }
    else{

      setState({editorState:EditorState.createEmpty()});

    }

  }, [content])

  
   

 
   const onChange = (editorState) =>{
   
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);
    setState({
      editorState,
  });
   }
   const saveContent = (content) => {
      //window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
      setValue(JSON.stringify(convertToRaw(content)));
  }
    return (
        <div>
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            <Editor
              editorState={state.editorState}
              onEditorStateChange={onChange} />
          </div>
        </div>
        );
        
}

export default RichTextEditor;