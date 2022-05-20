import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, convertFromRaw, CompositeDecorator } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, TextField, Typography, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneRounded from "@mui/icons-material/DoneRounded";



const RichTextEditor = ({ setValue, OnClose, value, limitedEditor, minH, isReadOnly, openFormEditor, maxW, popup }) => {


  const [state, setState] = useState([
    {
      editorState: EditorState.createEmpty
    }
  ])

  /*const content = window.localStorage.getItem('content');*/
  let content = value;

  useEffect(() => {


    if (content !== null) {


      setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content))) });

    }
    else {

      /* setState({editorState:EditorState.createEmpty()});*/
      setState({ editorState: EditorState.createEmpty() });


    }

  }, [content])

  const onChange = (editorState, limitedCheck = false) => {

    const contentState = editorState.getCurrentContent();

    if ((!limitedEditor && !isReadOnly && limitedCheck) || !popup) {
      saveContent(contentState);
      OnClose();
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
      <div style={{ border: !limitedEditor && !isReadOnly && !popup ? 0 : "1px solid black", borderRadius: !limitedEditor && !isReadOnly && !popup ? 0 : 5, padding: '2px', height: minH, width: maxW, overflowY: "auto" }}>
        <Editor
          readOnly={limitedEditor}
          editorState={state.editorState}


          onEditorStateChange={onChange}
          toolbar={limitedEditor ? {
            options: [],
            inline: { inDropdown: true },
            list: { inDropdown: true },

            link: { inDropdown: true },
            history: { inDropdown: true },
          } : ""} />
        {/* {limitedEditor && !isReadOnly ?

          <IconButton sx={{ marginLeft: '87%' }} onClick={(e) => openFormEditor(true)}>
            <EditRoundedIcon />
          </IconButton>
          : ""

        } */}
      </div>
      {
        !limitedEditor && !isReadOnly && popup ?
          <Button sx={{ marginLeft: '89%' }} onClick={(e) => onChange(state.editorState, true)}>Valider</Button> : ""
      }
    </div >
  );

}

export default RichTextEditor;