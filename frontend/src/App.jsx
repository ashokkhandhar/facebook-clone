import { useEffect, useState } from 'react';
import './App.css';
import API_URL from './api_url';
import axiosInstance from './configs/axiosConfig';
import Navigation from './navigation/Navigation';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, Card } from 'react-bootstrap';

function App() {

  const [postText, setPostText] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [buffer, setBuffer] = useState("Loading your posts...");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);
    console.log(storedUser);
    if (storedUser) {
      fetchUserPosts();
    }
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axiosInstance.get(API_URL + '/user/getPosts', {withCredentials: true});
      if(response.data.length){
        setPosts(response.data);
      } else {
        setBuffer("You haven't post yet");
      }
    } catch(error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      const response = await axiosInstance.post(API_URL + '/user/addPost', {post: postText}, {withCredentials: true});
      console.log(response.data);
      setPostText('');
      fetchUserPosts();
    } catch(error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const resonse = await axiosInstance.post(API_URL + '/user/deletePost', {id}, {withCredentials: true});
      console.log(resonse.data);
      fetchUserPosts();
    } catch(error) {
      console.error(error.message);
    }
  };
  
  return (
    <div className="App">
        <Navigation />
        { user 
        ?
        <div className="home-container">
          <div className="user-profile">
              <h2>{user.username}</h2>
          </div>
          <div className="post-form">
              <input
                  className='post-input'
                  type="text"
                  placeholder="What's on your mind?"
                  value={postText}
                  onChange={(e) => (setPostText(e.target.value))}
              />
              <Button onClick={handlePost}>Post</Button>
          </div>
          <div className="feed">
              { posts.length ? 
                posts.map(post => (
                  <Card key={post._id} className="post">
                      <Card.Body>
                        <Card.Title>
                          {post.post}
                        </Card.Title>
                        <ButtonGroup aria-label="Basic">
                          <Button>{post.likes.length} Likes</Button>
                          <Button>{post.dislikes.length} Dislikes</Button>
                        </ButtonGroup>
                        <div onClick={() => handleDeletePost(post._id)} className='delete-btn'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                        </div>
                      </Card.Body>
                  </Card>
                ))
                :
                <div>{buffer}</div>
              }
          </div>
        </div>
        :
        <div className='without-login-render'>
            Login or Register to use app
        </div>
        }
    </div>
  );
}

export default App;