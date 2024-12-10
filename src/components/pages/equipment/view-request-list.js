//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
import { RiHistoryFill } from 'react-icons/ri'
import { Button } from 'bootstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';

function RequestList() {

  const tableRef = useRef(null);

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS DA APLICAÇÃO 
  useEffect(() => {
    axiosApi.get("/list_request")
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>
     
      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
          <th>CHAMADO:</th>
          <th>USUÁRIO:</th>
          <th>CLIENTE:</th>
          <th>DATA:</th>
          <th>OPÇÕES:</th>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.chamado}</td>
                <td>{registro.nomeusuario}</td>
                <td>{registro.nomecliente}</td>
                <td>{registro.data}</td>
                <td className='colunm-option'>
                  <Link className="card-service-btn" variant="outline-primary" to={{ pathname: `/equipment/request-show/${registro.id}` }}>
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

export default RequestList