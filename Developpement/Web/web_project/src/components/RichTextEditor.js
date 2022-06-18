import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@mui/material";


const RichTextEditor = ({
  setValue,
  OnClose,
  value,
  limitedEditor,
  minH,
  isReadOnly,
  openFormEditor,
  maxW,
  information,
}) => {
  const [state, setState] = useState([
    {
      editorState: EditorState.createEmpty,
    },
  ]);

  /*const content = window.localStorage.getItem('content');*/
  let content = value;

  useEffect(() => {
    if (content !== null) {
      setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(content))
        ),
      });
    } else {
      /* setState({editorState:EditorState.createEmpty()});*/
      setState({ editorState: EditorState.createEmpty() });
    }
  }, [content]);

  const onChange = (editorState, limitedCheck = false) => {
    if (information) {
      limitedCheck = true;
    }
    const contentState = editorState.getCurrentContent();

    if (!limitedEditor && !isReadOnly && limitedCheck) {
      saveContent(contentState);
      if (!information) OnClose();
    }
    setState({
      editorState,
    });
  };
  const saveContent = (content) => {
    //window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    setValue(JSON.stringify(convertToRaw(content)));
  };
  return (
    <div class="container">
      <div
        style={{
          border:
            !limitedEditor && !isReadOnly && !information
              ? 0
              : "1px solid black",
          borderRadius: !limitedEditor && !isReadOnly && information ? 0 : 5,
          padding: "2px",
          height: minH,
          width: maxW,
          overflowY: "auto",
        }}
      >
        <Editor
          readOnly={limitedEditor}
          editorState={state.editorState}
          onEditorStateChange={onChange}
          toolbar={
            limitedEditor
              ? {
                options: [],
                inline: { inDropdown: true },
                list: { inDropdown: true },

                link: { inDropdown: true },
                history: { inDropdown: true },
              }
              : ""
          }
        />
        {/* {limitedEditor && !isReadOnly ?

          <IconButton sx={{ marginLeft: '87%' }} onClick={(e) => openFormEditor(true)}>
            <EditRoundedIcon />
          </IconButton>
          : ""

        } */}
      </div>
      {!limitedEditor && !isReadOnly && !information ? (
        <Button
          sx={{ marginLeft: "89%" }}
          onClick={(e) => onChange(state.editorState, true)}
        >
          Valider
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default RichTextEditor;
