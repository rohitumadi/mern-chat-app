import { createContext, useContext, useReducer } from "react";
export const ConversationContext = createContext();

const initialState = {
  // chats: [],
  selectedConversation: null,
};

function reducer(state, action) {
  switch (action.type) {
    // case "chats/loaded":
    //   // update selected conversation when chat is selected and new chat is loaded
    //   if (state.selectedConversation !== null) {
    //     const updatedSelectedConversation = action.payload.find(
    //       (chat) => chat._id === state.selectedConversation._id
    //     );
    //     updatedSelectedConversation.receiverIds =
    //       updatedSelectedConversation.isGroupChat
    //         ? updatedSelectedConversation.participants.map((p) => p._id)
    //         : [updatedSelectedConversation.participants[0]._id];
    //     return {
    //       ...state,
    //       chats: action.payload,
    //       selectedConversation: updatedSelectedConversation,
    //     };
    //   }
    // return { ...state, chats: action.payload };
    // case "groupChat/created":
    //   return { ...state, chats: [...state.chats, action.payload] };

    case "chat/selected":
      return {
        ...state,
        selectedConversation: action.payload,
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
