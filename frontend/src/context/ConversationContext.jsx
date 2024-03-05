import { createContext, useContext, useState } from "react";

export const ConversationContext = createContext();

export function useConversationContext() {
  return useContext(ConversationContext);
}

export function ConversationContextProvider({ children }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        chats,
        setChats,
        messages,
        setMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
