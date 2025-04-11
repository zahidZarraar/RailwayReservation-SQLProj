import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const localId = localStorage.getItem("userId")
    ? String(localStorage.getItem("userId"))
    : null; // gets the user value from the localStorage.

  const getUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/getuser", {
        userId: localId
      });
      setUser(await response.data.data);
      localStorage.setItem("userId", await response.data.data.id);
    } catch (e) {
      console.log("error white getting the user details.");
      toast.error("User not found.", {
        position: "bottom"
      });
      throw new e();
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    navigate("/edituser");
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    let confirmation = confirm("are you sure you want to delete the user ? ");
    if (confirmation) {
      try {
        await axios.post("http://localhost:3000/deleteuser", {
          userId: localId
        });
        toast.success("User Deleted Succesfully !");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (e) {
        console.log("error deleting the user details");
        toast.error("Error while deleting the User !");
        throw new e();
      }
    } else {
      toast.success("user not deleted, dont worry 😊");
    }
  };

  useEffect(() => {
    if (!localId || localId === null) {
      toast.error("please login before accessing the page .");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      getUser();
    }
  }, []);

  return (
    <main className="p-6">
      <Toaster richColors />
      <div className="bg-gray-200 text-black p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-gray-600">First Name:</p>
            <p>{user?.f_name}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Name:</p>
            <p>{user?.l_name}</p>
          </div>
          <div>
            <p className="text-gray-600">E-Mail:</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Dob:</p>
            <p>{user?.dob}</p>
          </div>
          <div>
            <p className="text-gray-600">Gender:</p>
            <p>{user?.gender}</p>
          </div>
          <div>
            <p className="text-gray-600">Marital Status:</p>
            <p>{user?.marital}</p>
          </div>
          <div>
            <p className="text-gray-600">Mobile No:</p>
            <p>{user?.mobile}</p>
          </div>
          {/* <div>
            <p className="text-gray-600">Security Question:</p>
            <p>What is your favorite movie?</p>
          </div>
          <div>
            <p className="text-gray-600">Security Answer:</p>
            <p>Avengers</p>
          </div> */}
        </div>
        <div className="flex items-center mt-10 space-x-8">
          <button
            onClick={editHandler}
            className="text-xl animate-pulse  font-semibold text-yellow-700 hover:underline"
          >
            Edit Profile
          </button>
          <button
            onClick={deleteHandler}
            className="text-md font-semibold text-white px-4 rounded-md bg-red-500 hover:underline"
          >
            Delete user
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
