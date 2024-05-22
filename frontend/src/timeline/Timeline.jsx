import React, { useEffect, useState } from 'react';
import axiosInstance from '../configs/axiosConfig';
import './Timeline.css'; 
import Navigation from '../navigation/Navigation';
import API_URL from '../api_url';
import Posts from './posts/Posts';

const Timeline = () => {

  const [postData, setPostData] = useState(null);
  const [buffer, setBuffer] = useState("Loading your Friend's Posts...");

  const fetchData = async() => {
    try {
      const response = await axiosInstance.get(API_URL + "/user/timeline", {withCredentials: true});
      const data = response.data;
      if(data.length) {
        setPostData(data.slice(0,10));
      } else {
        setBuffer("No posts");
      }
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLikeButton = async (post) => {
    try{
      const reponse = await axiosInstance.post(API_URL + `/post/like/${post._id}`, {}, {withCredentials: true});
      console.log(reponse.data);
      fetchData();
    } catch(error) {
      console.error(error.message);
    }
    fetchData();
  }
  
  const handleDislikeButton = async (post) => {
    try{
      const reponse = await axiosInstance.post(API_URL + `/post/dislike/${post._id}`, {}, {withCredentials: true});
      console.log(reponse.data);
      fetchData();
    } catch(error) {
      console.error(error.message);
    }
    fetchData();
  }

  return (
    <div className='timeline-container'>
      <Navigation />
      <div className="timeline">
        <Posts buffer={buffer} posts={postData} handleLikeButton={handleLikeButton} handleDislikeButton={handleDislikeButton}/>
      </div>
    </div>
  );
};

export default Timeline;