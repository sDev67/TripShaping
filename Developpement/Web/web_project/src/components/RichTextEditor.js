import React, { useEffect, useState } from "react";
import {  Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { convertToHTML } from 'draft-convert';
import { convertFromHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField } from "@mui/material";



const RichTextEditor = ({setValue, value}) => 
{
    
    const [editorState, setEditorState] = useState(() =>
      
     EditorState.createEmpty()
    );

    return (
        <div>
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholderText="Informations sur le voyage"
            
              onChange={(e) => setValue(convertToHTML(editorState.getCurrentContent()))}
              >
                
               
            </Editor>
          </div>
        </div>
        );
        
}

export default RichTextEditor;