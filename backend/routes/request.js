const router = require("express").Router();
const Request = require("../models/Request");

//get all notification for user

//add

router.post("/", async (req, res) => {
  const newRequest = new Request(req.body);

  try {
    const request = await newRequest.save();
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get Request that are  not Read.

router.get("/:id", async (req, res) => {
  try {
    const userId=req.params.id;
    const request = await Request.find({
        receiverId: req.params.id
    }).populate('senderId','username profilePicture');
    console.log(userId);
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update request
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
  await Request.findOneAndDelete({nId:nId});
  
 } catch (err) {
   console.log(err);
  
 }
 res.status(200).json({ message: 'Deleted Notification.' });
});
module.exports = router;
