import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { storage } from "../firebaseConfig";
import ShoutOut from "../models/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
  addShoutOut: (so: ShoutOut) => void;
  toUser: string;
}

const ShoutOutForm = ({ addShoutOut, toUser }: Props) => {
  const { user } = useContext(AuthContext);
  const [to, setTo] = useState(toUser);
  const [from, setFrom] = useState(user?.displayName || "Anonymous");
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const newShoutOut: ShoutOut = {
      to,
      from,
      text,
      photoURL: user?.photoURL || "",
    };
    const files = fileRef.current?.files;
    // if the files variable is truthy AND holding at least one file:
    if (files && files[0]) {
      const newFile = files[0];
      const storageRef = ref(storage, newFile.name);
      uploadBytes(storageRef, newFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // everything is done, we can submit
          newShoutOut.image = url;
          // only adding shoutout if image is uploaded:
          addShoutOut(newShoutOut);
        });
      });
    } else {
      // no image was uploaded
      addShoutOut(newShoutOut);
    }

    setTo(toUser);
    setFrom(user?.displayName || "Anonymous");
    setText("");
    formRef.current?.reset();
  };
  return (
    <form className="ShoutOutForm" onSubmit={submitHandler} ref={formRef}>
      <label htmlFor="to">To: </label>
      <input
        type="text"
        name="to"
        id="to"
        onChange={(e) => setTo(e.target.value)}
        value={to}
        disabled={toUser ? true : false}
      />
      <label htmlFor="from">From: </label>
      <input
        type="text"
        name="from"
        id="from"
        onChange={(e) => setFrom(e.target.value)}
        value={from}
        disabled
      />
      <label htmlFor="text">Message: </label>
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <input className="file" type="file" ref={fileRef} />

      <button className="submit">Submit Shoutout</button>
    </form>
  );
};

export default ShoutOutForm;
