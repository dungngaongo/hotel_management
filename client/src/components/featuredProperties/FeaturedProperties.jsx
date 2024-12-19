import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  // Lấy dữ liệu cho khách sạn duy nhất từ API của bạn
  const { data, loading, error } = useFetch("/hotel");  // API lấy thông tin khách sạn duy nhất

  return (
    <div className="fp">
      {loading ? "Loading" : (
        <>
          <div className="fpItem">
            <img
              src={"https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"}
              alt="hotel"
              className="fpImg"
            />
            <span className="fpName">{"Hotel Name"}</span>
            <span className="fpCity">{"Hotel Location"}</span>
            <span className="fpPrice">Starting from Rs.{"1000"}</span>
            {data?.rating && (
              <div className="fpRating">
                <button>{data?.rating}</button>
                <span>Excellent</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
