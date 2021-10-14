import React from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import {useContext} from 'react'


import PostForm from "./PostForm";
import PostList from "./PostList";
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

const Dashboard = ({Cookies}) => {

    const handleClick = e => {
        e.preventDefault();
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        Cookies.remove("user")
        navigate("/")
    }
    if(Cookies.get("user")){
        var user = JSON.parse(Cookies.get("user"))
    }
    else{
        navigate("/")
        return
    }
    return (
        <>
            {
                Cookies.get('user')
                    ? <>
                        <br/>
                        <h2>Welcome {`${user.firstName} ${user.lastName}`}</h2>
                        <button onClick={handleClick} className={"btn btn-outline-danger"}>Logout</button>
                        <br/>
                        <br/>
                        <PostForm Cookies={Cookies} ></PostForm>
                        <PostList />
                    </> : <Router>
                        <Redirect to="/"/>
                    </Router>


            }


        </>

    );


}
export default Dashboard;