import React, { useState, useEffect } from "react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import "./ChatBody.css";
import { TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import Chip from "@mui/material/Chip";

const ChatBody = (props) => {
  const [chats, setchats] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    const getChats = async () => {
      const { data } = await axios.post(
        "/api/v1/getchat",
        { to: props.email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data.data);
      setchats(data.data);
    };
    getChats();
  }, [props.email]);

  return (
    <div className="ChatBody">
      <div className="messages">
        {chats?.map((e) => {
          return (
            <div
              className={`msg ${
                e.from == props.email ? "msgright" : "msgleft"
              }`}
            >
              <p className="msgchip">{e.message}</p>
            </div>
          );
        })}
      </div>

      {/* footer */}

      <div className="footer">
        <div className="footerLeft">
          <EmojiEmotionsOutlinedIcon className="icon " />
          <AttachFileIcon className="icon visible" />
        </div>

        <div className="textField">
          <TextField fullWidth label="Message" id="fullWidth" />
        </div>
        <div className="speaktotext">
          <MicNoneOutlinedIcon className="icon mic" />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
