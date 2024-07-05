import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoute = (children, user, redirect = "/login") => {
  // use useNavigate instead of <Navigate/> in functional component
  const navigate = useNavigate();
  //   user is a object so if you use !user it will return false and the if condition will never run
  if (!user || Object.keys(user).length === 0) return navigate(redirect);
  //   if the above if condition dosen't run then the react will render children which includes {user: null, redired: "/login"} which is a object and you will get the error (you can log the children)
  return children ? children : <Outlet />;
};
export default ProtectRoute;
