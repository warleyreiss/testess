//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function HistoryInternalFleetFuel() {
    //OBTENDO VARIAVEIS PARASSADAS VIA URL
    const { id } = useParams();


  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { fim } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTRO DO HISTORICO DE VISITAS
  useEffect(() => {
    if (id){
      axiosApi.get("/history/fuel/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
    }else{
      axiosApi.get("/history/fuel/" + inicio + "/" + fim)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
    }
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
            <th>FROTA:</th>
            <th>LANÇADO POR:</th>
            <th>QUIL. ANTERIOR:</th>
            <th>QUIL. ATUAL:</th>
            <th>QDADE.:</th>
            <th>PREÇO:</th>
            <th>COMBUSTIVEL:</th>
            <th>MÉDIA KM/L:</th>
            <th>DATA:</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>{registro.frota}</td>
                <td>{registro.nomeusuario}</td>
                <td>{registro.kmAnterior}</td>
                <td>{registro.kmAtual}</td>
                <td>{registro.quantidade}</td>
                <td>{registro.valor}</td>
                <td>{registro.tipoCombustivel}</td>
                <td>{(registro.kmAtual - registro.kmAnterior)/registro.quantidade}</td>
                <td>{registro.data_registro}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default HistoryInternalFleetFuel