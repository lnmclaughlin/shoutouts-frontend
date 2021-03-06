import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  deleteShoutout,
  getAllShoutOuts,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutServices";
import "./Main.css";
import ShoutOutComponent from "./ShoutOutComponent";
import ShoutOutForm from "./ShoutOutForm";

const Main = () => {
  const { user } = useContext(AuthContext);
  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>();
  useEffect(() => {
    getAllShoutOuts().then((res) => {
      setShoutOuts(res);
    });
  }, []);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(
      { displayName: user.displayName || "anonymous", uid: user.uid },
      id
    ).then((res) => {
      getAllShoutOuts().then((res) => setShoutOuts(res));
    });
  };

  return (
    <div className="Main">
      <ul>
        {shoutOuts?.map((item) => (
          <ShoutOutComponent
            key={item._id}
            shoutOut={item}
            deleteHandler={deleteHandler}
            upVoteHandler={upvoteHandler}
          />
        ))}
      </ul>{" "}
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser="" />
      ) : (
        <p className="request">Please Sign In To Leave A Shoutout</p>
      )}
    </div>
  );
};

export default Main;
