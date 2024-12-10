import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
function UserView() {

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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>NOME:</th>
            <th>TIPO:</th>
            <th>CLIENTE:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.nome_usuarios}</td>
                <td>{registro.tipo}</td>
                <td>{registro.nome_clientes}</td>
                <td>
                  <Link className='btn-secondary' to={{ pathname: `/user/form/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'>Exibir</button>
                  </Link>
                </td>
              </tr>
            )

          })}
        </tbody>
      </Table>
    </>
  );
}

export default UserView