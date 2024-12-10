//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function HistoryTicket() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { fim } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTRO DO HISTÓRICO DE TICKETS
  useEffect(() => {
    axiosApi.get("/history/ticket/" + inicio + "/" + fim)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>
      <Navbar classNameName='' expand="lg" variant="light" bg="light" >
        <DownloadTableExcel className="nav-option" filename="history_ticket" sheet="history_ticket" currentTableRef={tableRef.current}>
          <Button className='float-right'> Exportar </Button>
        </DownloadTableExcel>
      </Navbar>
      <Table striped bordered hover size="sm" responsive ref={tableRef}>
        <thead>
          <tr>
            <th>ID:</th>
            <th>TIPO:</th>
            <th>DESCRIÇÃO:</th>
            <th>SETOR:</th>
            <th>UNID.:</th>
            <th>QUANTIDADE:</th>
            <th>VALOR</th>
            <th>OBSERVAÇÕES:</th>
            <th>CLIENTES:</th>
            <th>DATA REGISTRO:</th>
            <th>DATA LIBERAÇÃO:</th>
            <th>DATA FATURAMENTO:</th>
            <th>STATUS:</th>
            <th>OPÇÕES:</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>{registro.id}</td>
                <td>{registro.tipo}</td>
                <td>{registro.descricao}</td>
                <td>{registro.setor}</td>
                <td>{registro.unidade}</td>
                <td>{registro.quantidade}</td>
                <td>{'R$ ' + registro.valor}</td>
                <td>{registro.observacao}</td>
                <td>{registro.nome}</td>
                <td>{registro.data_registro}</td>
                <td>{registro.data_liberacao}</td>
                <td>{registro.data_faturamento}</td>
                <td>{registro.status_descricao}</td>
                <td>
                  <Link className='link-table' to={{ pathname: `/ticket/show/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'>Exibir</button>
                  </Link>
                  <Link className='link-table' to={{ pathname: `/ticket/tracking/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'>Rastrear</button>
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

export default HistoryTicket