import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
  PaginatedGridLayout,
  DeviceSettings,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";
import { ArrowLeft, Settings, Users } from "lucide-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import PageLoader from "../components/PageLoader";
import MobileCallControls from "../components/MobileCallControls";
import MobileCallHeader from "../components/MobileCallHeader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);

        await callInstance.join({ create: true });

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen w-full overflow-hidden">
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>Could not initialize call. Please refresh or try again later.</p>
        </div>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [layoutType, setLayoutType] = useState("speaker");
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (callingState === CallingState.LEFT) return navigate("/");

  // Toggle between speaker and grid layout
  const toggleLayout = () => {
    setLayoutType(layoutType === "speaker" ? "grid" : "speaker");
  };

  // Mobile-optimized call UI
  const MobileCallUI = () => (
    <div className="relative h-full w-full overflow-hidden">
      <MobileCallHeader />

      <div
        className="h-full w-full"
        style={{ paddingTop: "60px", paddingBottom: "70px" }}
      >
        {layoutType === "speaker" ? <SpeakerLayout /> : <PaginatedGridLayout />}
      </div>

      <MobileCallControls
        layoutType={layoutType}
        onToggleLayout={toggleLayout}
      />
    </div>
  );

  // Desktop call UI
  const DesktopCallUI = () => (
    <>
      <SpeakerLayout />
      <CallControls />
    </>
  );

  return (
    <StreamTheme>{isMobile ? <MobileCallUI /> : <DesktopCallUI />}</StreamTheme>
  );
};

export default CallPage;
