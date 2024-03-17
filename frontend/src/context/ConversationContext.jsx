import { createContext, useContext, useReducer } from "react";
export const ConversationContext = createContext();

const initialState = {
  messages: [],
  chats: [],
  selectedConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "chats/loaded":
      return { ...state, chats: action.payload };
    case "groupChat/created":
      return { ...state, chats: [...state.chats, action.payload] };
    case "messages/loaded":
      return {
        ...state,
        messages: action.payload,
      };
    case "message/received":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "message/sent": {
      return {
        ...state,
        messages: [...state.messages, action.payload],
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
  const [{ messages, chats, selectedConversation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ConversationContext.Provider
      value={{
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
