import ShoutOutModel from "../models/ShoutOut";
import "./ShoutOutComponent.css";

interface Props {
  shoutOut: ShoutOutModel;
}

const ShoutOut = ({ shoutOut }: Props) => {
  return (
    <div className="ShoutOutComponent">
      <p>To: {shoutOut.to}</p>
      <p>From: {shoutOut.from}</p>
      <p>{shoutOut.text}</p>
    </div>
  );
};

export default ShoutOut;
