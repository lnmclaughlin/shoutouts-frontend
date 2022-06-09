import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOutModel, { User } from "../models/ShoutOut";
import { upvoteShoutout } from "../services/shoutOutServices";
import "./ShoutOutComponent.css";

interface Props {
  shoutOut: ShoutOutModel;
  deleteHandler: (id: string) => void;
  upVoteHandler: (user: User, id: string) => void;
}

const ShoutOut = ({ shoutOut, deleteHandler, upVoteHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="ShoutOutComponent">
      <button className="x" onClick={() => deleteHandler(shoutOut?._id!)}>
        x
      </button>
      <p className="who-its-to">
        To:{" "}
        <Link className="to" to={`/user/${shoutOut.to}`}>
          {shoutOut.to}{" "}
        </Link>
      </p>
      {/* {" "} */}
      <div className="from-container">
        <p className="from">From: {shoutOut.from}</p>
        {shoutOut.photoURL && (
          <img
            src={shoutOut.photoURL}
            alt={shoutOut.from}
            className="from-img"
          />
        )}
        {/* <p>{shoutOut.from}</p> */}
      </div>
      <p className="message">"{shoutOut.text}"</p>
      {shoutOut.image && (
        <img
          src={shoutOut.image}
          alt={shoutOut.text}
          className="shoutout-image"
        />
      )}
      {user ? (
        <div className="votes-container">
          <button>downvote</button>
          <p>{shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
          <button
            onClick={() =>
              upvoteShoutout(
                { displayName: user.displayName || "anonymous", uid: user.uid },
                shoutOut._id!
              )
            }
          >
            upvote
          </button>
        </div>
      ) : (
        <div>
          <p> {shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
          <p>Please log in to upvote / downvote</p>
        </div>
      )}
    </li>
  );
};

export default ShoutOut;
