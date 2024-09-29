import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import ShowListing from './component/ShowListing';
import CreateListing from './component/CreateListing';
import EditListing from './component/EditListing'

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Home/>}></Route> */}
          <Route path='/listings' element={<Home />}></Route>
          <Route path='/listings/:id' element={<ShowListing />}></Route>
          <Route path='/listings/new' element={<CreateListing />}></Route>
          <Route path='/listings/:id/edit' element={<EditListing />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
