import { AuthProvider } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  return (
    <>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  
      <div className="min-h-screen max-h-screen flex flex-col !overflow-clip">
        <main className="min-h-screen max-h-screen w-full flex">
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </main>
      </div>
    </>
  );
};

export default AppLayout;
