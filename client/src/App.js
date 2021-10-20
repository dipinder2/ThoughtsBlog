import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Dashboard from './components/Dashboard'
import {navigate, Router} from '@reach/router'
import {useState,useEffect} from 'react'
import {PostContext} from "./contexts/PostContext";
import axios from "axios";
import Cookies from 'js-cookie'

function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [post,setPost] = useState({
    title:"",
    content:"",
    comments:[],
    creator:{
    }
  });
  useEffect(()=>{
    axios.get("http://localhost:8000/api/posts")
        .then(res=> {
          setAllPosts(res.data);
        })
        .catch(err=>console.log(err));
  },[clicked])


  return (
    <div className="App">
    <PostContext.Provider value={{allPosts,setAllPosts,post,setPost, clicked,setClicked,Cookies}}>
      <Router>
        <Form exact Cookies={Cookies} path="/"/>
        <Dashboard exact Cookies={Cookies} setAllPosts={setAllPosts} allPosts={allPosts} path={"/success"}/>
      </Router>
    </PostContext.Provider>
    </div>
  );
}

export default App;
