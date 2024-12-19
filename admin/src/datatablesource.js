export const userColumns = [
  { field: "user_id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "last_name", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
];

export const roomColumns = [
  { field: "room_number", headerName: "Room Number", width: 100 }, 
  { field: "floor", headerName: "Floor", width: 100 },
  { field: "area", headerName: "Area (m²)", width: 100 },
  { field: "hour_price", headerName: "Hourly Price", width: 150 },
  { field: "daily_price", headerName: "Daily Price", width: 150 },
  { field: "type", headerName: "Room Type", width: 150 },
  { 
    field: "status", 
    headerName: "Status", 
    width: 100,
    valueGetter: (params) => params.row.Room?.status || "Unknown" 
  }, 
  { field: "notes", headerName: "Notes", width: 200 },
];

export const bookingColumns = [
  { field: "id", headerName: "Booking ID", width: 100 },
  { field: "user_id", headerName: "User ID", width: 100 },
  { field: "room_number", headerName: "Room Number", width: 100 },
  { field: "from_time", headerName: "Check-in Time", width: 200 },
  { field: "to_time", headerName: "Check-out Time", width: 200 },
  { field: "rent_at", headerName: "Rent At", width: 200 },
  {
    field: "check_in",
    headerName: "Checked In",
    width: 150,
    valueGetter: (params) => (params.row.check_in ? "Yes" : "No"),
  },
];
  