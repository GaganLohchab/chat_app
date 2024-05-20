// Assuming you have a way to uniquely identify users (e.g., userId)
import User from "../models/user.model.js";
// Queue to store available users
let availableUsers = [];

// Function to handle when a user clicks the "Random Chat" button
export default function handleRandomChatClick(userId) {
  // Check if the user is already in the queue
  if (!availableUsers.includes(userId)) {
    // Add the user to the queue
    availableUsers.push(userId);
    console.log(`User ${userId} added to the available users queue`);

    // Try to find a match
    matchUsers();
  } else {
    console.log(`User ${userId} is already in the available users queue`);
  }
}

// Function to match users for a random chat
function matchUsers() {
  // Check if there are at least two users in the queue
  if (availableUsers.length >= 2) {
    // Get the first two users from the queue
    const user1 = availableUsers.shift();
    const user2 = availableUsers.shift();

    console.log(`Matching users ${user1} and ${user2} for a random chat`);

    // Establish a chat session between the matched users
    // ...

    // Remove the matched users from the queue
    // ...
  } else {
    console.log("Not enough users in the queue for a match");
  }
}

// Example usage
handleRandomChatClick("user1");
handleRandomChatClick("user2");
handleRandomChatClick("user3");
// Output:
// User user1 added to the available users queue
// User user2 added to the available users queue
// Matching users user1 and user2 for a random chat
// User user3 added to the available users queue