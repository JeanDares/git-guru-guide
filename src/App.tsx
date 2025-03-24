
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Commands from "./pages/Commands";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Transition from "./components/Transition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Transition>
                <Index />
              </Transition>
            }
          />
          <Route
            path="/commands"
            element={
              <Transition>
                <Commands />
              </Transition>
            }
          />
          <Route
            path="/chat"
            element={
              <Transition>
                <Chat />
              </Transition>
            }
          />
          <Route
            path="*"
            element={
              <Transition>
                <NotFound />
              </Transition>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
