import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic here to submit the form with the user data

    const userDetails = {
      fName,
      lName,
      email: email,
      password: password,
      gender: gender,
      marital_status: marital,
      dob,
      mobile: `+91${mobile}`
    };

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        toast.error("server error !");
        throw new Error("Error while  creating account");
      } else {
        try {
          toast.success("Succesfully Registered !");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } catch (e) {
          console.log("please enable localStorage to use the website !");
        }
      }
    });
  };

  return (
    <main>
      <Toaster />
      <h1 className="text-center text-3xl border-b border-yellow-800 font-semibold mt-4 pb-3">
        Sign Up
      </h1>
      <form
        className="mx-auto max:sm:w-full w-[500px] mt-20 p-4 py-10 rounded-md bg-gray-800 border border-white  flex flex-col items-start space-y-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mr-4 text-yellow-500 text-xl">First Name:</label>
          <input
            type="text"
            value={fName}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Last Name:</label>
          <input
            type="text"
            value={lName}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setLName(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Email:</label>
          <input
            type="email"
            value={email}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Password:</label>
          <input
            type="password"
            value={password}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Gender:</label>
          <input
            type="text"
            value={gender}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">
            Marital Status:
          </label>
          <input
            type="text"
            value={marital}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setMarital(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Date of Birth:</label>
          <input
            type="text"
            placeholder="01/01/2001"
            value={dob}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <label className="mr-4 text-yellow-500 text-xl">Mobile:</label>
          <input
            type="number"
            value={mobile}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button className="w-full bg-yellow-600 rounded-md py-1" type="submit">
          Signup
        </button>
        {!fName && (
          <p>
            already registered?{" "}
            <a className="text-blue-300" href="/signup">
              Login
            </a>
          </p>
        )}
      </form>
    </main>
  );
};

export default Signup;
