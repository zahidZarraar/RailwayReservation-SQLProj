import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditUser = () => {

  const userId = localStorage.getItem("userId")
  ? String(localStorage.getItem("userId"))
    : null; // gets the user id from the localStorage.
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: Number(userId),
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    marital: "",
    mobile: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/updateuser", formData);
      toast.success("User Updated Succesfully !");
      setTimeout(() => {
        navigate('/profile');        
      }, 2000);
    } catch (e) {
      console.log("error updating the user details");
      toast.error("Error while Updating the User !");
      throw new e;
    }
  };

  return (
    <main className='px-7 py-10'>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold text-black mb-6">Edit Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              E-Mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="dob" className="text-gray-600">
              Dob:
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-gray-600">
              Gender:
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="marital" className="text-gray-600">
              Marital Status:
            </label>
            <select
              name="marital"
              id="marital"
              value={formData.marital}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="">Select</option>
              <option value="unmarried">Unmarried</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile" className="text-gray-600">
              Mobile No:
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-6 bg-yellow-700 mt-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditUser;
