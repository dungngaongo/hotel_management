import { Link } from "react-router-dom";
import "./searchItem.css";
import axios from 'axios'
import { useState } from "react";

const SearchItem = ({ item }) => {
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái mở dialog
  const [bookingDetails, setBookingDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    room_number: item.room_number,
    from_time: "",
    to_time: "",
  });

  const handleReserveClick = () => {
    setOpenDialog(true); // Hiển thị dialog
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8800/api/bookings", {
        first_name: bookingDetails.first_name,
        last_name: bookingDetails.last_name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        room_number: item.room_number,
        from_time: bookingDetails.from_time,
        to_time: bookingDetails.to_time,
      });
      console.log("Booking successful:", response.data);
      alert("Booking successful!");
      setOpenDialog(false);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert("Failed to book the room. Please try again.");
    }
  };

  return (
    <div className="searchItem">
      <img
        src={item.image.startsWith("/") ? `http://localhost:8800${item.image}` : item.image}
        alt="room"
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.type}</h1>
        <span className="siDistance">Floor: {item.floor}</span>
        <span className="siSubtitle">{item.notes}</span>
        <span className="siFeatures">Area: {item.area} m²</span>
        <span className="siCancelOp">Available now!</span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">${item.hour_price}/hour</span>
          <span className="siTaxOp">${item.daily_price}/day</span>
          <button className="siCheckButton" onClick={handleReserveClick}>
            Reserve Now
          </button>
        </div>
      </div>

      {openDialog && (
        <div className="dialogOverlay">
          <div className="dialog">
            <h2>Reserve Room {item.room_number}</h2>
            <div className="dialogContent">
              <label>
                First Name:
                <input type="text" name="first_name" value={bookingDetails.first_name} onChange={handleChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="last_name" value={bookingDetails.last_name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={bookingDetails.email} onChange={handleChange} />
              </label>
              <label>
                Phone:
                <input type="text" name="phone" value={bookingDetails.phone} onChange={handleChange} />
              </label>
              <label>
                Check-in:
                <input type="datetime-local" name="from_time" value={bookingDetails.from_time} onChange={handleChange} />
              </label>
              <label>
                Check-out:
                <input type="datetime-local" name="to_time" value={bookingDetails.to_time} onChange={handleChange} />
              </label>
            </div>
            <div className="dialogActions">
              <button onClick={handleSubmit}>Confirm</button>
              <button onClick={() => setOpenDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
