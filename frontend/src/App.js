import './App.css';
import Navbar from './components/Navbar';
import Post from './components/Post';
import {Routes, Route} from "react-router-dom"
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/posts/:id" element={<PostPage/>} />
          <Route path='/edit/:id' element={<EditPost/>} />
        </Route>
      </Routes>
  );
}

export default App;
