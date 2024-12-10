import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';

import { ToastContainer, toast } from 'react-toastify';
function HardwareListView() {

  //CONSUMO DE API COM A BIBLIOTECA AXIOS
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    axiosApi.get("/hardeware/list_service")
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });

  }, [])
  return (
    <>
    <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark" />
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th>SOLICITAÇÃO Nº:</th>
            <th>CLIENTE:</th>
            <th>OS PENDENTE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                 <td>{registro.hardware_servicos_id}</td>
                <td>{registro.nome}</td>
                <td>{registro.count}</td>
                <td>
                  <Link className='btn-secondary' to={{ pathname: `/hardware/service/show/${registro.hardware_servicos_id}` }}>
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

export default HardwareListView