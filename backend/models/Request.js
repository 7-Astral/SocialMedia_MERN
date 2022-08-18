const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    receiverId: {
     type: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
      },
      type: {
        type: Number,
      },
    senderId: {
      type: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
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

module.exports = mongoose.model("Request",RequestSchema);
