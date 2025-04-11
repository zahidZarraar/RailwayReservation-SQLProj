import { useState } from "react";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic here to submit the form with the username and password
    const userDetails = {
      username: username,
      password: password
    };

    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDetails)
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        toast.error("Invalid User or Password");
        throw new Error("Error while  creating account");
      } else {
        try {
          localStorage.setItem("user", userDetails.username);
          localStorage.setItem("userId", data.userId);
          toast.success("User Succesfully Loggedin !");
          setTimeout(() => {
            window.location.href = "/";
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
      <form
        className="mx-auto mt-20 p-4 py-10 rounded-md bg-gray-800 border border-white w-max flex flex-col items-start space-y-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mr-4 text-yellow-500 text-xl">Username:</label>
          <input
            type="text"
            value={username}
            className="bg-gray-900 opacity-3 text-white border"
            onChange={(e) => setUsername(e.target.value)}
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

        <button className="w-full bg-yellow-600 rounded-md py-1" type="submit">
          Login
        </button>
        {!username && (
          <p>
            You don{"`"}t have account ?{" "}
            <a className="text-blue-300" href="/signup">
              Signup
            </a>
          </p>
        )}
      </form>
    </main>
  );
};

export default Login;
