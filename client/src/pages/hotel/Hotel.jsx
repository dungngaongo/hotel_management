import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/Reserve";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./hotel.css";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Lấy dữ liệu từ Context
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Dữ liệu của khách sạn duy nhất
  const hotelData = {
    name: "Lama Hotel",
    address: "123 Main Street, City, Country",
    distance: "500",
    cheapestPrice: 2000,
    photos: [
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1"
    ],
    title: "The Best Stay in City",
    desc: "This is a luxurious hotel offering the best services with an amazing view and relaxing atmosphere.",
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  // Hàm tính số ngày từ ngày bắt đầu đến ngày kết thúc
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  // Mở hình ảnh khi người dùng nhấp vào
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotelData.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotelData.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  // Khi nhấn nút "Reserve or Book Now!", hiển thị modal nếu người dùng đã đăng nhập
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login"); // Điều hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={hotelData.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
          </div>
        )}

        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{hotelData.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotelData.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotelData.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{hotelData.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotelData.photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotelData.title}</h1>
              <p className="hotelDesc">{hotelData.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <h2>
                <b>₹{days * hotelData.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>

      {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelData._id} />}
    </div>
  );
};

export default Hotel;
