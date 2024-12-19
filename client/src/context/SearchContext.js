import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  dates: [
    {
      startDate: new Date(), 
      endDate: new Date(),
      key: "selection",
    },
  ], 
  options: {
    adult: 1, 
    children: 0, 
    room: 1, // Giá trị mặc định
  },
  room: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return { ...action.payload }; // Lưu các giá trị tìm kiếm mới
    case "RESET_SEARCH":
      return INITIAL_STATE; // Đặt lại tìm kiếm
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  const setDates = (dates) => {
    dispatch({ type: "NEW_SEARCH", payload: { ...state, dates } });
  };

  return (
    <SearchContext.Provider value={{ ...state, setDates, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
