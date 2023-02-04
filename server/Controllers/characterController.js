const Character = require('../Models/CharacterSchema')


exports.findDialog = async (req, res) => {
  
    const user = await Character.findOne({ userName: userName });
    if (user)
      return res
        .status(409)
        .send({ message: "User name already exists", status: 409 });
    try {
      console.log('in the try')
      if (password === "") throw new Error();
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ ...req.body, password: hashedPassword });
      const user = await newUser.save();
      
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Could not create user", status: 400 });
    }
  };