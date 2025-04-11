import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login";
import Reservation from "./Reservation";
import Signup from "./Signup";
import FindTrain from "./FindTrain";
import Profile from "./Profile";
import EditUser from "./EditUser";

const Body = () => {
  return (
    <main className="min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/find-train" element={<FindTrain />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Body;
