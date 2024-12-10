//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function HistoryServiceHardware() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { fim } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  console.log(registros)

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE REGISTROS DO HISTORICO DE SERVIÇOS

  useEffect(() => {
    axiosApi.get("hardware/history/service/" + inicio + "/" + fim)
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
            <th>ID-OS:</th>
            <th>TIPO:</th>
            <th>ID:</th>
            <th>Nº SÉRIE:</th>
            <th>INÍCIO INSPEÇÃO:</th>
            <th>TÉRMINO INSPEÇÃO:</th>
            <th>INSPECIONADO POR:</th>
            <th>R$ INSPEÇÃO:</th>
            <th>INÍCIO MANUTENÇÃO</th>
            <th>TÉRMINO MANUTENÇÃO:</th> 
            <th>REPARADO POR:</th>
            <th>COBRANÇA?:</th>
            <th>R$ MANUTENÇÃO:</th>
            <th>R$ COMPONENTES</th>     
            <th>lISTA COMPONENTES</th>           
            <th>QDADE TICKETS:</th>
            <th>R$ TOTAL:</th>
            <th>STATUS OS:</th>
            <th>ÚLTIMO MANUSEIO:</th>
            <th>CLIENTE:</th>
            <th>STATUS SERVIÇO:</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td>{registro.id}</td>
                <td>{registro.tipo}</td>
                <td>{registro.identificador}</td>
                <td>{registro.numero_serie}</td>
                <td>{registro.inicio_inspecao}</td>
                <td>{registro.termino_inspecao}</td>  
                <td>{registro.usuario_id_inspecao}</td>
                <td>{registro.inspecaototal ? 'R$ '+registro.inspecaototal:'R$ 0,00'}</td>
                <td>{registro.inicio_manutencao}</td>
                <td>{registro.termino_manutencao}</td>
                <td>{registro.usuario_id_manutencao}</td>
                <td>{registro.cobranca}</td>
                <td><td>{registro.manutencaototal ? 'R$ '+registro.manutencaototal:'R$ 0,00'}</td></td>
                <td>{'R$ '+registro.componentestotal }</td>
                <td>{registro.hardware_custo_servico_desc }</td>
                <td>{registro.qdade }</td>
                <td>{'R$ '+registro.total }</td>
                <td>{registro.status_os}</td>
                <td>{registro.N}</td>
                <td>{registro.nome}</td>
                <td> <Link className='btn-secondary' to={{ pathname: `/hardware/service/show/${registro.hardware_servicosid}` }}>{registro.status_servico}</Link></td>
              </tr>
            )

          })}
        </tbody>
      </Table>
    </>
  );
}

export default  HistoryServiceHardware