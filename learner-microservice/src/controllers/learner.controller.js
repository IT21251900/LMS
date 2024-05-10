import User from "../schemas/user.schema.js";

async function getUsers(req, res) {
  console.log("Fetching all users");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  console.log("Fetching user by ID");
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
    console.log("Updating user");
    try {
      const userId = req.params.id;
      const updates = req.body;
      const options = { new: true }; 
      const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

export { getUsers, getUserById , updateUser};
