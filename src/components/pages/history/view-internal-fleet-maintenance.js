//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function HistoryInternalFleetMaintenance() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTRO DO HISTORICO DE VISITAS
  useEffect(() => {
    axiosApi.get("/history/visite/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>
     <div className="d-flex flex-row-reverse bd-highlight" expand="lg" variant="light" bg="light">
        <div className="p-2">
          <DownloadTableExcel filename='lista' sheet="consolidado" currentTableRef={tableRef.current}>
            <Button className='float-right' size="sm"> Exportar </Button>
          </DownloadTableExcel>
        </div>
      </div>
      <Table striped bordered hover size="sm" responsive ref={tableRef}>
        <thead>
          <tr>
            <th>ID:</th>
            <th>TECNICO:</th>
            <th>CLIENTE:</th>
            <th>INICIO:</th>
            <th>TERMINO:</th>
            <th>TURNO:</th>
            <th>HOSPEDAGEM:</th>
            <th>ALIMENTAÇÃO:</th>
            <th>DISTÂNCIA:</th>
            <th>FROTA INTERNA:</th>
            <th>AJUSTE?:</th>
            <th>JUSTIFICATIVA:</th>

          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>{registro.id}</td>
                <td>{registro.nomeusuario}</td>
                <td>{registro.nomecliente}</td>
                <td>{registro.inicio}</td>
                <td>{registro.termino}</td>
                <td>{registro.turno}</td>
                <td>{registro.hospedagem_descricao}</td>
                <td>{registro.alimentacao_descricao}</td>
                <td>{registro.distancia}</td>
                <td>{registro.veiculo}</td>
                <td>{registro.ajuste}</td>
                <td>{registro.justificativa}</td>

              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default HistoryInternalFleetMaintenance
