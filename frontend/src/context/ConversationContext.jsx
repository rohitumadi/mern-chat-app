import { createContext, useContext, useReducer } from "react";

export const ConversationContext = createContext();

const initialState = {
  messages: [],
  isLoading: false,
  isSendingMessage: false,
  isGettingMessages: false,
  selectedConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "messages/loading":
      return { ...state, isGettingMessage: true };
    case "message/sending":
      return { ...state, isSendingMessage: true };
    case "messages/loaded":
      return {
        ...state,
        messages: action.payload,
        isGettingMessage: false,
      };
    case "message/received":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "message/sent":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isSendingMessage: false,
      };
    case "chat/selected":
      return {
        ...state,
        selectedConversation: action.payload,
      };

    default:
      throw new Error("Invalid action");
  }
}

export function ConversationContextProvider({ children }) {
  const [
    {
      messages,
      isLoading,
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
        isLoading,
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
