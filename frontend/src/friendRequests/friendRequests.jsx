import axiosInstance from "../configs/axiosConfig";
import React, {useEffect, useState} from "react";
import API_URL from "../api_url";
import Navigation from "../navigation/Navigation";
import { Button, Card } from "react-bootstrap";
import './friendRequest.css';

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [buffer, setBuffer] = useState("Loading Friend Requests...");

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axiosInstance.get(API_URL + '/friends/friendrequests', {withCredentials: true});
                if(!response.data.length) {
                    setBuffer("No Friend Requests");
                }
                setFriendRequests(response.data);
            } catch(error) {
                console.error(error.message);
            }
        };
        fetchFriendRequests();
    }, []);
    
    const handleClick = async (id) => {
        try {
            const response = await axiosInstance.post(API_URL + `/friends/acceptRequest/${id}`, {}, {withCredentials: true});
            console.log(response.data);
            // disable button 
            // setFriendRequests(friendRequests.filter(friendrequest => friendrequest._id !== id));
        } catch(error) {
            console.error(error);
        }
    } 

    return (
        <div className="friendrequests-container">
            <Navigation />
            <div className="friendrequests-list">
                { friendRequests.length ?
                    friendRequests.map(friendrequest => (
                        <Card key={friendrequest._id} className="user-card">
                            <Card.Body className="user-card-body">
                                <Card.Title className='username'>{friendrequest.username}</Card.Title>
                                <Button onClick={() => handleClick(friendrequest._id)}>Accept Request</Button>
                            </Card.Body>
                        </Card>
                        )
                    )
                    :
                    <div>{buffer}</div>
                }
            </div>
        </div>
    );
}

export default FriendRequests;