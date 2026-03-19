"use client";

import { useEffect, useRef } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useChat } from "@/lib/contexts/chat-context";

export function ChatInterface() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, status, error } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="min-h-full flex flex-col px-4 pt-4 pb-2">
          <MessageList messages={messages} isLoading={status === "streaming"} />
        </div>
      </div>
      {error && (
        <div className="flex-shrink-0 px-4 py-2 bg-red-50 border-t border-red-200 text-sm text-red-700">
          Error: {error}
        </div>
      )}
      <div className="flex-shrink-0">
        <MessageInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={status === "submitted" || status === "streaming"}
        />
      </div>
    </div>
  );
}
