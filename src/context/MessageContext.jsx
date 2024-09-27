import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "../services/supabase";
import PropTypes from "prop-types";

MessageProvider.propTypes = {
  children: PropTypes.any,
};

const MessageContext = createContext();

function MessageProvider({ children }) {
  const [realtimeLogs, setRealtimeLogs] = useState([]);
  const queryClient = useQueryClient();

  // Listen for new logs
  useEffect(() => {
    const channel = supabase
      .channel("realtime logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "logs" },
        (payload) => {
          setRealtimeLogs((prevLogs) => [payload.new, ...prevLogs]);
          toast("New message!", {
            icon: "📫",
          });
          queryClient.invalidateQueries({
            queryKey: ["newLogs"],
          });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [setRealtimeLogs, queryClient]);

  return (
    <MessageContext.Provider
      value={{
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
