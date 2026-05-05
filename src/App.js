
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Mpesapayment from './components/Mpesapayment';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* navbar goes here  */}
        <Navbar />
        <header className="App-header">
         <div className='scroll-text'>Welcome to iphones </div>
        </header>
        <nav>

          {/* nav link goes here  */}
          <Link to="/signup" ></Link>
          <Link to="/signin" ></Link>
          <Link to="/home"></Link>
          <Link to="/addproducts" ></Link>

        </nav>
        {/* routes goes here  */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Getproducts />} />
          <Route path="/addproducts" element={<Addproducts />} />
          <Route path="/makepayment" element={<Mpesapayment />} />

        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;

