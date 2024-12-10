import { Link } from 'react-router-dom'
import './styles.css';
import './stylesprime.css';
import logoSidebar from './logomarca_menu.png'
import { BsTools } from 'react-icons/bs'
import { RiCurrencyLine } from 'react-icons/ri'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { BsBoxes } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai'
import { RiHistoryFill } from 'react-icons/ri'
import { AiOutlineCar, AiOutlineUser } from 'react-icons/ai'
import { BiExpandHorizontal } from 'react-icons/bi';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import { TiArrowBack } from "react-icons/ti";
import { AiFillSetting } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function SideBar() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONAMENTO
  const navigate = useNavigate()
  const retur = () => {
    navigate(-1)
  };
  const [hidden, setHidden] = useState(false)
  const { signOut } = useContext(AuthContext)
  const { user } = useContext(AuthContext)
  const { endVisit } = useContext(AuthContext)
  const { visit } = useContext(AuthContext)
  const { userTipo } = useContext(AuthContext)
  const { vehicleDesc } = useContext(AuthContext)
  const { vehicleId } = useContext(AuthContext)

  const linkFuel = "/internal-fleet/view/" + vehicleId;

  const handleClick = () => {
    const nav = document.getElementById('nav-bar')
    const toggle = document.getElementById('nav-bar')
    const bodypd = document.getElementById('body-pd')
    const headerpd = document.getElementById('header')
    nav.classList.toggle('shows')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
  }

  if (userTipo == 'GESTOR') {
    return (
      <>
        <header className="header" id="header">


          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user + " | " + vehicleDesc}
              menuVariant="dark"
            >
              <Link to="/internal-fleet/view">
                <div className='dropdown-item' >
                  Selecionar um carro
                </div>
              </Link>
              {/* 
    <Link to={linkFuel}>
      <div className='dropdown-item' >
       Lançar Abastecimento
      </div>
    </Link>
*/}
              <NavDropdown.Divider />
              <Link onClick={signOut}>
                <div className='dropdown-item' >
                  Sair do App
                </div>
              </Link>
            </NavDropdown>
          </Nav>
        </header>

        <Button className='float-right btn-voltar' size="sm" variant="warning" onClick={retur}> <TiArrowBack /> Voltar</Button>

        <div className="l-navbar" id="nav-bar">

          <nav className="nav nav-drop">
            <div className="nav__toggle">
              <i id="header-toggle" onClick={handleClick}><BiExpandHorizontal /></i>
            </div>
            <div>
              <Link to="/" className="nav__logo">
                <img src={logoSidebar} alt="lgo sidebar" width="25px" />
                <span className="nav__logo-name">Telemática</span>
              </Link>

              <Link to="/user" className="nav__link">

                <AiOutlineUser className='bx bx-grid-alt nav__icon' />
                <span className="nav__logo-name">Usuários</span>
              </Link>

              <div className="nav__list">
                <Link to="/client" className="nav__link">
                  <HiOutlineBuildingStorefront className='bx bx-grid-alt nav__icon' />
                  <span className="nav__name">Clientes</span>
                </Link>

                <Link to="/equipment" className="nav__link">
                  <BsBoxes className='bx bx-user nav__icon' />
                  <span className="nav__name">Materiais</span>
                </Link>
                <Link to="/service" className="nav__link">
                  <BsTools className='bx bx-user nav__icon' />
                  <span className="nav__name">Serviços</span>
                </Link>
                <Link to="/internal-fleet" className="nav__link">
                  <AiOutlineCar className='bx bx-user nav__icon' />
                  <span className="nav__name">Fota Interna</span>
                </Link>
                <Link to="/ticket" className="nav__link">
                  <RiCurrencyLine className='bx bx-user nav__icon' />
                  <span className="nav__name">Faturamento</span>
                </Link>
                <Link to="/hardware" className="nav__link">
                  <AiFillSetting className='bx bx-user nav__icon' />
                  <span className="nav__name">Hardware</span>
                </Link>
              </div>
              {/*}
              <Link onClick={signOut} className="nav__link">
                <i className='bx bx-log-out nav__icon' ></i>
                <span className="nav__name">Log Out</span>
              </Link>
              */}
            </div>


          </nav>
        </div>

      </>
    )
  } if (userTipo == 'TECNICO' || userTipo == 'TERCEIRO') {

    return (
      <>
        <header className="header" id="header">


          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user + " | " + vehicleDesc}
              menuVariant="dark"
            >
              <Link to="/internal-fleet/view">
                <div className='dropdown-item' >
                  Selecionar um carro
                </div>
              </Link>
              {/* 
<Link to={linkFuel}>
<div className='dropdown-item' >
Lançar Abastecimento
</div>
</Link>
*/}
              <NavDropdown.Divider />
              <Link onClick={signOut}>
                <div className='dropdown-item' >
                  Sair do App
                </div>
              </Link>
            </NavDropdown>
          </Nav>
        </header>

        <div className="fixed-bottom fixed-bottom2 text-end " >
          <div className="nav-bottom container-bottom">
            <div className="nav__menu-bottom" id="nav-menu-bottom">
              <ul className="nav__list-bottom">
                <li className="nav__item-bottom">
                  <Link to="/service/view" className="nav__link-bottom active-link-bottom">
                    <BsTools className='bx bx-user nav__icon-bottom' />

                    <span className="nav__name-bottom">Home</span>
                  </Link>
                </li>
                <li className="nav__item-bottom">
                  <Link to='/vehicle/form' className="nav__link-bottom active-link-bottom">
                    <AiOutlineCar className='nav__icon-bottom' />
                    <span className="nav__name-bottom">Veículos</span>
                  </Link>
                </li>
                <li className="nav__item-bottom">
                  <Link to='/equipment/me' className="nav__link-bottom active-link-bottom">
                    <BsBoxes className='bx bx-user nav__icon-bottom' />
                    <span className="nav__name-bottom">Estoque</span>
                  </Link>
                </li>

                <Button className='float-right btn-voltar' size="sm" variant="warning" onClick={retur} style={{
                  'position': 'absolute',
                  'right': '0px',
                  'height': '100%',
                  'marginTop': '0px',
                  'borderRadius': '0px',
                  'bottom': '0px'
                }}> <TiArrowBack /></Button>

              </ul>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SideBar