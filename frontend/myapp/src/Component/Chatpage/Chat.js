import React, { useEffect, useState,useRef } from "react";
import { addMessage, getMessages } from "../../api/MessaageRequest";
import { getUser } from "../../api/UserRequest";
import { findChat } from "../../api/ChatRequests";
import "./ChatBox.css";
import {io} from 'socket.io-client';


const ChatBox = () => {

  const [userID, setUserId] = useState('');
  const[chatId,setChatId] = useState(null);
  const [receiverID, setReceiverId] = useState(null);
  const [message, setMessage] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [friend, setFriend] = useState([]);
  const [status,setStatus] = useState();

  const socket = useRef();
  const scrollRef=useRef(null);
 
  useEffect(() => {
    // console.log("scrollREf ",scrollRef.current);
    if(scrollRef.current)
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);


useEffect(() => {

    socket.current=io('http://localhost:8000');
    socket.current.emit('new-user-add',userID);
  

},[userID])


  // set user ID
  useEffect(()=>{
    setUserId(localStorage.getItem('user'));
  },[])
 
  // recerive msg

  useEffect(()=>{
    console.log("recieved message useEffect: ");
    socket.current.on("recieve-message",(data)=>{
      console.log("recieved message outside",data.message.chatId);
      if(data.message.chatId===chatId)
      {
        console.log("recieved message",data.message);
          setConversation([...conversation,data.message]);
          
      }
      
    })
  })

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
    console.log("chat id",id);
    setReceiverId(id);
  };

  // handle message
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  // find chat ID
  useEffect(()=>{
    console.log("userEffect");
    const findChatDetail = async () => {
      console.log("findChatDetail");
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

  // set previous message

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const  data  = await getMessages(chatId);
        console.log("data", data);
        setConversation(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  },[chatId])

// Send message
  const handleSend= async(e)=>
  {
    e.preventDefault();

    const text = {
      senderId: userID,
      chatId:chatId,
      text: message
    };
    try {
      const data  = await addMessage(text);
      setConversation([...conversation, data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }

    // socket io send message in real time
    socket.current.emit('send-message', {
      receiverId: receiverID,
      message: text,
      status:status
    });
  }


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
      {receiverID!=null ? (
        <>
        <div className="message">
          <div className="towhom"> 
           
            <p className="about_name">Conversation </p>
          </div>
          <div className="msg_container">
          {conversation.map((message) => (
                <div
                  
                    className={
                      message.senderId === userID
                        ? "user_message right"
                        : "user_message left"
                    }
                    ref={scrollRef}
                  >
                    <span>{message.text}</span>{" "}
                    
                  </div>
                
              ))}
          </div>
          <div>
            <form onSubmit={handleSend} id="type">
              <input type="text" name="msg" id="msg"  value={message} onChange={handleMessage}/>
              <button id="send" type="submit"> Send </button>
            </form>
          </div>
        </div>
        </>
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