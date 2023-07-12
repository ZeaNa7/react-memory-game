import {
  Routes,
  Route
} from "react-router-dom";
import Starter from "./pages/starter";
import Game from "./pages/game";
  
function App() {
  return (
    <>
    <div className="App"></div>
        <Routes>
          <Route path="/" element={<Starter />} />
          <Route path="/game" element={<Game/>} />
        </Routes>
    <div/>
    </>
  );
}
  
export default App;