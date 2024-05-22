import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

const PostCard = (props) => {
  const {user, body} = props;
  return (
    <Card>
      <Card.Header>
        {user}
      </Card.Header>
      <Card.Body>
        <Card.Text className='post-content'>
          {body.post}
        </Card.Text>
        {body.likes.length}{' '}
        <Button variant="primary" onClick={() => props.handleLikeButton(body)}>Like</Button>{' '}
        {body.dislikes.length}{' '}
        <Button variant="primary" onClick={() => props.handleDislikeButton(body)}>Dislike</Button>
      </Card.Body>
    </Card>
  );
}

export default PostCard;