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
            plugins: 'charmap codesample emoticons link lists table wordcount',
            toolbar: [
              'formatselect | bold italic underline strikethrough | subscript superscript | numlist bullist | charmap emoticons | table | link codesample blockquote',
            ],
            menubar: false
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
