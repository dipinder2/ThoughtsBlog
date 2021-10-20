import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {PostContext} from "../contexts/PostContext";
const PostForm = ({Cookies}) => {

    const {allPosts,setAllPosts,post,setPost,clicked,setClicked} = useContext(PostContext);
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value
        });
    }
    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/posts",post,{withCredentials: true})
            .then(res=> {
                return res.data
            })
            .then(data=> {
                setAllPosts([...allPosts,data]);
                setClicked(!clicked);
                console.log()
            })
            .catch(err=>console.log(err));

        setPost({
            title:"",
            content:"",
            comments:[],
            creator:{
                firstName:JSON.parse(Cookies.get("user")).firstName,
                lastName:JSON.parse(Cookies.get("user")).lastName,
             }
        });


    }
    return (
        <div className={"scheduler-border"}>

            <form onSubmit={submitHandler} method="POST">
                <fieldset>
                    <legend>Share Your Thinking</legend>
                <p>
                    <input size="42" rows="1" onChange={handleChange}
                           value={post.title} name={"title"} id="title"
                           cols="40" placeholder={"Post a Question?"}></input>
                </p>
                <p style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                    <textarea onChange={handleChange}
                              value={post.content} name={"content"} id="content"
                              cols="40" placeholder={"Your Opinion...."}></textarea>
                </p>
                <button className={"btn btn-outline-secondary "}>Add Post</button>
              </fieldset>
            </form>
        </div>
    );
}
export default PostForm;