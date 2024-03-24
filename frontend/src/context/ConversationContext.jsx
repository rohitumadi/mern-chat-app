import { createContext, useContext, useReducer } from "react";
export const ConversationContext = createContext();

const initialState = {
  // chats: [],
  selectedConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "chat/selected":
      return {
        ...state,
        selectedConversation: action.payload,
      };
    case "groupChat/left":
      return {
        ...state,
        selectedConversation: null,
      };

    case "chat/created":
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
  const [{ selectedConversation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
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
