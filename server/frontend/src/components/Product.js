import { Card } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function Product(props) {
  return (
    <Card className="m-2">
      <Card.Img
        variant="top"
        style={{ maxHeight: '300px', minHeight: '300px' }}
        src={props.images[0].src}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <span
          className="like-button"
          style={{ cursor: 'pointer', fontSize: '20px' }}
        >
          {props.liked ? (
            <BsHeartFill
              onClick={async () => {
                await props.unliker(props.id);
              }}
            />
          ) : (
            <BsHeart
              onClick={async () => {
                await props.liker(props.id);
              }}
            />
          )}
        </span>
      </Card.Body>
    </Card>
  );
}
