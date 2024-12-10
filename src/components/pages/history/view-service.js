//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function HistoryService() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { fim } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTROS DO HISTORICO DE SERVIÇOS

  useEffect(() => {
    axiosApi.get("/history/service/" + inicio + "/" + fim)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>
      <Navbar classNameName='' expand="lg" variant="light" bg="light" >
        <DownloadTableExcel className="nav-option" filename="history_service table" sheet="history_service" currentTableRef={tableRef.current}>
          <Button className='float-right'> Exportar </Button>
        </DownloadTableExcel>
      </Navbar>
      <Table striped bordered hover size="sm" responsive ref={tableRef}>
        <thead>
          <tr>
            <th>ID-OS:</th>
            <th>TIPO:</th>
            <th>PRODUTO:</th>
            <th>PLACA:</th>
            <th>CLIENTE:</th>
            <th>DURAÇÃO:</th>
            <th>ATENDIMENTO?:</th>
            <th>MOTIVO NÃO ATENDIMENTO:</th>
            <th>EQUIPAMENTOS USADOS:</th>
            <th>EQUIPAMENTOS REMOVIDOS:</th>
            <th>PERIFERICOS USADOS:</th>
            <th>EFEITO DA FALHA:</th>
            <th>CAUSA DA FALHA:</th>
            {/*<th>DETECÇÃO DA FALHA:</th>*/}
            <th>RESPONSÁVEL PELA FALHA:</th>
            <th>SOLUÇÕES:</th>
            <th>VIOLAÇÃO:</th>
            <th>DESC VIOLAÇÃO:</th>
            <th>DANOS:</th>
            <th>TECNICO:</th>
            <th>STATUS:</th>
            <th>DATA CRIAÇÃO OS:</th>
            <th>CHAMADO:</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>{registro.id}</td>
                <td>{registro.tipo}</td>
                <td>{registro.produto}</td>
                <td>{registro.placa + "/ " + registro.frota}</td>
                <td>{registro.nomecliente}</td>
                <td>{registro.duracao}</td>
                <td>{registro.atendimento}</td>
                <td>{registro.motivo_nao_atendimento}</td>
                <td>{registro.material_usado}</td>
                <td>{registro.material_retirado}</td>
                <td>{registro.periferico}</td>
                <td>{registro.efeito_falha}</td>
                <td>{registro.causa_falha}</td>
                <td>{registro.responsavel_falha}</td>
                <td>{registro.solucao}</td>
                <td>{registro.violacao}</td>
                <td>{registro.descricao_violacao}</td>
                <td>{registro.danos}</td>
                <td>{registro.nomeusuario}</td>
                <td>{registro.status_descricao}</td>
                <td>{registro.data_registro}</td>
                <td>{registro.chamado}</td>
              </tr>
            )

          })}
        </tbody>
      </Table>
    </>
  );
}

export default HistoryService