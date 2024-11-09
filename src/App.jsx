import { useReducer, useState } from "react";
import { CartReducer, initialState } from "./CartReducer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Page from "./Page";

import { MovieContext, ThemeContext } from "./context";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [state, dispatch] = useReducer(CartReducer, initialState);
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Page />
          <ToastContainer />
        </MovieContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
