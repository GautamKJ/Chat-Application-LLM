import React, { useEffect, useState,useRef } from "react";
import { addMessage, getMessages } from "../../api/MessaageRequest";


const Conversation = ({socket,userID,chatId,status,receiverID}) => {

    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const scrollRef=useRef(null);
 
  
  useEffect(() => {
    
    if(scrollRef.current)
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);


    // recerive msg
    useEffect(()=>{
        socket.current.on("recieve-message",(data)=>{
          if(data.message.chatId==chatId)
          {
            setConversation(prevConversation => [...prevConversation, data.message]);    
          }
        })
      },[]);


       // handle message
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  // set previous message

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const  data  = await getMessages(chatId);
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
            

              <input type="text" name="msg" id="msg"  value={message || ''}  onChange={handleMessage}/>
              <button id="send" type="submit"> Send </button>
            </form>
          </div>
        </div>
    </>
  )
}

export default Conversation
