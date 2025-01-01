import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from "./Authentication/SignIn";
import Signup from "./Authentication/SignUp";
//import Map from "./Map/map";
import Maptemp from "./Map/Maptemp"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Maptemp />} />
        {/* Default route or catch-all */}
        <Route path="/" element={<h1>Welcome! Please sign in or sign up.</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
