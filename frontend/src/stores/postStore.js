import {create} from "zustand";
import axios from "axios";
import CreateForm from "../components/CreateForm";

const postStore = create((set) => ({
    posts: [],
    
    singlePost: null,

    CreateForm:{
        title: "",
        summary: "",
        file: "", 
        content: ""
    },

    EditForm:{
        title: "",
        summary: "",
        file: "", 
        content: ""
    },

    fetchPosts: async () => {
        const res = await axios.get("http://localhost:5000/posts/");

        set({posts: res.data.posts});
    },

    fetchSinglePost: async (id) => {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);

        set({singlePost: res.data.singlePost, CreateForm: {
            title: res.data.singlePost.title,
            summary: res.data.singlePost.summary,
            file: "",
            content: res.data.singlePost.content
        }});
        console.log(postStore.getState().singlePost)
    },

    updateCreateForm: (event) => {
        const {name} = event.target;
        var value = ""
        if(name === "file"){
            value = event.target.files[0]
        }else{
            value = event.target.value
        }
        console.log(value)
        set((state) => {
            return{
                CreateForm:{
                    ...state.CreateForm,
                    [name]: value,
                },
            };
        });
    },
    updateCreateFormContent: (value) => {
        const name = "content"
        set((state) => {
            return{
                CreateForm:{
                    ...state.CreateForm,
                    [name]: value,
                },
            };
        });
    },

    createNote: async () => {
        try {
            const {CreateForm} = postStore.getState();
            console.log(CreateForm)

            const formData = new FormData();
            formData.set("title", CreateForm.title)
            formData.set("summary", CreateForm.summary)
            formData.set("content", CreateForm.content)
            formData.set("file", CreateForm.file)
            const response = await axios.post("http://localhost:5000/posts/create", formData);

            console.log(response.ok)

        } catch (err) {
            console.log(err)
        }
    },

    editPost: async (id) => {
        try {
            const {CreateForm, singlePost} = postStore.getState()
            const formData = new FormData();
            formData.set("title", CreateForm.title)
            formData.set("summary", CreateForm.summary)
            formData.set("content", CreateForm.content)
            formData.set("file", CreateForm.file)
            formData.set("id", id)

            const response = await axios.patch("http://localhost:5000/posts/edit/"+id, formData);
        } catch (err) {
            console.log(err)
        }
    }


}));

export default postStore;