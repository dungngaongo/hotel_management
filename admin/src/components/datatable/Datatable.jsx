import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import EditDialog from "../editDialog/EditDialog";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedRow, setSelectedRow] = useState(null); 

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item.room_number !== id));
      alert("Room deleted successfully!");
    } catch (err) {
      console.error("Error deleting room:", err);
      alert("Failed to delete the room. Please try again.");
    }
  };

  const getRowId = (row) => {
    if (path === "bookings") return row.id; 
    if (path === "users") return row.user_id; 
    if (path === "rooms") return row.room_number;
  };

  const handleEdit = (row) => {
    const { Room, ...rowWithoutRoom } = row; 
    setSelectedRow(rowWithoutRoom); 
    setOpenDialog(true);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleEdit(params.row)} 
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.room_number)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New 
        <Link to={ `/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid                                                   
        className="datagrid"
        rows={list || []}                                              
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={getRowId}
      />

      {openDialog && (
        <EditDialog
          open={openDialog}
          setOpen={setOpenDialog}
          row={selectedRow}
          path={path}
          setList={setList}
        />
      )}
    </div>
  );
};

export default Datatable;
