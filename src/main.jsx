import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace("/dashboard")}
  >
    <MessageProvider>
      <App />
    </MessageProvider>
  </ErrorBoundary>
);
