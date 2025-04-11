import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? String(localStorage.getItem("user"))
    : null;

  return (
    <main className="flex flex-col">
      <div className="flex px-5 pt-2 justify-between items-center pb-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <img src="/assets/logo.png" className="w-[65px]" alt="logo" />
          <h1 className="text-2xl max-sm:text-[1.3rem] text-yellow-400">
            Railway Reservations
          </h1>
        </div>
        {!user && user === null ? (
          <div className="flex space-x-4 items-center ">
            <button
              className=" 
      font-semibold text-[1rem] p-1 px-4 rounded-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="p-1 
      font-semibold text-red-400 text-[1rem] px-4 rounded-md"
            >
              Signup
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 items-center ">
            <h1
              className=" 
        font-semibold text-[1rem] p-1 px-4 rounded-md"
            >
              {user}
            </h1>
            <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setTimeout(() => {
                    navigate("/");
                }, 2000);
              }}
              className="p-1 
        font-semibold text-red-400 text-[1rem] px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        )}

        {/* logged in user */}
      </div>
      <nav
        className="flex bg-yellow-800 
          space-x-16 items-center py-1 pl-10 "
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/find-train">Find Train</NavLink>
        <NavLink to="/reservations">Reservation</NavLink>
        <NavLink to="/profile">User Profile</NavLink>
      </nav>
    </main>
  );
};

export default Navbar;
