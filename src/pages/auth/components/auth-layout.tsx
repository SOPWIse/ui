import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-[100vh] w-[100vw]">
      {/* FORM */}
      <div className="w-1/2 h-full">
        <Outlet />
      </div>
      {/* IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1531739055420-dd1c1852124e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2865&q=80"
        className="hidden object-cover object-center w-1/2 h-full sm:flex"
        alt="loginImage"
      />
    </div>
  );
};

export default AuthLayout;
