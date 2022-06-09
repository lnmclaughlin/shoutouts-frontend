import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  deleteShoutout,
  getAllShoutOutsToUser,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutServices";
import ShoutOutComponent from "./ShoutOutComponent";
import ShoutOutForm from "./ShoutOutForm";
import "./ToUserRoute.css";

const ToUserRoute = () => {
  const to: string = useParams().to!;
  const [userShoutouts, setUserShoutouts] = useState<ShoutOut[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllShoutOutsToUser(to).then((res) => {
      setUserShoutouts(res);
    });
  }, [to]);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUserShoutouts(res);
      });
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUserShoutouts(res);
      });
    });
  };
  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then((res) => {
      getAllShoutOutsToUser(to).then((res) => {
        setUserShoutouts(res);
      });
    });
  };

  return (
    <div className="ToUserRoute">
      <h2>All Shoutouts to: {to}</h2>
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser="" />
      ) : (
        <p>Please Sign In </p>
      )}
      <ul>
        {userShoutouts?.map((item) => (
          <ShoutOutComponent
            key={item._id}
            shoutOut={item}
            deleteHandler={deleteHandler}
            upVoteHandler={upvoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToUserRoute;
