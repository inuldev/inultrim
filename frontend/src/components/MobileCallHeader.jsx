import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const MobileCallHeader = () => {
  const navigate = useNavigate();
  const { useCallParticipants } = useCallStateHooks();
  const { participants } = useCallParticipants();
  const [callDuration, setCallDuration] = useState(0);
  const [callTitle, setCallTitle] = useState("Video Call");

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get call title from participants
  useEffect(() => {
    if (participants && participants.length > 0) {
      // Filter out the current user
      const otherParticipants = participants.filter(
        (p) => !p.isLocalParticipant
      );

      if (otherParticipants.length === 1) {
        // One-on-one call
        setCallTitle(otherParticipants[0].name || "Video Call");
      } else if (otherParticipants.length > 1) {
        // Group call
        setCallTitle(`Call with ${otherParticipants.length + 1} participants`);
      }
    }
  }, [participants]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-base-300 bg-opacity-90 p-3 z-100 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm btn-circle mr-2"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h3 className="font-medium text-sm">{callTitle}</h3>
          <div className="flex items-center text-xs opacity-70">
            <Clock size={12} className="mr-1" />
            <span>{formatTime(callDuration)}</span>
          </div>
        </div>
      </div>

      <div className="badge badge-primary badge-lg">Live</div>
    </div>
  );
};

export default MobileCallHeader;
