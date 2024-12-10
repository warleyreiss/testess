import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './styles.css';
function PerfilUser() {

  //CONSUMO DE API COM A BIBLIOTECA AXIOS
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_user")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });

  }, [])
  return (
    <>
      <div className="card-container">
        <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
        <h3>Ricky Park</h3>
        <h6>New York</h6>
        <p>User interface designer and <br /> front-end developer</p>
        <div className="buttons">
          <button className="primary">
            Message
          </button>
          <button className="primary ghost">
            Following
          </button>
        </div>
        <div className="skills">
          <h6>Skills</h6>
          <ul>
            <li>UI / UX</li>
            <li>Front End Development</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node</li>
          </ul>
        </div>
      </div>

      

    </>
  );
}

export default PerfilUser