import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
const TinyEditor = ({ onChange, name, value }) => {
    return (
        <Editor
          apiKey="bchnz1i97cplf7tp3c2d58skx60hqx96ogjaucy4j0wh3q5j"
          value={value}
          tagName={name}
          onEditorChange={(editorContent) => {
            onChange({ target: { name, value: editorContent } });
          }}
          outputFormat="html"
          init={{
            selector: 'textarea',
            plugins: 'charmap code codesample emoticons link lists table wordcount',
            toolbar: [
              'code abbr formatselect | bold italic underline strikethrough | subscript superscript | numlist bullist | charmap emoticons | table | link codesample blockquote',
            ],
            menubar: false,
            setup: function (editor) {
              let insertAbbr = function (editor, text, title) {
                editor.undoManager.transact(function (){
                  editor.insertContent(editor.dom.createHTML('abbr', { title: title }, editor.dom.encode(text)));
                });
              }

              let onAction = function () {
                let selection = editor.selection.getStart();

                let selectedNode = editor.selection.getNode();
                let selectedAbbr = editor.dom.getParent(selectedNode, 'abbr');
                let selectedTitle = editor.dom.getAttrib(selectedAbbr, 'title');
                let selectedText = editor.selection.getContent();

                editor.windowManager.open({
                  title: 'Accessible abbreviation',
                  body: {
                    type: 'panel',
                    items: [
                      {
                        type: 'input',
                        name: 'title',
                        label: 'Title'
                      },
                      {
                        type: 'input',
                        name: 'text',
                        label: 'Text to display'
                      }
                    ]
                  },
                  buttons: [
                    {
                      type: 'cancel',
                      name: 'cancel',
                      text: 'Cancel'
                    },
                    {
                      type: 'submit',
                      name: 'save',
                      text: 'Save',
                      primary: true
                    }
                  ],
                  initialData: {
                    title: selectedTitle,
                    text: selectedText
                  },
                  onSubmit: function (api) {
                    insertAbbr(editor, api.getData().text, api.getData().title);
                    api.close();
                  }
                });

              }

              editor.ui.registry.addButton('abbr', {
                text: "abbr",
                tooltip: "Accessible abbreviation",
                onAction: onAction
              })
            }
          }}
        />
      );
    };
TinyEditor.propTypes = {
      onChange: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
    };
export default TinyEditor;
