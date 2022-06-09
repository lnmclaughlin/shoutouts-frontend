import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  getAllShoutOutsToFromMe,
  upvoteShoutout,
} from "../services/shoutOutServices";
import "./MeRoute.css";
import ShoutOutComponent from "./ShoutOutComponent";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myShoutOuts, setMyShoutouts] = useState<ShoutOut[]>();

  useEffect(() => {
    if (user) {
      getAllShoutOutsToFromMe(user?.displayName || "Anonymous").then((res) => {
        setMyShoutouts(res);
      });
    } else {
      navigate("/");
    }
  }, [user]);

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutOutsToFromMe(user?.displayName || "Anonymous").then((res) =>
        setMyShoutouts(res)
      );
    });
  };

  return (
    <div className="MeRoute">
      <h2>My ShoutOuts</h2>
      <ul>
        {myShoutOuts?.map((item) => (
          <ShoutOutComponent
            key={item._id}
            shoutOut={item}
            deleteHandler={() => {}}
            upVoteHandler={upvoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;
