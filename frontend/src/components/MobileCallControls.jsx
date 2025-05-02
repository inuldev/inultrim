import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCallStateHooks,
  useCalls,
} from "@stream-io/video-react-sdk";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MoreVertical,
  Camera,
  Users,
  Settings,
  MessageSquare,
} from "lucide-react";

const MobileCallControls = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { useCallCustomData, useCallVideoState, useCallAudioState } = useCallStateHooks();
  const { activeCalls } = useCalls();
  const activeCall = activeCalls[0];

  const { isMicrophoneEnabled, toggleMicrophone } = useCallAudioState();
  const { isCameraEnabled, toggleCamera } = useCallVideoState();

  const handleEndCall = async () => {
    try {
      if (activeCall) {
        await activeCall.leave();
      }
      navigate("/");
    } catch (error) {
      console.error("Error ending call:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-300 bg-opacity-90 p-3 z-50">
      <div className="flex justify-center items-center space-x-4">
        {/* Microphone toggle */}
        <button
          onClick={toggleMicrophone}
          className={`btn btn-circle ${
            isMicrophoneEnabled ? "btn-primary" : "btn-error"
          }`}
          aria-label={isMicrophoneEnabled ? "Mute microphone" : "Unmute microphone"}
        >
          {isMicrophoneEnabled ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        {/* Camera toggle */}
        <button
          onClick={toggleCamera}
          className={`btn btn-circle ${
            isCameraEnabled ? "btn-primary" : "btn-error"
          }`}
          aria-label={isCameraEnabled ? "Turn off camera" : "Turn on camera"}
        >
          {isCameraEnabled ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        {/* End call */}
        <button
          onClick={handleEndCall}
          className="btn btn-circle btn-error"
          aria-label="End call"
        >
          <PhoneOff size={20} />
        </button>

        {/* More options */}
        <button
          onClick={toggleMenu}
          className="btn btn-circle"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Expanded menu */}
      {showMenu && (
        <div className="absolute bottom-20 left-0 right-0 bg-base-200 rounded-t-lg p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center p-2">
              <Camera size={24} className="mb-1" />
              <span className="text-xs">Switch Camera</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <Users size={24} className="mb-1" />
              <span className="text-xs">Participants</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <Settings size={24} className="mb-1" />
              <span className="text-xs">Settings</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2">
              <MessageSquare size={24} className="mb-1" />
              <span className="text-xs">Chat</span>
            </button>
          </div>
          <button 
            className="btn btn-sm btn-ghost w-full mt-4"
            onClick={toggleMenu}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileCallControls;
