import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";

const Reservation = () => {
  const [reservation, setReservation] = useState({
    from: null,
    to: null,
    quota: 0
  });
  const [trains, setTrains] = useState([]);

  const user = localStorage.getItem("user")
    ? String(localStorage.getItem("user"))
    : null; // gets the user value from the localStorage.

  const [date, setDate] = useState("none");
  const navigate = useNavigate();

  const fromHandler = (e) => {
    e.preventDefault();
    setReservation((prev) => ({ ...prev, from: e.target.value }));
  };

  const toHandler = (e) => {
    e.preventDefault();
    setReservation((prev) => ({ ...prev, to: e.target.value }));
  };

  const quotaHandler = (e) => {
    e.preventDefault();
    setReservation((prev) => ({ ...prev, quota: e.target.value }));
  };

  const onDateChange = (event) => {
    setDate(event.target.value);
  };

  const okHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/reservation", {
        from: reservation.from,
        date: date,
        to: reservation.to
      });
      setTrains(await response.data.data);
    } catch (e) {
      console.log("error white getting the train details.");
      throw new e();
    }

    console.log("traindetails : ", trains);
  };

  const resetHandler = (e) => {
    e.preventDefault();
  };

  // trains.length > 0 && trains.map((train, index) => {
  //     console.log('train: ', train);
  // })

  useEffect(() => {
    if (!user || user === null) {
      toast.error("please login before accessing the page .");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);

  return (
    <main className="p-8 flex h-full space-x-8">
      <Toaster />
      {/* left side */}
      <div className="flex-[0.5] h-max rounded-md space-y-10 p-6 flex text-white font-medium w-max flex-col bg-gray-500 ">
        <div className="flex space-x-8 ">
          <label>From : </label>
          <input
            type="text"
            placeholder="Surat"
            className="text-black pl-2"
            onChange={fromHandler}
          />
        </div>
        <div className="flex space-x-8">
          <label>To : </label>
          <input
            type="text"
            placeholder="BCT"
            className="text-black pl-2"
            onChange={toHandler}
          />
        </div>
        <div className="flex space-x-8">
          <label>Quota : </label>
          <input
            type="number"
            placeholder="1"
            className="text-black pl-2"
            onChange={quotaHandler}
          />
        </div>
        <div className="flex space-x-8">
          <label>Date : </label>
          <input
            type="date"
            className="text-black border border-gray-800"
            value={date}
            onChange={onDateChange}
          />
        </div>
        <div>
          <button
            className="text-white bg-yellow-600 px-6 py-1
           rounded-md"
            onClick={okHandler}
          >
            OK
          </button>
          <button
            className="text-yellow-600 bg-white px-6 py-1
           rounded-md ml-8"
            onClick={okHandler}
          >
            Reset
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="flex-[1] h-[70vh] rounded-md max-h-max overflow-y-scroll space-y-10 p-6 flex text-white font-medium w-max flex-col bg-gray-500 ">
        {trains.length > 0 ? (
          <table className="border p-4">
          <thead className="border-b text-center text-yellow-400">
            <th>Train No.</th>
            <th>Train Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Arrival Time</th>
            <th>Reaching Time</th>
          </thead>
          <tbody>
            {trains.length > 0 &&
              trains.map((train, index) => {
                console.log("train: ", train);
                return (
                  <tr key={index} className="text-center border">
                    <td>{train?.Number}</td>
                    <td>{train?.Name}</td>
                    <td>{train?.Ori}</td>
                    <td>{train?.Dest}</td>
                    <td>{train?.Oriarri}</td>
                    <td>{train?.Desarri}</td>
                    <td>
                      <button className='text-white px-4 rounded-md hover:bg-green-400 bg-blue-500'
                      onClick={()=> alert(`You sure you want to book ${reservation.quota} ticket for ${train?.Name} ?`)}
                      >Reserv</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        ) : (
            <h1 className='mx-auto text-red-200 text-[1.1rem]'>Trains not available, Please come again later.</h1>
        ) }
        
      </div>
    </main>
  );
};

export default Reservation;
