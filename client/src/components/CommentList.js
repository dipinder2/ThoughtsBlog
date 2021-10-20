
const CommentList = ({post}) => {

    return (
        <>
            <h3 style={{color:"green",textDecoration:"underline"}}>Comments</h3>
            {
                post.comments?
                post.comments.map(comment=>{
                    return <p>{comment.comment}</p>
                })
                :null
            }
        </>

    )
}
export default CommentList;
