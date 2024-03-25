import { createContext, useContext, useReducer } from "react";

const MessageContext = createContext();

const initialState = {
  messages: [],
};

function reducer(state, action) {
  switch (action.type) {
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
    default:
      throw new Error("Invalid action");
  }
}

export function MessageContextProvider({ children }) {
  const [{ messages }, dispatch] = useReducer(reducer, initialState);

  return (
    <MessageContext.Provider
      value={{
        messages,
        dispatch,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
export function useMessageContext() {
  return useContext(MessageContext);
}
