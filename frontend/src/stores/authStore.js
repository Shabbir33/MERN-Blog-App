import {create} from "zustand";
import axios from "axios";

const authStore = create((set) => ({
    form:{
        username: "",
        password: ""
    },

    user: {
        id:'',
        username:''
    },

    loggedIn: null,

    refreshPage: () => {
        set((() => {
            return{
                form:{
                    username: "",
                    password: ""
                },
            };
        }));
    },

    updateForm: (event) => {
        const {name, value} = event.target;

        console.log(authStore.getState().loggedIn);

        set((state) => {
            return{
                form:{
                    ...state.form,
                    [name]: value,
                },
            };
        });
    },

    loginOrSignup: async (address) => {
        const {form} = authStore.getState()

        console.log(form)

        const res = await axios.post(`http://localhost:5000/${address}`, form, {withCredentials: true})

        set({loggedIn:true, form:{
            username: "",
            password: "",
        }, user:{
            id: res.data.user._id,
            username: res.data.user.username
        }})

        console.log(res);
        console.log(authStore.getState().user);
        if (res.status === 200){
            alert("Registration Successful!!");
        }else{
            alert("Registration Failed!!");
        }
    },

    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:5000/check-auth")
            set({loggedIn: true, user:{
                id: res.data.user._id,
                username: res.data.user.username
            }})
            console.log(authStore.getState().user)
        } catch (error) {
            set({loggedIn: false, user:{
                id: '',
                username: ''
            }})
        }
    },

    logout: async () => {
        await axios.get("http://localhost:5000/logout")
        set({loggedIn: false, user:{
            id: '',
            username: ''
        }})
    }

}));

export default authStore;