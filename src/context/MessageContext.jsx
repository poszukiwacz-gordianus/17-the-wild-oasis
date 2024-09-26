import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

MessageProvider.propTypes = {
  children: PropTypes.any,
};

const MessageContext = createContext();

function MessageProvider({ children }) {
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [realtimeLogs, setRealtimeLogs] = useState([]);

  return (
    <MessageContext.Provider
      value={{
        newMessageCount,
        setNewMessageCount,
        realtimeLogs,
        setRealtimeLogs,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

function useMessageContext() {
  const context = useContext(MessageContext);
  if (context === undefined)
    throw new Error("MessageContext was used outside of MessageProvider");
  return context;
}

export { MessageProvider, useMessageContext };
