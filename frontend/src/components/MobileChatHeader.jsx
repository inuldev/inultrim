import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video, MoreVertical } from "lucide-react";
import { useChannelStateContext } from "stream-chat-react";

const MobileChatHeader = ({ handleVideoCall }) => {
  const { channel } = useChannelStateContext();
  const [otherUser, setOtherUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOtherUser = async () => {
      try {
        if (channel) {
          const members = Object.values(channel.state.members);
          if (members.length === 2) {
            // Find the other user (not the current user)
            const otherMember = members.find(
              (member) => member.user.id !== channel.client.userID
            );
            if (otherMember) {
              setOtherUser(otherMember.user);
            }
          }
        }
      } catch (error) {
        console.error("Error getting other user:", error);
      }
    };

    getOtherUser();
  }, [channel]);

  const goBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-base-200 border-b border-base-300 p-3 flex items-center justify-between relative">
      <div className="flex items-center">
        <button
          onClick={goBack}
          className="btn btn-ghost btn-sm btn-circle mr-2"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        
        {otherUser && (
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={otherUser.image} alt={otherUser.name} />
              </div>
            </div>
            <div className="ml-2">
              <h3 className="font-medium text-sm">{otherUser.name}</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-success mr-1"></span>
                <span className="text-xs text-success">Online</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <button
          onClick={handleVideoCall}
          className="btn btn-ghost btn-sm btn-circle mr-1"
          aria-label="Start video call"
        >
          <Video size={20} />
        </button>
        
        <button
          onClick={toggleMenu}
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute right-2 top-14 bg-base-100 shadow-lg rounded-lg p-2 z-50">
          <ul className="menu menu-sm w-40">
            <li>
              <button onClick={handleVideoCall} className="flex items-center">
                <Video size={16} />
                <span>Start Video Call</span>
              </button>
            </li>
            <li>
              <button onClick={() => {}} className="flex items-center">
                <span>View Profile</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileChatHeader;
