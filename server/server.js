const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const User = require("./models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const UserMiddleware = require("./middleware/UserMiddleware");
const Post = require("./models/Posts");
const PostLike = require("./models/PostLike");

app.use(cors());
const corsOptions = {
  origin: true,
};
app.get('/api', (req, res) => {
  res.json("Samandar")
})

/** New Comment */

app.use(express.json());
app.use(cors(corsOptions));

app.post('/edituser', UserMiddleware, async (req, res) =>{
  const {currentPass,newPass} = req.body
  if(!currentPass.trim() || !newPass.trim()){
    return res.status(400).json({ error: 'Name and password are required' });
  }
  const pass = await User.findById(req.userId)
  const match = await bcrypt.compare(currentPass, pass.password)
  if(!match){
    return res.status(400).json({ error: 'password is not right' });
  }
  const hashPassword = await bcrypt.hash(newPass, 5)
  const UserPass = await  User.findOneAndUpdate({_id: req.userId}, { $set: {password: hashPassword}}, {upsert: true})
  return res.status(200).json({user: UserPass})

})


app.post('/addlike', UserMiddleware, async (req, res) => {
  const userId = req.userId;
  const Like = await PostLike.findOne({postId: req.body.postId, userId: userId});
  if(Like != null){
    await PostLike.deleteOne({_id: Like._id})
    return res.status(200).json( { like: null });
  }
  const newLike = new PostLike({
    userId: userId,
    postId: req.body.postId
  });
  newLike.save();
  const post = await Post.findOneAndUpdate( {_id: req.body.postId}, { $push: { likes: newLike } } )
  .catch(error => {
    console.log('Error adding new user to database:', error.message);
    res.json({"error": error.message})
  });
  return res.status(200).json( { like: newLike });
})

app.post("/user", UserMiddleware, (req, res) => {
  return res.status(200).json("Success");
});
app.post("/getallFollowers", UserMiddleware, async (req, res) => {
  const username = req.body.username
  const userFollowID = await  User.findOne({ username });
  console.log(userFollowID.followers)
  if(!userFollowID && !userFollowID.followers){
    return res.status(400).json({user: null})
  }
  return res.status(200).json(userFollowID.followers);
});
app.post("/getallFollows", UserMiddleware, async (req, res) => {
  const username = req.body.username
  const userFollowID = await  User.findOne({ username });
  console.log(userFollowID.follow)
  if(!userFollowID && !userFollowID.follow){
    return res.status(400).json({user: null})
  }
  return res.status(200).json(userFollowID.follow);
});


app.post("/follow", UserMiddleware,async(req, res) =>{
  const userId = req.userId;
  const username = req.body.username
  const userFollowID = await User.findOne({username: username})
  console.log(userFollowID)
  const UserFollow = await User.findOne({ username: username, follow: { $in: [userId] } })
  const Followers = await User.findOne({ _id: userId, followers: { $in: [userId] } })
  
  console.log(Followers)
  if(UserFollow != null ){
    await User.findOneAndUpdate(
      { username: username },
      { $unset: { follow: userId } },
      { new: true }
    )
    await User.findOneAndUpdate(
      { _id: userId },
      { $unset: { followers: userFollowID._id } },
      { new: true }
    )
      return res.status(200).json({"deleted": "succes"})
  }
  User.findOneAndUpdate(
    { _id: userId },
  { $push: { followers: userFollowID._id } },
  { new: true }
).then((result) => {
  if (!result) {
    console.log('User not found' );
  } else {
    console.log(result);
  }
})
.catch((err) => {
  console.log(err);
});
  User.findOneAndUpdate(
    { username: username },
  { $push: { follow: userId } },
  { new: true }
)
  .then((result) => {
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(200).json(result);
    }
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
})

app.post("/addpost", UserMiddleware, (req, res) => {
  const userId = req.userId;
  const { url, description,pathFile } = req.body
  const newPost = new Post({
    userId: userId,
    url: url,
    description: description,
    pathFile: pathFile,
    likes: []
  });
  newPost.save()
  .catch(error => {
    console.log('Error adding new user to database:', error.message);
    res.json({"error": error.message})
  });
  return res.status(200).json( { success: true });
})

app.post('/getallusername', UserMiddleware, async (req, res) =>{
  const user = await User.find({})
  const usernames = user.map(user => user.username);
  console.log(usernames);
  if(!user){
    return res.status(400).json({user: null})
  }
  return res.status(200).json( usernames);
})
app.post('/getuserinfo', UserMiddleware, async (req, res) =>{
  const { id } = req.body;
  const user = await User.findOne({ _id: id })
  console.log(user);
  if(!user){
    return res.status(400).json({user: null})
  }
  return res.status(200).json(user);
})
app.post('/getuserbyusername', UserMiddleware, async (req, res) =>{
  const { username } = req.body;
  const user = await User.findOne({ username: username })
  console.log(user);
  if(!user){
    return res.status(404).json({user: null})
  }
  return res.status(200).json(user);
})
app.get('/getposts', UserMiddleware, async (req, res) =>{
  const posts = await Post.find()
  .populate('likes')
  // .limit(50);
  return res.status(200).json({ posts });
})
app.get('/getposts/:username', UserMiddleware, async (req, res) => {
  const username = req.params.username;
  const { _id } = await User.findOne({ username: username });
  console.log(_id)
  const posts = await Post.find({ userId: _id })
  return res.status(200).json({ posts });
})
app.post('/checkuser', async (req, res) =>{
  const { username } = req.body
  const user = await User.findOne({ username: username })
  return res.status(200).json({ isUserExists: !user ? false : true });
})
app.post('/register',async (req, res) => {
  const { email, password, firstname, lastname, username } = req.body
  // Check if name and password are provided
  if (!firstname || !lastname || !password || !email || !username) {
    return res.status(400).json({ error: 'Name and password are required' });
  }
  const user = await User.findOne({ email });
  if(user){
    return res.status(400).json({ error: 'already register in system' });
  }
  let fullName = `${firstname} ${lastname}`
  const hashPassword = await bcrypt.hash(password, 5)
    try {
      const newUser = new User({
        email: email, 
        password: hashPassword,
        fullName: fullName,
        username: username,
        follow: [],
        followers: []
      });
      await newUser.save()
      const user1 = await User.findOne({ email });
      const token = jwt.sign({
        data: user1._id
      }, 'secret', { expiresIn: 60 * 60 });
      return res.status(200).json({ accessToken: token, id: user1._id, username: username });
    } catch (error) {
      console.log(error);
    }
  
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({ error: 'Name and password are required' });
  }
  const user = await User.findOne({ email });
  if(!user){
    return res.status(400).json({ error: 'not find' });
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    return res.status(400).json({ error: 'password is not right' });
  }
  const token = jwt.sign({
    data: user._id
  }, 'secret', { expiresIn: 60 * 60 });
  return res.status(200).json({ accessToken: token, id :user._id, username: user.username })

});

;(async () => {
  mongoose.connect('mongodb+srv://Samandar:03210321@cluster0.derdafd.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(error => {
    console.log('Error connecting to database:', error.message);
  });
  console.log('Database connected');
  
  app.listen(process.env.PORT || 5000, () => {
    console.log("server started at port 5000")
  });
})();
