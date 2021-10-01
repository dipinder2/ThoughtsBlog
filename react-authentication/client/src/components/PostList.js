import {useContext} from "react";
import {PostContext} from "../contexts/PostContext";
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import axios from "axios";
import {Link} from "@reach/router"
const PostList = () => {
    const {allPosts} = useContext(PostContext)

    return (
        <div>
            <h1>All Posts Here:</h1>
            {
                allPosts.map((post,idx)=>{
                    return <div key={idx}>
                        {
                            post.creator?
                                <span>Asked By: <Link to={`/user/${post.creator._id}`}>{post.creator.firstName + " " + post.creator.lastName}</Link></span>
                                :null
                        }
                        <legend>{idx+1}. {post.title}</legend>
                        <p>{post.content}</p>
                        <h6>comments:</h6>
                        <CommentList post={post}/>
                        <CommentForm post={post}/>
                    </div>
                })
            }

        </div>
    );
}
export default PostList;