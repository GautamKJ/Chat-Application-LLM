import React, { useEffect, useState,useRef } from "react";
import { addMessage, getMessages } from "../../api/MessaageRequest";
import { getUser } from "../../api/UserRequest";
import { findChat } from "../../api/ChatRequests";
import "./ChatBox.css";
import {io} from 'socket.io-client';
import Conversation from "./Conversation";


const ChatBox = () => {

  const [userID, setUserId] = useState('');
  const[chatId,setChatId] = useState(null);
  const [receiverID, setReceiverId] = useState(null);
  const [friend, setFriend] = useState([]);
  const [status,setStatus] = useState();

  const socket = useRef();
  


useEffect(() => {

//     socket.current=io('https://chat-application-llm.onrender.com');
    socket.current = io("https://chat-application-llm.onrender.com", {
      path: "/socket.io",
      transports: ["websocket"],
    });
    socket.current.emit('new-user-add',userID);
  

},[userID])


  // set user ID
  useEffect(()=>{
    setUserId(localStorage.getItem('user'));
  },[])
 


// get all users
useEffect(() => {
  const getUsersDetails = async () => {
    try {
      const data = await getUser();
      
       const filteredFriends = data.filter((user) => user._id !== userID);
      
      setFriend(filteredFriends);
    } catch (error) {
      console.log(error);
    }
  };
  
    getUsersDetails();
}, [userID]);


  // start Chat
  const startChat = (id,status) => {
    setStatus(status);
    setReceiverId(id);
  };

 

  // find chat ID
  useEffect(()=>{
    console.log("userEffect");
    const findChatDetail = async () => {
      console.log("findChatDetail",userID,"  ",receiverID);
      try {
        const data  = await findChat(userID, receiverID);
        setChatId(data._id);
        console.log("chatID", data._id);
      } catch (error) {
        console.log(error);
      }
    };
    findChatDetail();
  },[receiverID]);

  



  return (
    <div className="bigbox">
      <div className="smallbox">
      <div className="side">
          <div className="about">
           
            <div className="about_name">ChatAPP</div>
          </div>
          <div className="message_container">

          {friend.map((item) => (
    <div className="item1" key={item._id} onClick={() => startChat(item._id,item.online)}>
        <div className="user_detail">
            
        </div>
        <div className="naam">{item.email}</div>
        <div className="getmessage">{item.online==true?'Available':'Busy'}</div>
    </div>
))}


 
          </div>
        </div>
      {receiverID!=null && chatId!=null ? (
        
        <Conversation socket={socket} userID={userID} chatId={chatId} status={status} receiverID={receiverID} />
      
      ) 
      
      : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}

      </div>
    </div>
    
    
  );
};

export default ChatBox;