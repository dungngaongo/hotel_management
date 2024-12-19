import "./newBooking.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { bookingInputs } from "../../formSource";
import axios from "axios";

const NewBooking = () => {
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const newBooking = {
                ...info, 
            };
            console.log("New Booking Data:", newBooking);

            await axios.post(`/bookings/add-booking`, newBooking, { withCredentials: true });
            alert("Booking added successfully!");
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Failed to add booking. Please try again.");
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Booking</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        
                    </div>
                    <div className="right">
                        <form>
                        <div className="formInput">
                            
                        </div>
                        {bookingInputs.map((input) => (
                            <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                    id={input.id}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewBooking;
