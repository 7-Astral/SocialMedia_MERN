const router = require("express").Router();
const Notification = require("../models/Notification");

//get all notification for user

//add

router.post("/", async (req, res) => {
  const newNotification = new Notification(req.body);

  try {
    const notification = await newNotification.save();
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get Notification that are  not Read.

router.get("/:id", async (req, res) => {
  try {
    const userId=req.params.id;
    const notification = await Notification.find({
        receiverId: req.params.id,read:0,
    }).populate('senderId','username profilePicture');
    console.log(userId);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update notification
router.put("/updateId/:rid/:sid", async (req, res) => {
    
      try {
        const notification = await Notification.findOneAndUpdate({receiverId:req.params.rid,senderId:req.params.sid,}, {
          $set: req.body,
        });
        res.status(200).json("Notification has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
  });

  router.delete("/deleteId/:nid",async(req,res)=>{
       try {
      const nId = req.params.nid;
     await Notification.findOneAndDelete({nId:nId});
     
    } catch (err) {
      console.log(err);
     
    }
    res.status(200).json({ message: 'Deleted Notification.' });
  });
module.exports = router;
