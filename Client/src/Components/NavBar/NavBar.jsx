import { Link, useLocation } from "react-router-dom";
import Menu from "./menu/Menu";
import Styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import LocationFilter from "./LocationFilter/LocationFilter";
import Notifications from "./Notifications/Notifications";
import { useSelector } from "react-redux";
import { MdArrowBackIos } from 'react-icons/md' 
import { transform } from "framer-motion";

const Navbar = () => {
  const [scrollHeight, setScrollHeight] = useState(0)
  let { pathname } = useLocation();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position)
  }
  
  
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
  }, [scrollHeight])

  const { isLogged } = useSelector(state => state.user)


  return (
    <header className={Styles.ContenedorHeader}>
      <nav className={`${Styles.ContenedorNavbar} ${Styles.navbar} ${scrollHeight > 1 ? Styles.scrolling : null}`}>
        <div className={Styles.left}>
          <Link to="/">
            {" "}
            <span className={Styles.Titulo}>
              <MdArrowBackIos size={20} color={pathname === '/' ? 'transparent' : 'white'} />
              <img src={require('../../Assets/logo.png')} alt="Eventoo" />
            </span>
          </Link>
          {pathname === '/' && 
            <div className={Styles.locationWrapper}>
              <LocationFilter />
            </div>
          }
          </div>
        <div className={Styles.searchbarOpen}>
          {pathname === '/' && <SearchBar />}
        </div>
        <div className={Styles.MenuItems}>
            <Link className={Styles.MenuLink} to={"/create-event"}>Create Event</Link>
            <div className={Styles.divisor}></div>
             { isLogged && <Notifications /> } 
            <Menu />
        </div>
      </nav>
      {
        pathname === '/' &&
          <div className={Styles.locationBar}>
            <LocationFilter />
          </div>
      }
    </header>
  );
};

export default Navbar;