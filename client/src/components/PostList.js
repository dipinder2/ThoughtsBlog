import {useContext, useEffect} from "react";
import {PostContext} from "../contexts/PostContext";
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import axios from "axios";
import {Link} from "@reach/router"
const PostList = ({}) => {
    const {allPosts,Cookies} = useContext(PostContext)
    console.log(JSON.parse(Cookies.get("user")).firstName)
    if(allPosts===null){
        return;
    }
    return (
        <div>
            <h1>All Posts Here:</h1>
            {
                allPosts?
                allPosts.map((post,idx)=>{
                    return <div key={idx}>
                        {
                            post.creator && post.creator != JSON.parse(Cookies.get("user"))._id?
                                <span>Asked By: <Link to={`/user/${post.creator._id}`}>{post.creator.firstName + " " + post.creator.lastName}</Link></span>
                                : <Link to={`/user/${JSON.parse(Cookies.get("user")).id}`}>{JSON.parse(Cookies.get("user")).firstName + " " + JSON.parse(Cookies.get("user")).lastName}</Link>
                        }
                        <legend>{idx+1}. {post.title}</legend>
                        <p>{post.content}</p>
                        <CommentList post={post}/>
                        <CommentForm post={post} idx={idx}/>
                    </div>
                })
                    :null
            }

        </div>
    );
}
export default PostList;