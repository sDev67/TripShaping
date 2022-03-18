import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField } from "@mui/material";



const RichTextEditor = () => 
{
    
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
    useEffect(() => {
    console.log(editorState);
    }, [editorState]);

    return (
        <div>
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}>

                <TextField
                 style={{margin:"30px"}}
                 label="Informations"
                 placeholder="Ajouter des informations sur le voyage"
                 multiline
                 rows={30}
               
                 InputLabelProps={{
                shrink: true,
                }}/>
            </Editor>
          </div>
        </div>
        );
        
}

export default RichTextEditor;