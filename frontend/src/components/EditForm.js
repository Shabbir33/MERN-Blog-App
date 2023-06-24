import React, { useEffect, useState } from "react";
import ReactQuiil from "react-quill";
import 'react-quill/dist/quill.snow.css';
import postStore from '../stores/postStore'
import { Navigate, useParams } from "react-router-dom";


const EditForm = () => {
  const [redirect, setRedirect] = useState(false);

  const store = postStore()
  const {id} = useParams();

  useEffect(() => {
    store.fetchSinglePost(id);
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  if(redirect){
    return <Navigate to={'/posts/'+id} />
  }

  if(store.singlePost=== null) return ''

  const handleSubmit = (event) => {
    event.preventDefault();
    store.editPost(id);
    setRedirect(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" type="title" placeholder={"Title"} value={store.CreateForm.title} onChange={store.updateCreateForm} />
        <input name="summary" type="summary" placeholder={"Summary"} value={store.CreateForm.summary} onChange={store.updateCreateForm} />
        <input name="file" type="file" onChange={store.updateCreateForm} />
        <ReactQuiil name="content"  modules={modules} formats={formats} value={store.CreateForm.content} onChange={store.updateCreateFormContent}/>
        <button style={{ marginTop: '5px' }}>Edit Post</button>
      </form>
    </div>
  );
}

export default EditForm