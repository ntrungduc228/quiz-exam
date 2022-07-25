import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ReactHtmlParser from 'react-html-parser';
// import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';

// ClassicEditor.builtinPlugins = [CodeBlock];

const Cktest = () => {
  const [addData, setVal] = useState('svd');
  const [addedData, showData] = useState(0);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setVal(data);
  };

  // ClassicEditor.create(document.querySelector('#editor'), {})
  //   .then((editor) => {
  //     console.log('Editor was initialized', editor);
  //   })
  //   .catch((error) => {
  //     console.error(error.stack);
  //   });

  return (
    <div>
      <button onClick={() => showData(!addedData)}>{addedData ? 'hide' : 'show'}</button>
      <CKEditor
        config={
          {
            // plugins: [CodeBlock],
          }
        }
        disabled={false}
        editor={ClassicEditor}
        data={addData}
        onChange={handleChange}
      />
      <div>{addedData ? ReactHtmlParser(addData) : ''}</div>
      <div className="mt-5">{addedData ? addData : ''}</div>
    </div>
  );
};

export default Cktest;
