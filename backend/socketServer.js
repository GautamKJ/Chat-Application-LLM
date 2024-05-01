const MessageModel =require("./modals/Message");
const chatbot=require("./controllers/Gemini");


function initializeSocketServer() {
  const io = require("socket.io")(8000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId ,status} = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      // if receiver is disconnected
      const bot = activeUsers.find((user) => user.userId === data.message.senderId);
      
      if (user) {
                io.to(user.socketId).emit("recieve-message", data);
      }
      else 
      {

        // if receiver is busy
        if(status ===false)
        {

          const callFunctions =async(prompt)=>{

            try{
            const result=await chatbot(prompt);
          
            console.log("adfat", result);
            data.message.text=result;
            data.message.senderId=receiverId;
            console.log("else data",data);

            // save generated message in db
            try {
             const messages = new MessageModel(data.message);
             const result =messages.save();
           } catch (error) {
             console.log(error);
           }
            io.to(bot.socketId).emit("recieve-message", data);
           
            }
            catch(e){
                console.log(e);
            }
          
          }
          callFunctions(data.message.text);
        }

    
      
    }
      
    });
  });
}

module.exports = initializeSocketServer;
