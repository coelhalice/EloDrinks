import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen max-h-screen flex flex-col !overflow-clip">
      <main className="min-h-screen max-h-screen w-full flex">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
