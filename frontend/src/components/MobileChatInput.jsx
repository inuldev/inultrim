import { useState, useRef } from "react";
import {
  useChannelStateContext,
  useMessageInputContext,
} from "stream-chat-react";
import { Send, Paperclip, Smile, Image, Mic } from "lucide-react";

const MobileChatInput = () => {
  const [text, setText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  // We're using the channel context but not directly accessing the channel object
  useChannelStateContext();
  const messageInput = useMessageInputContext();

  const handleChange = (e) => {
    setText(e.target.value);
    messageInput.handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    messageInput.handleSubmit(e);
    setText("");
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleAttachment = () => {
    // This would normally trigger file selection
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="bg-base-200 border-t border-base-300 p-2 w-full z-10">
      <form onSubmit={handleSubmit} className="flex items-end">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            className="textarea textarea-bordered w-full resize-none rounded-full"
            placeholder="Type a message..."
            value={text}
            onChange={handleChange}
            onFocus={handleFocus}
            rows={isExpanded ? 3 : 1}
            style={{ minHeight: isExpanded ? "80px" : "40px" }}
          />

          {isExpanded && (
            <div className="absolute bottom-full left-0 right-0 bg-base-200 p-2 border-t border-base-300 flex justify-around z-100">
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-sm"
                onClick={handleAttachment}
              >
                <Image size={20} />
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-circle btn-sm"
                onClick={handleAttachment}
              >
                <Paperclip size={20} />
              </button>
              <button type="button" className="btn btn-ghost btn-circle btn-sm">
                <Smile size={20} />
              </button>
              <button type="button" className="btn btn-ghost btn-circle btn-sm">
                <Mic size={20} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-circle btn-primary ml-2"
          disabled={!text.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MobileChatInput;
