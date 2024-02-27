import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConversationContextProvider } from "./context/ConversationContext";

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
          </Routes>
          <Toaster />
        </div>
      </ConversationContextProvider>
    </QueryClientProvider>
  );
}

export default App;
