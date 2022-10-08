import React, { useEffect, useState } from "react";
import "./chatscreen.css";
import { Stack } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as EmailValidator from "email-validator";
import ChatName from "./utilComponents/ChatName";
import ChatBody from "./utilComponents/ChatBody";

const ChatScreen = () => {
  const [chats, setchats] = useState();
  const [open, setopen] = useState(false);
  const [addemail, setemail] = useState("");
  const [user, setuser] = useState(null);
  const [chatlist, setchatList] = useState([]);
  const [chatid, setchatid] = useState(null);

  const alertconfig = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const navigate = useNavigate();
  useEffect(() => {
    const autoLogin = async () => {
      const { data } = await axios.get("/api/v1/me", {
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);

      if (!data.success) navigate("/");
      toast.success(`welcome ${data.data.name} !`, alertconfig);
      setuser(data?.data);
      setchatList(data?.data.users);
    };
    autoLogin();
  }, []);

  const logout = async () => {
    const { data } = await axios.get("/api/v1/logout", {
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
    navigate("/");
  };

  const addEmail = async (e) => {
    if (EmailValidator.validate(addemail)) {
      const { data } = await axios.post(
        "/api/v1/addchat",
        { email: addemail },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data);
      if (!data.success) toast.error(data.message, alertconfig);
      else {
        toast.success(data.message, alertconfig);
        console.log(data.data.users);
        setchatList(data.data.users);
      }
      setopen(false);
      setemail("");
    } else toast.error("invalid email to add", alertconfig);
    console.log(chatlist);
  };

  const chatclicked = async (email) => {
    setchatid(email);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="headleft">
            <Avatar
              className="avatar"
              src="https://lh3.googleusercontent.com/a-/AOh14GjnQC-DpBbVewq6ax2f4uVIs2SZgE3HlJvfw4ompQ=s96-c"
            ></Avatar>
            <MoreVertRoundedIcon className="icon " />
            <ExitToAppRoundedIcon className="icon" onClick={logout} />
          </div>
          <div className="headright">
            <div className="headrightleft">
              <Avatar
                className="avatar"
                src="https://lh3.googleusercontent.com/a-/AOh14GjnQC-DpBbVewq6ax2f4uVIs2SZgE3HlJvfw4ompQ=s96-c"
              ></Avatar>

              <p className="leftname">name_to_chat</p>
            </div>
            <div className="headrightright">
              <FileDownloadIcon className="icon" />
              <MoreVertRoundedIcon className="icon visible" />

              <AttachMoneyIcon className="icon " />
            </div>
          </div>
        </div>
        <div className="body">
          <div className="left">
            <div className="addchat" title="Add Chat">
              <Button onClick={(e) => setopen(true)}>
                <AddCircleOutlineRoundedIcon className="addbtn" />
              </Button>
              <Dialog open={open} onClose={(e) => setopen(false)}>
                <DialogTitle>Add Chat</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To add a chat enter its username
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={addemail}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={(e) => setopen(false)}>Cancel</Button>
                  <Button onClick={(e) => addEmail(e)}>ADD</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="chatList">
              {/* chatslist */}
              {chatlist.map((element) => {
                return (
                  <label onClick={(e) => chatclicked(element.email)}>
                    <ChatName name={element.name} />{" "}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="right">
            <ChatBody email={chatid} />
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default ChatScreen;
