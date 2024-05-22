import PostCard from './PostCard';

const Posts = (props) => {
    if(props.posts != null) {
      return (
        props.posts.map(data => (
          <div key={data.post._id} className="post-card-container">
            <PostCard user={data.user.username} body={data.post} handleLikeButton={props.handleLikeButton} handleDislikeButton={props.handleDislikeButton}/>
          </div>
        ))
      );
    }
    else {
      return (<div>{props.buffer}</div>)
    }
}

export default Posts;