import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import MobileChatHeader from "../components/MobileChatHeader";
import MobileChatInput from "../components/MobileChatInput";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        //
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !chatClient || !channel) return <ChatLoader />;

  // Custom components for mobile view
  const CustomMobileChat = () => {
    return (
      <div className="flex flex-col h-full w-full">
        {/* Import and use the MobileChatHeader component */}
        <MobileChatHeader handleVideoCall={handleVideoCall} />

        {/* Message list takes most of the space */}
        <div
          className="flex-1 overflow-y-auto bg-base-100 w-full"
          style={{ height: "calc(100% - 120px)" }}
        >
          <MessageList />
        </div>

        {/* Import and use the MobileChatInput component */}
        <div
          className="w-full"
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <MobileChatInput />
        </div>
      </div>
    );
  };

  return (
    <div className="h-[93vh] w-full">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          {isMobile ? (
            <CustomMobileChat />
          ) : (
            <div className="w-full relative">
              <CallButton handleVideoCall={handleVideoCall} />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
          )}
          {/* Only show Thread on desktop */}
          {!isMobile && <Thread />}
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
