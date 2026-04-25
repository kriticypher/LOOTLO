import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#F5F5DC] text-[#333333]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
            
            <footer className="py-6 text-center text-sm text-[#333333]">
              <p>&copy; {new Date().getFullYear()} Lootlo. Built by students.</p>
            </footer>
          </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
  );
}

export default App;
