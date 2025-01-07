const prisma = require('../config/connectDB');

const saveContactMessage = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    console.log(prisma.contactMessage); // Debug log
    const newMessage = await prisma.contactMessage.create({
      data: { name, email, phoneNumber, message },
    });
    return res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save contact message.',
      error: error.message, // Add more detail for debugging
    });
  }
};


const getAllContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch contact messages.' });
  }
};

module.exports = {
  saveContactMessage,
  getAllContactMessages,
};
