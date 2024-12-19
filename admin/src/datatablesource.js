export const userColumns = [
  { field: "user_id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "last_name", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
];

export const roomColumns = [
  { field: "room_number", headerName: "Room Number", width: 100 }, // Sử dụng room_number từ RoomInfo
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
  }, // Sử dụng status từ Room
  { field: "notes", headerName: "Notes", width: 200 },
];
  