import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { handleRandomChatClick } from "../../../../backend/randomchat/RandomChat"

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const [isRandomChatLoading, setIsRandomChatLoading] = useState(false);

  useEffect(() => {
    let timeout;

    if (isRandomChatLoading) {
      timeout = setTimeout(() => {
        setIsRandomChatLoading(false);
        // Add your logic here for when the search times out
      }, 30000); // 30 seconds
    }

    return () => clearTimeout(timeout);
  }, [isRandomChatLoading]);

  const handleRandomChatClick = () => {
    setIsRandomChatLoading(true);

	handleRandomChatClick()
    .then(() => {
      // Handle the successful case
      console.log("Random chat process completed");
      setIsRandomChatLoading(false);
    })
    .catch((error) => {
      // Handle the error case
      console.error("Error in random chat process:", error);
      setIsRandomChatLoading(false);
    });
    // Call the function or perform the logic to start the random chat process
    // When the process is completed, set isRandomChatLoading to false
  };

  return (
    <div className="mt-auto flex items-center">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}

      {/* <button className="btn btn-outline btn-info ml-6"  >Start Random Chat</button> */}
      <button
        className="btn btn-outline btn-info ml-6"
        onClick={handleRandomChatClick}
        disabled={isRandomChatLoading}
      >
        <div className="w-32 h-6 flex items-center justify-center">
          {isRandomChatLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Start Random Chat"
          )}
        </div>
      </button>
    </div>
  );
};
export default LogoutButton;
