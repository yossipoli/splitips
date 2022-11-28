import './Navbar.css'
import { RiLoginCircleFill, RiLogoutCircleFill } from 'react-icons/ri'
import { BsFillCalculatorFill, BsCashCoin } from 'react-icons/bs'
import { FaCashRegister } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { API } from '../../DAL/API';
import { useEffect, useState } from 'react';

function NavBar() {
    const [login, setLogin] = useState(false)
    useEffect(()=>{
        (async function checkPermission() {
            await API.checkCookie() && setLogin(true)
        })()
    },[])
  return (
    <div className='navbar'>
        <div className="right">
            <div>
                <Link to="/calculator"> <BsFillCalculatorFill/> מחשבון  </Link>
            </div>
            <div>
                { login &&<Link to="/paycheck"> <BsCashCoin/> משכורות </Link>}
            </div>
        </div>
        <div className="left">
            { login
                ? <div>
                    <a href='/' onClick = {()=> API.logout()}> <RiLogoutCircleFill/> התנתק </a>
                </div>
                : <div>
                    <Link to="/register"> <FaCashRegister/> משתמש חדש </Link>
                    <Link to="/login"> <RiLoginCircleFill/> התחבר </Link>
                </div>
            }
        </div>
    </div>
  );
}

export default NavBar;