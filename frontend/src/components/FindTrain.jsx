import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const FindTrain = () => {
  const user = localStorage.getItem("user")
    ? String(localStorage.getItem("user"))
    : null; // gets the user value from the localStorage.
  const [trainName, setTrainName] = useState();
  const [destination, setDestination] = useState();
  const [trains, setTrains] = useState([]);

  const navigate = useNavigate();

  const selectHandler = (e) => {
    e.preventDefault();
    setTrainName(e.target.value);
  };

  const destHandler = (e) => {
    e.preventDefault();
    setDestination(e.target.value);
  };

  const findHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/findtrain", {
        destination,
        trainName
      });
      setTrains(await response.data.data);
    } catch (e) {
      console.log("error white getting the train details.");
      toast.error('please try to find some other train.', { position: "bottom" })
      throw new e;
    }

  };
  console.log("traindetails : ", trains);


  useEffect(() => {
    if (!user || user === null) {
      toast.error("please login before accessing the page .");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);

  return (
    <main className="p-6 flex flex-col space-y-6">
      <Toaster richColors />
      {/* top */}
      <div className="flex justify-evenly items-center py-5 rounded-md bg-gray-500 text-white">
        <h1 className="text-yellow-400 text-xl font-semibold">Search Train</h1>
        <select
          className="bg-gray-100  text-black px-3 rounded-md"
          name="select"
          id="select"
          onChange={selectHandler}
        >
          <option value="shatabdi exp">Shatabdi Exp</option>
          <option value="adi double deck">Adt Double Deck</option>
          <option value="BCT DOUBLEDECKE">Bct Doubledick</option>
          <option value="mumbai rajdhani">Mumbai Rajdhani</option>
          <option value="bct duronto">Bct Duronto</option>
          <option value="karnavati exp">Karnavati Exp</option>
          <option value="admedabad pass">Ahmedabab Pass</option>
        </select>
        {/* <div className="flex gap-2">
          <label htmlFor="from">From : </label>
          <input className='pl-2 text-black' type="text" id="from" placeholder="City or Station" />
        </div> */}

        <div className="flex gap-2">
          <label htmlFor="to">Destination : </label>
          <input
            value={destination}
            onChange={destHandler}
            className="pl-2 text-black"
            type="text"
            id="to"
            placeholder="City or Station"
          />
        </div>
        <button
          onClick={findHandler}
          className="px-4 font-semibold rounded-lg shadow-md bg-yellow-500 hover:bg-green-700 text-black focus :outline-none focus:ring-2">
          Find
        </button>
      </div>
      <div className="w-full rounded-md max-h-max overflow-y-scroll space-y-10 p-6 flex text-white font-medium flex-col bg-gray-500">
        {trains.length > 0 ? (
          <table className="border p-4">
            <thead className="border-b text-yellow-500">
              <th>Train No.</th>
              <th>Train Name</th>
              <th>Cost</th>
              <th>Destination</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
              <th>S</th>
            </thead>
            <tbody>
              {trains.length > 0 &&
                trains.map((train, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <td>{train?.Number}</td>
                      <td>{train?.Name}</td>
                      <td>₹{train?.['1A']}</td>
                      <td>{train?.Destination}</td>
                      <td>{train?.Arrival}</td>
                      <td>{train?.Departure}</td>
                      <td>{train?.Mon}</td>
                      <td>{train?.Tue}</td>
                      <td>{train?.Wed}</td>
                      <td>{train?.Thu}</td>
                      <td>{train?.Fri}</td>
                      <td>{train?.Sun}</td>
                      <td>{train?.Sun}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h1 className="mx-auto text-red-200 text-[1.1rem]">
            Please Search to find the f..ing train.
          </h1>
        )}
      </div>
    </main>
  );
};

export default FindTrain;
