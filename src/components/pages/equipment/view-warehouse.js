//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
function EquipmentWarehouse() {

  const tableRef = useRef(null);

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DE UM CLIENTE ESPECIFICO
  useEffect(() => {
    axiosApi.get("/list_equipment_warehouse/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  return (
    <>
      <Navbar classNameName='' expand="lg" variant="light" bg="light" >
        <DownloadTableExcel className="nav-option" filename="equipment_warehouse table" sheet="equipment_warehouse" currentTableRef={tableRef.current}>
          <Button className='float-right'> Exportar </Button>
        </DownloadTableExcel>
      </Navbar>
      <Table striped bordered hover size="sm" ref={tableRef}>
        <thead>
          <th>ID:</th>
          <th>TIPO:</th>
          <th>EM PORTE:</th>
          <th>STATUS:</th>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.identificador}</td>
                <td>{registro.tipo}</td>
                <td>{registro.nome}</td>
                <td>{registro.status_descricao}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default EquipmentWarehouse