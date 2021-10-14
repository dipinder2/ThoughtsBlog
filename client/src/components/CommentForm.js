import axios from "axios";
import {useRef} from 'react';
const CommentForm = ({post}) => {
    const commentRef = useRef();
    const commentHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/posts/comments/${e.target.postId.value}`,{"comment":e.target.comment.value})
            .then(res=>res)
            .catch(err=>console.log(err))
        commentRef.current.value = "";
    }

    return (  <form method={"post"} onSubmit={commentHandler}>
        <input name="postId" type={"hidden"} value={post._id}/>
        <textarea ref={commentRef} rows={"1"} cols={"40"} name={"comment"} placeholder={"respond with your thoughts...."}></textarea><br/>
        <button style={{color:"blue"}} className={"btn btn-outline-primary"}>add comment</button>
    </form>)
}
export default CommentForm;