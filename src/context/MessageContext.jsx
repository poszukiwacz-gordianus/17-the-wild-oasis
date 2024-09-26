import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

MessageProvider.propTypes = {
  children: PropTypes.any,
};

const MessageContext = createContext();

function MessageProvider({ children }) {
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [realtimeLogs, setRealtimeLogs] = useState([]);

  // Listen for new logs
  useEffect(() => {
    const channel = supabase
      .channel("realtime logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "logs" },
        (payload) => {
          setNewMessageCount((prevCount) => prevCount + 1);
          setRealtimeLogs((prevLogs) => [payload.new, ...prevLogs]);
          toast.success("New message");
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [setNewMessageCount, setRealtimeLogs]);

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
