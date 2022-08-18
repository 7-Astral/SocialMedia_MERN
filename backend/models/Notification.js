const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    receiverId: {
        type: String,
      },
      type: {
        type: Number,
      },
    senderId: {
      type: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    },
    text: {
      type: String,
    },
    read : {
        type: Number,
      },
      nId:{
        type:String,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
