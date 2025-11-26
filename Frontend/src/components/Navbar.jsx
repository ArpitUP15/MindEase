import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/images/logo.png"
import { useAuth } from "@/context/AuthContext.jsx";

const Navbar = ({
  homeRef,
  featureRef,
  testimonialRef,
  howItWorksRef,
  contactRef,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleNavigation = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="px-8 py-2 flex items-center text-[#FFC666]">
      <div className="flex gap-2 basis-[25%] items-center">
        <div>
          <img src={logo} alt="" className="w-6" />
        </div>
        <div className="text-[#2589FB] font-bold text-xl">MindEase</div>
      </div>

      <div className="w-full">
        <ul className="list-none flex items-center justify-center gap-8">
          <li
            className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
            onClick={() => handleNavigation(homeRef)}
          >
            Home
          </li>
          <li
            className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
            onClick={() => handleNavigation(featureRef)}
          >
            Features
          </li>
          <li
            className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
            onClick={() => handleNavigation(howItWorksRef)}
          >
            How it Works
          </li>
          <li
            className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
            onClick={() => handleNavigation(testimonialRef)}
          >
            Testimonals
          </li>
          <li
            className="hover:scale-105 text-sm cursor-pointer hover:underline transition-all duration-100 text-white"
            onClick={() => handleNavigation(contactRef)}
          >
            Contact
          </li>
        </ul>
      </div>

      <div className="basis-[20%] text-end">
        {!isAuthenticated ? (
          <Button
            variant="sih"
            size="sm"
            className="active:scale-[0.9] transition-all duration-100"
            onClick={() => navigate("/authenticate/login")}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="sih"
            size="sm"
            className="active:scale-[0.9] transition-all duration-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
