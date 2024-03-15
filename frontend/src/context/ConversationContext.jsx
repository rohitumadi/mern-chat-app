import { createContext, useContext, useReducer } from "react";

export const ConversationContext = createContext();

const initialState = {
  messages: [],
  chats: [],
  isGettingChats: false,
  isSendingMessage: false,
  isGettingMessages: false,
  selectedConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "chats/loading":
      return { ...state, isGettingChats: true };
    case "chats/loaded":
      if (state.selectedConversation !== null) {
        const updatedSelectedConversation = action.payload.find(
          (chat) => chat._id === state.selectedConversation._id
        );
        console.log(updatedSelectedConversation);
        return {
          ...state,
          chats: action.payload,
          selectedConversation: updatedSelectedConversation,
          isGettingChats: false,
        };
      }
      return { ...state, chats: action.payload, isGettingChats: false };
    case "groupChat/created":
      return { ...state, chats: [...state.chats, action.payload] };
    case "messages/loading":
      return { ...state, isGettingMessages: true };
    case "message/sending":
      return { ...state, isSendingMessage: true };
    case "messages/loaded":
      return {
        ...state,
        messages: action.payload,
        isGettingMessages: false,
      };
    case "message/received":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "message/sent": {
      const updatedChats = state.chats.map((chat) => {
        if (
          chat.participants.at(0)._id === state.selectedConversation.receiverId
        ) {
          return {
            ...chat,
            lastMessage: action.payload.message,
            lastMessageTime: action.payload.createdAt,
          };
        } else {
          return chat;
        }
      });
      return {
        ...state,
        chats: updatedChats,
        messages: [...state.messages, action.payload],
        isSendingMessage: false,
      };
    }

    case "chat/selected":
      return {
        ...state,
        selectedConversation: action.payload,
      };
    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("Invalid action");
  }
}

export function ConversationContextProvider({ children }) {
  const [
    {
      messages,
      chats,
      selectedConversation,
      isSendingMessage,
      isGettingMessages,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <ConversationContext.Provider
      value={{
        isSendingMessage,
        isGettingMessages,
        chats,
        selectedConversation,
        messages,
        dispatch,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversationContext() {
  return useContext(ConversationContext);
}
