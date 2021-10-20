import axios from "axios";
import {useRef} from 'react';
import {useState,useContext} from "react";
import {PostContext} from "../contexts/PostContext";
const CommentForm = ({post,idx}) => {
    const commentRef = useRef();
    const {setAllPosts,allPosts,clicked,setClicked} = useContext(PostContext);

    async function commentHandler(e){
        e.preventDefault();
        try{
            axios.post(`http://localhost:8000/api/posts/comments/${e.target.postId.value}`,{"comment":e.target.comment.value})
            await setClicked(!clicked);
        }
        catch(e){
            console.log(e)
        }
        finally{
            commentRef.current.value = "";
        }

    }

    return (  <form method={"post"} onSubmit={commentHandler}>
        <input name="postId" type={"hidden"} value={post._id}/>
        <textarea ref={commentRef} rows={"1"} cols={"40"} name={"comment"} placeholder={"respond with your thoughts...."}></textarea><br/>
        <button style={{color:"blue"}} className={"btn btn-outline-primary"}>add comment</button>
    </form>)
}
export default CommentForm;