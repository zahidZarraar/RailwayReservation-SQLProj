import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider() {
  return (
    <div className="carousel-wrapper flex-1 h-full bg-red-600">
      <Carousel infiniteLoop useKeyboardArrows autoPlay>
        <div className='slide'>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OTp0CfNLxE0Cwtv4jWz_hfLS9Ng6Dd7hiUB2lFnS_Qt2DDAd6x7JVDgfVrpwUudOOXo&usqp=CAU"
          />
        </div>
        <div>
          <img
            src="https://bsmedia.business-standard.com/_media/bs/img/article/2022-08/31/full/1661918127-7457.jpg"
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeNbc_FRvuBDj8eEteWM4aW5BrE-fVCj4Vdg&usqp=CAU"
          />
        </div>
      </Carousel>
    </div>
  );
}
