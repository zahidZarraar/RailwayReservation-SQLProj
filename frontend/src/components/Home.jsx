import Slider from "./Slider";

const Home = () => {
  return (
    <div className="flex h-[90vh] flex-col space-y-4 p-4 justify-between">
      <section className="flex items-start mx-auto  mt-10 max-h-[650px]">
        <div className="flex-[0.9] max-w-[1000px] h-[80%] text-center">
          <Slider />
        </div>
        <div className="flex-[0.4] xl:flex-1 w-full px-5 rounded-md h-full border mx-4 py-4 max-w-[400px]">
          <p className="text-yellow-500 text-xl">
            Railway Reservation system build using the following stacks :{" "}
          </p>
          <ul className="">
            <li>React</li>
            <li>TailwindCss</li>
            <li>Express</li>
            <li>SQL</li>
          </ul>

          <p className="text-yellow-500 mt-4 text-xl">
            Railway Reservation system build using the following stacks :{" "}
          </p>
          <ul className="">
            <li>Saad</li>
            <li>Zahid</li>
            <li>Richen</li>
            <li>Safwaan</li>
          </ul>
        </div>
      </section>
      <footer className="flex justify-between items-center py-4 bg-black text-gray-200 px-4 border-t border-gray-800">
        <h1>Railway Reservation Project</h1>
        <p>like the project ? give extra marks🙂</p>
      </footer>
    </div>
  );
};

export default Home;
