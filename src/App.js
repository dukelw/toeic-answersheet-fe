import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import ToeicForm from "../src/pages/ToeicForm";
import CreateAnswer from "./pages/CreateAnswer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/answersheet/:id" element={<ToeicForm />}></Route>
        <Route path="/add" element={<CreateAnswer />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
