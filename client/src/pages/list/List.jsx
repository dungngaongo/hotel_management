import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import SearchItem from "../../components/searchItem/SearchItem";  
import { format } from "date-fns";  
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // import style mặc định
import "react-date-range/dist/theme/default.css"; // import theme~
import useFetch from "../../hooks/useFetch";
import "./list.css";

const List = () => {
  const { dates, options, setDates } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);  // Khai báo slideNumber
  const [open, setOpen] = useState(false);              // Khai báo open
  const [openDate, setOpenDate] = useState(false);      // Khai báo openDate
  const [min, setMin] = useState(0);                    // Khai báo min
  const [max, setMax] = useState(999);                  // Khai báo max
  const [openModal, setOpenModal] = useState(false);  // Khai báo state này

  // Fetch rooms data from the API
  const { data, loading, error } = useFetch(`/rooms?min=${min}&max=${max}`);

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
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder="Search for rooms" type="text" />
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                <div style={{ position: "relative" }}>
                  {openDate && (
                    <DateRange
                      onChange={(item) => setDates([item.selection])}
                      ranges={dates}
                      minDate={new Date()}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      className="datePicker"
                    />
                  )}
                </div>
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.adult || 1}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput"
                      placeholder={options.children || 0}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput"
                      placeholder={options.room || 1}
                    />
                  </div>
                </div>
              </div>
              <button>Search</button>
            </div>

            <div className="listResult">
              {loading
                ? "Loading..."
                : error
                ? "Something went wrong"
                : data.map((item) => (
                    <SearchItem key={item.room_number} item={item} />
                  ))}
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default List;
