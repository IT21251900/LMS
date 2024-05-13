import mongoose from 'mongoose';

const emailNotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref :"User",
    required: true
  },
  senderEmail: {
    type: String,
    required: true
  },
  userMail: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const EmailNotification = mongoose.model('EmailNotification', emailNotificationSchema);

export default EmailNotification;
