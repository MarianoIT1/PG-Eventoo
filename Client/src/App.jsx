import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';
//pages
import CreateEvent from "./Pages/CreateEvent";
import Setting from "./Pages/Setting";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Event from "./Pages/Event";
import CreateUser from "./Pages/CreateUser";
import Login from "./Pages/Login";
import UserEvent from "./Pages/UserEvents";
import ForgotPassword from "./Pages/ForgotPassword";
import NewReview from "./Pages/NewReview";

//libraries
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import RecoverPass from "./Pages/RecoverPass";
import SessionModal from "./Components/Modal/ModalSession/ModalSessionContainer";
import { SessionContext } from ".";
import { getUserData, googleLogin} from "./Slice/User/UserSlice";
// import ModalVoucher from "./Components/ModalVoucher/ModalVoucher";
import Cart from "./Pages/UserEvents";
import { getBankAccounts } from "./Slice/BankAcount/BankAcount";
import Admin from "./Pages/Admin";
import { getFavorites } from "./Slice/Favorites/FavoritesSlice";
import { getEventsManagement } from "./Slice/eventsManagement/eventsManagementSlice";

export const API = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'https://api.eventoo.com.ar',
  headers: {
    common: {
      'authorization': 'Bearer ' + localStorage.getItem("token"),
    }
  }
});

function App() {
  
  const { showSessionModal, setShowSessionModal } = useContext(SessionContext)
  const dispatch = useDispatch();

  window.handleGoogleLogin = function ({ credential }) {
    dispatch(googleLogin({credential, setShowSessionModal }))
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["authorization"] = "Bearer " + token;
      dispatch(getUserData());
      dispatch(getEventsManagement());
      dispatch(getFavorites());
      dispatch(getBankAccounts());
    }
  }, []);



  const { isLogged, roleAdmin } = useSelector((state) => state.user);

  return (

    <BrowserRouter>
      {showSessionModal !== null && <SessionModal />}
      <Routes>
        {/* <Route exact path="/" element={<Landing />} /> */}
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/setting" element={!isLogged ? <Navigate to='/'/> : <Setting />} />
        <Route path="/admin" element={isLogged && roleAdmin  && roleAdmin !== "USER" ? <Admin /> : <Navigate to='/'/> }/>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-user" element={isLogged ? <Navigate to='/'/> : <CreateUser />}></Route>
        <Route path="/login" element={isLogged ? <Navigate to='/'/> : <Login />}></Route>
        <Route path="/event/:id" element={<Event />}></Route>
        <Route path="/new-review/:id" element={<NewReview />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/user-event" element={!isLogged ? <Navigate to='/' /> :<UserEvent />}></Route>
        {/* <Route path="/modal-voucher/:id" element={<ModalVoucher />}></Route> */}
        <Route path="/user-event" element={<UserEvent />}></Route>
        <Route path="/forgot-password" element={isLogged ? <Navigate to='/'/> : <ForgotPassword />}></Route>
        <Route path="/reset-password/:emailtoken" element={isLogged ? <Navigate to='/'/> : <RecoverPass />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

