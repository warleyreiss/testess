//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi} from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbListSearch} from 'react-icons/tb';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
function ClientView() {

  const tableRef = useRef(null);
  
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE CLIENTES CADASTRADOS
  const [registros, setRegistros] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_client")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  return (
    <>
    
    <Navbar classNameName='' expand="lg" variant="light" bg="light" >
        <DownloadTableExcel className="nav-option" filename="client table" sheet="client" currentTableRef={tableRef.current}>
          <Button className='float-right' size="sm"> Exportar </Button>
        </DownloadTableExcel>
      </Navbar>
      
      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
        <th>ID:</th>
          <th>NOME DO CLIENTE:</th>
          <th>RESPONSÁVEL:</th>
          <th>ENDEREÇO:</th>
          <th></th>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.id}</td>
                <td>{registro.nome}</td>
                <td>{registro.responsavel}</td>
                <td>{registro.endereco}</td>
                <td>
                  <Link className='btn-secondary' to={{ pathname: `/client/form/${registro.id}` }}>
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

export default ClientView