import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
      return res.status(400).json({ message: "User already exists!" });
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

const loginUser = async (req, res) => {
  try {
    // Check if user exists
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) return res.status(400).json({ message: "User not found!" });

    // compare passwords
    const isMatchedPassword = await user.comparePassword(password);

    if (!isMatchedPassword)
      return res.status(400).json({ message: "Invalid credentials!" });

    //Add JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "User logged in!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!", error });
  }
};

const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { email } = decoded;

    res.status(200).json({ message: email });
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed!" }, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json({ message: "User found: logout successful!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
};

export { registerUser, loginUser, logoutUser, verifyToken };
