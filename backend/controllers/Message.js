const MessageModel =require("../modals/Message");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

 const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId }).select({
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0
    });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports={getMessages, addMessage};