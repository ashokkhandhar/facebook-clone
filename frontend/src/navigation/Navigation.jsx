import { useEffect, useState } from 'react';
import axiosInstance from '../configs/axiosConfig';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';
import './Navigation.css';
import API_URL from '../api_url';

const Navigation = () => {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(localStorage.getItem('userInfo'));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(API_URL + '/auth/logout', {}, {withCredentials: true});
      console.log(response);
      localStorage.removeItem('userInfo');
      setUser(undefined);
      window.location.reload();
    } catch(error) {
      console.log(error.response.data || "Error while logout, please try again");
    }
  }


  return (
    <Navbar className='navigation justify-content-between'>
      <Nav.Item className='logo'>
        <a href="/">
          <img className='logo-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrgjZVYT0sxSCRszjJuS3WQcAk8MPmHxntLon0awmKw&s" alt="logo" />
        </a>
      </Nav.Item>
      { user
        ?
        <Nav className='navigation-1'>
          <Nav.Link href="/timeline">Timeline</Nav.Link>
          <Nav.Link href='/friends'>Friends</Nav.Link>
          <Nav.Link href='/friendRequests'>Friend Requests</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
        :
        <Nav className='navigation-2'>
          <Button variant="outline-primary" href='/register'>Register</Button>
          <Button variant='primary' href='/login'>Login</Button>
        </Nav>
      }
    </Navbar>
  );
}

export default Navigation;