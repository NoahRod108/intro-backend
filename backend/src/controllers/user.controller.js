import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // If user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      res.status(400).json({ message: "User already exists!" });
    }

    // Create new user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "New user created!",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

export { registerUser };
