export const getUsers = async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=20");
    const users = await response.json();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = Number(id);

    if (isNaN(userId) || userId < 1 || userId > 20) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();

    if (!data || data.message) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
