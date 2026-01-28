import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleColors from "./pages/SingleColors";
import Header from "./components/Header";
import DuplicateColorsGame from "./pages/DuplicateColorsGame";
import Helper from "./components/Helper";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/unique" replace />} />
          <Route path="/unique" element={<SingleColors />} />
          <Route path="/duplicate" element={<DuplicateColorsGame />} />
        </Routes>
      </main>

      <Helper />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
