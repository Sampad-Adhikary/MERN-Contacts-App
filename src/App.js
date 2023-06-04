import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Error from './pages/error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/contacts' element={<Dashboard/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}
export default App;