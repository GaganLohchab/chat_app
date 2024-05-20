import User from "../models/user.model.js";

// Queue to store available users
let availableUsers = [];

// Function to handle when a user clicks the "Random Chat" button
export const handleRandomChat = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if the user is already in the queue
    if (!availableUsers.includes(userId)) {
      // Add the user to the queue
      availableUsers.push(userId);
      console.log(`User ${userId} added to the available users queue`);

      // Try to find a match
      await matchUsers();
    } else {
      console.log(`User ${userId} is already in the available users queue`);
    }

    res.status(200).json({ message: "Random chat request received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to match users for a random chat
async function matchUsers() {
  try {
    // Check if there are at least two users in the queue
    if (availableUsers.length >= 2) {
      // Get the first two users from the queue
      const user1Id = availableUsers.shift();
      const user2Id = availableUsers.shift();

      // Find the user documents
      const [user1, user2] = await Promise.all([
        User.findById(user1Id),
        User.findById(user2Id),
      ]);

      if (!user1 || !user2) {
        throw new Error("One or both users not found");
      }

      console.log(`Matching users ${user1._id} and ${user2._id} for a random chat`);

      // Establish a chat session between the matched users
      // You can use techniques like WebSockets, Socket.IO, or a real-time database
      // to enable real-time communication between the matched users.
      // For example, you can create a new chat room or session and store it in the database
      // with the user IDs of the matched users.
      // Then, you can emit events or update the real-time database to notify the users
      // about the new chat session and allow them to start exchanging messages.

      // Remove the matched users from the queue
      // ...
    } else {
      console.log("Not enough users in the queue for a match");
    }
  } catch (error) {
    console.error(error);
    // Handle the error as needed
  }
}