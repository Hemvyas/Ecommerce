const router = require("express").Router();
const { verifyToken } = require("../verifyToken");
const User = require("../models/User");

//update User
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    if (req.user.isAdmin || req.user._id === userId) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({ message: "Profile Updated Successfully", data: updatedUser });
      } else {
        return res.status(500).json({ message: "Failed to update user" });
      }
    } else {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

//delete User
router.delete('/:id',verifyToken,async(req,res)=>{
  let userID=req.params.id;
  try {
    if(req.user._id===userID || req.user.isAdmin)
    {
      const deletedUser=await User.findByIdAndDelete(userID);
      if(!deletedUser){
        return res.status(404).json({message:"No user with provided id found."})
        }else{
          return res.status(200).json({message:"User has been deleted!"})
          }
    }
  } catch (error) {
    
  }
})

//get User
router.get("/:id",verifyToken,async(req,res)=>{
  try {
    if(req.user.isAdmin)
    {
      const user=await User.findById(req.params.id);
      res.status(200).json(user);
      }
      else{
        return res.status(403).json('You do not have permission to view this profile');
        }
    
  } catch (error) {
    console.log(error);
  }
})

//get all user
router.get("/",verifyToken,async(req,res)=>{
  const query=req.query.new;
  if(req.user.isAdmin)
  {
    const users = query? await User.find().sort({_id:-1}).limit(5)
    : await User.find();  
    res.status(200).json(users);
    }
    else{
      res.status(200).json(req.user);
      }
      })

      //get user stats



module.exports = router;
