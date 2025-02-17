import Signup from "./pages/signup"
import Home from "./pages/Home"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./pages/Login"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
 

  return (
    <div className="text-notes-app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
      </Routes>
      <ToastContainer />
      </BrowserRouter>
       
    </div>
  )
}

export default App
