const User = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.registerUser = async (req, res) => {
  console.log('i made it to the controller');
  const { userName, password } = req.body;
  const user = await User.findOne({ userName: userName });
  if (user)
    return res
      .status(409)
      .send({ message: 'User name already exists', status: 409 });
  try {
    console.log('in the try');
    if (password === '') throw new Error();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not create user', status: 400 });
  }
};

exports.login = async (req, res) => {
  console.log('logging in');
  try {
    const { userName } = req.body;

    const user = await User.findOne({ userName: userName });
    const valid = await bcrypt.compare(req.body.password, user.password);


    if (valid) {
      // req.session.uid = user._id;

      res.status(200).send(user);

  exports.login = async (req, res) => {
    console.log("logging in");
    try {
      
  
      const user = await User.findOne({ userName: req.body.userName})
      console.log(user)
        const valid = await bcrypt.compare(req.body.password, user.password);

        if (valid) {
          // req.session.uid = user._id;
 
          res.send(user);}
    } catch (error) {
      console.log(error);
      res
        .status(401)
        .send({ error: error, message: "Email and/or password incorrect" });

    }
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: error, message: 'Email and/or password incorrect' });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error + 'Could not log out please try again');
    } else {
      res.clearCookie('sid');
      console.log('cookie cleared');
      res.status(200).send({ message: 'Logout succesful' });
    }
  });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {}
};

exports.updateUserStar = async (req, res) => {
  const id = req.params.id;
  console.log(req.params)
  try {
    let user = await User.findOne({ _id: id });
    user.stars++;
    console.log(user.stars)
    user.save()
    res.status(202).send(user)
    // res.json(user)
  } catch (error) {
    console.log(error);
  }
};
