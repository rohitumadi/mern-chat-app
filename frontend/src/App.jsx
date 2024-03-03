import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { ConversationContextProvider } from "./context/ConversationContext";
import RateLimit from "./pages/error/RateLimit";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //60sec =60*1000 milliseconds
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  const { authUser } = useAuthContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConversationContextProvider>
        <div className="p-4 h-screen flex bg-cover items-center justify-center  ">
          <Routes>
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={authUser ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="/rate-limit" element={<RateLimit />} />
          </Routes>
          <Toaster />
        </div>
      </ConversationContextProvider>
    </QueryClientProvider>
  );
}

export default App;
