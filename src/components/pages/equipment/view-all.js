//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import { TbListSearch } from 'react-icons/tb';
import { RiHistoryFill } from 'react-icons/ri'
import { Button } from 'bootstrap';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { MdManageSearch } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CgSoftwareDownload } from "react-icons/cg";
import { IoFootstepsOutline } from "react-icons/io5";
function EquipmentAll() {

  const tableRef = useRef(null);

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchSN, setSearchSN] = useState('');

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS EQUIPAMENTOS DA APLICAÇÃO 
  useEffect(() => {
    axiosApi.get("/list_equipment_all")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  return (
    <>
     <div className="w-head-option" expand="lg" style={{ backgroundColor: '#12192C', color: 'white' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>TODOS EQUIPAMENTOS</span></div>
          <div className="p-2 ms-auto w-head-hstack-p2 h">
            <div className='d-flex flex-row-reverse'>

           
               
               
              <InputGroup className='w-head-option-btn w-head-option-search-btn-form' size='sm'>
                <Form.Control className='w-head-option-search-btn-form' placeholder="Por tipo ..." value={searchType} onChange={(e) => setSearchType(e.target.value)} />
                <Form.Control className='w-head-option-search-btn-form' placeholder="Por ID ..." value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                <Form.Control className='w-head-option-search-btn-form' placeholder="Por número de série ..." value={searchSN} onChange={(e) => setSearchSN(e.target.value)} />
                <InputGroup.Text className='w-head-option-search-btn-form-text'><MdManageSearch /></InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </Stack>
      </div>
      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
          <th>ID:</th>
          <th>NÚMERO SÉRIE:</th>
          <th>TIPO:</th>
          <th>EM PORTE:</th>
          <th>LOCAL/CLIENTE:</th>
          <th>STATUS:</th>
          <th>OPÇÕES:</th>
        </thead>
        <tbody>
          {registros
           .filter((item => item.tipo.toLowerCase().includes(searchType.toLowerCase())))
           .filter((item => item.numero_serie.toLowerCase().includes(searchSN.toLowerCase())))
           .filter((item => item.identificador.toString().toLowerCase().includes(searchId.toString().toLowerCase()))) .map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.identificador}</td>
                <td>{registro.numero_serie}</td>
                <td>{registro.tipo}</td>
                <td>{registro.nome_usuario}</td>
                <td>{registro.nome_cliente}</td>
                <td>{registro.status_descricao}</td>
                <td className='colunm-option'>

                  <Link className="card-service-btn" variant="outline-primary" to={{ pathname: `/equipment/form/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'><MdEditNote /></button>
                  </Link>

                  <Link className='btn-secondary' to={{ pathname: `/equipment/tracking/${registro.numero_serie}` }}>
                    <button className='card-service-btn btn color-theme-background'><IoFootstepsOutline /></button>
                  </Link>
                  <Link className='btn-secondary' to={{ pathname: `/equipment/form-delete/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'><MdOutlineDeleteSweep /></button>
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

export default EquipmentAll