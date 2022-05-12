import React, { useEffect, useState } from "react";
import {  Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, convertFromRaw, CompositeDecorator } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, TextField, Typography } from "@mui/material";
import DoneRounded from "@mui/icons-material/DoneRounded";



const RichTextEditor = ({setValue, value, limitedEditor=false, minH, isReadOnly=false}) => 
{


  const [state, setState] = useState([
    {
      editorState:EditorState.createEmpty
    }
  ])
  
  /*const content = window.localStorage.getItem('content');*/
  let content = value;

  useEffect(() => {
  

    if(content !== null){
  

      setState({editorState:EditorState.createWithContent(convertFromRaw(JSON.parse(content)))});

    }
    else{

     /* setState({editorState:EditorState.createEmpty()});*/
     setState({editorState:EditorState.createEmpty()});
      
    
    }

  }, [content])
 
   const onChange = (editorState, limitedCheck=false) =>{
   
     const contentState = editorState.getCurrentContent();
     
     if(!limitedEditor || (limitedEditor && limitedCheck))
     {
        saveContent(contentState);
      }
        setState({
          editorState,
      });


   }
   const saveContent = (content) => {
      //window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
      setValue(JSON.stringify(convertToRaw(content)));
  }
    return (
        <div class="container">
          <div style={{ border: "1px solid black", padding: '2px', minHeight: {minH} , overflowY: "auto",}}>
            <Editor
              readOnly={isReadOnly}
              editorState={state.editorState}
              
              
              onEditorStateChange={onChange}
              toolbar={ limitedEditor ? {
                options: ['inline', 'fontSize', 'list', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
     
                link: { inDropdown: true },
                history: { inDropdown: true },
            } : ""}/>
            {limitedEditor ?

              <Button
                variant="contained"
                color="primary"
                style={{padding:0}}
                disabled={isReadOnly}
                onClick={() => onChange(state.editorState,true)}
              >
                <DoneRounded />
              </Button>
             :
             ""}
          </div>
        </div>
        );
        
}

export default RichTextEditor;