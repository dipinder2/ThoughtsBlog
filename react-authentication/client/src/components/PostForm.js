import axios from 'axios';
import {useEffect, useState} from 'react';
const PostForm = ({setAllPosts}) => {
    const [post,setPost] = useState({
        title:"",
        content:"",
    });
/*    useEffect(()=>{
        axios.get("http://localhost:8000/api/posts")
            .then(res=> {
                setAllPosts(res.data);
            })
            .catch(err=>console.log(err));
    },[])*/
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]:e.target.value
        });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            title:e.target.title.value,
            content:e.target.content.value
        }

        axios.post("http://localhost:8000/api/posts",data,{withCredentials: true})
            .then(res=> {

            })
            .catch(err=>console.log(err));

        setPost({
            title:"",
            content:"",
        });
    }
    return (
        <div className={"scheduler-border"}>

            <form onSubmit={submitHandler} method="post">
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