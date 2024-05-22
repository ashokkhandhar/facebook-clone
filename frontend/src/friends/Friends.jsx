import axiosInstance from '../configs/axiosConfig';
import React, { useEffect, useState} from "react";
import Navigation from '../navigation/Navigation';
import API_URL from '../api_url';
import './Friends.css';
import { Button, Card } from "react-bootstrap";

const Friends = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [buffer, setBuffer] = useState("Loading Users...");

    const currUser = JSON.parse(localStorage.getItem("userInfo"));

    // for allUsers
    useEffect(()=> {
        fetchAllUsers();
    }, []);
    
    const fetchAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_URL + "/user/all", {withCredentials: true});
            let data = response.data;
            if(data) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                data = data.filter(user => user.username !== userInfo.username);
                setAllUsers(data);
            }
            else {
                setBuffer("No Users");
            }
        } catch(error) {
            console.error(error);
        }
    };
    
    // for allFriends
    useEffect(()=> {
        const fetchAllFriends = async () => {
            try {
                const response = await axiosInstance.get(API_URL + "/friends", {withCredentials: true});
                if(response.data) {
                    setAllFriends(response.data);
                }
                else {
                    setBuffer("No friends");
                }
            } catch(error) {
                console.error(error.message);
            }
        };
        fetchAllFriends();
    }, []);

    const ifUserIsFriend = (user) => {
        const friends = allFriends.filter(friend => friend._id === user._id);
        return friends.length ? true : false;
    }

    const handleButtonClick = async (user) => {
        if(ifUserIsFriend(user)){
            try{
              const response = await axiosInstance.post(API_URL + '/friends/unfriend', {fromUserId: currUser._id, toUserId: user._id}, {withCredentials: true});
              console.log(response.data);
              window.location.reload();
            } catch(error) {
              console.error(error.message);
            }
        }
        else{
            try{
              const response = await axiosInstance.post(API_URL + '/friends/sendrequest', {fromUserId: currUser._id, toUserId: user._id}, {withCredentials: true});
              console.log(response.data);
              window.location.reload();
            } catch(error) {
              console.error(error.message);
            }
        }
    }

    return (
        <div className="friends-container">
            <Navigation />
            <div className="friends-list">
            { allUsers.length ?
                allUsers.map((user) => (
                    <Card key={user._id} className="user-card">
                        <Card.Body className="user-card-body">
                            <Card.Title className='username'>{user.username}</Card.Title>
                            <Button 
                                className={`friend-button ${ifUserIsFriend(user)? 'remove' : 'add'}`} 
                                onClick={() => handleButtonClick(user)}
                            >
                                {ifUserIsFriend(user) ? 'Remove' : 'Add Friend'}
                            </Button>
                        </Card.Body>
                    </Card>
                ))
                :
                <div>{buffer}</div>
            }
            </div>
        </div>
    );
}

export default Friends;