import Router from "@/routes/Router";
import GlobalStyles from "@/styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
