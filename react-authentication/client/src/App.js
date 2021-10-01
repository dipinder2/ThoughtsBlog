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
  const [allPosts, setAllPosts] = useState(["user"]);

  useEffect(()=>{
    axios.get("http://localhost:8000/api/posts")
        .then(res=> {
          setAllPosts(res.data);
        })
        .catch(err=>console.log(err));
  },[])


  return (
    <div className="App">
    <PostContext.Provider value={{allPosts,setAllPosts}}>
      <Router>
        <Form Cookies={Cookies} path="/"/>
        <Dashboard Cookies={Cookies} setAllPosts={setAllPosts} path={"/success"}/>
      </Router>
    </PostContext.Provider>
    </div>
  );
}

export default App;
