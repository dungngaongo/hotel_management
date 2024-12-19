import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/rooms"); // Lấy thông tin các phòng từ API

  return (
    <div className="pList">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data?.map((room) => (
            <div className="pListItem" key={room.number}>
              <img
                src={room.image || "default_image.jpg"}
                alt={room.type}
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>{room.type}</h1>
                <h2>Price: ₹{room.hour_price} per hour</h2>
                <p>{room.notes}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
