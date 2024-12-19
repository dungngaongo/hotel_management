import React, { useState } from "react";
import "./editDialog.scss";
import axios from "axios";

const EditDialog = ({ open, setOpen, row, path, setList }) => {
    const [formData, setFormData] = useState(row); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            console.log("Data being sent:", formData);
            await axios.put(`/${path}/${formData.id || formData.user_id || formData.room_number}`, formData);
            alert("Updated successfully!");

            // Cập nhật danh sách dữ liệu sau khi lưu
            setList((prevList) =>
                prevList.map((item) =>
                item.id === formData.id || item.user_id === formData.user_id || item.room_number === formData.room_number 
                    ? formData
                    : item
                )
            );
            setOpen(false); 
        } catch (err) {
            console.error("Error updating:", err);
            alert("Failed to update. Please try again.");
        }
    };

    return (
        open && (
        <div className="dialogOverlay">
            <div className="dialog">
                <h2>Edit Details</h2>
                <form className="dialogForm">
                    {Object.keys(formData).map((key) => (
                    <div className="formGroup" key={key}>
                        <label>{key}</label>
                        <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        disabled={key === "id" || key === "user_id" || key === "room_number"} 
                        />
                    </div>
                    ))}
                </form>
                <div className="dialogActions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
        )
    );
};

export default EditDialog;
