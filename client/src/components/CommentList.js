const CommentList = ({post}) => {
    return (
        <>
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
