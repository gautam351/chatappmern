import { Avatar } from "@mui/material";
import React from "react";

const ChatName = (props) => {
  return (
    <>
      <div className="chatname">
        <Avatar
          className="avatar"
          src="https://lh3.googleusercontent.com/a-/AOh14GjnQC-DpBbVewq6ax2f4uVIs2SZgE3HlJvfw4ompQ=s96-c"
        ></Avatar>

        <p className="leftname">{props.name}</p>
      </div>
    </>
  );
};

export default ChatName;
