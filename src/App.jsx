import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { router } from "./routes";
import { Toaster } from "@/components/ui/sonner";

import { queryClient } from "./config/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          richColors
          position="bottom-center"
          theme="light"
          closeButton
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
