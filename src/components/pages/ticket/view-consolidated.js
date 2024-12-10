//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
  
  
import { Stack,OverlayTrigger,Form } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import { CgSoftwareDownload } from "react-icons/cg";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdManageSearch } from "react-icons/md";
import React, { useRef } from 'react';
  

function TicketViewConsolidated() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { inicio } = useParams();
  const { termino } = useParams();
  const tableRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR Q QUANTIDADE DE TICKETS EM APBERTO POR CIENTE 
  useEffect(() => {
    axiosApi.get("/list_ticket_consolidated")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [])

  const filterTable = (value) => {
    setSearchValue(value)
    const search = value.toLowerCase();
    console.log('pesquisando por... ' + search)
    const trs = [...document.querySelectorAll('#datatable tbody tr')];
    trs.forEach(el => {
      const matches = el.textContent.toLowerCase().includes(search);
      el.style.display = matches ? '' : 'none';
    });
  }
  return (
    <>
     <div className="w-head-option" expand="lg" style={{ backgroundColor: '#12192C', color: 'white' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>Tickets consolidados por cliente</span></div>
          <div className="p-2 ms-auto w-head-hstack-p2">
            <div className='d-flex flex-row-reverse'>

              <OverlayTrigger placement='bottom'
                overlay={
                  <Tooltip >
                    {'Baixe esta lista'}
                  </Tooltip>
                }
              >
                <div>
                  <DownloadTableExcel filename='lista' sheet="consolidado" currentTableRef={tableRef.current}>
                    <Button className='w-head-option-btn' size="sm"><CgSoftwareDownload /></Button>
                  </DownloadTableExcel>
                </div>
              </OverlayTrigger>
              <InputGroup className='w-head-option-btn w-head-option-search-btn-form' size='sm'>
                <Form.Control className='w-head-option-search-btn-form' placeholder="" value={searchValue} onChange={(e) => filterTable(e.target.value)} />
                <InputGroup.Text className='w-head-option-search-btn-form-text'><MdManageSearch /></InputGroup.Text>
              </InputGroup>
            </div>
          </div>
        </Stack>
      </div>
      <Table striped bordered hover size="sm" id="datatable" ref={tableRef}>
        <thead>
          <tr>
            <th>NOME DO CLIENTE:</th>
            <th>TICKETS:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key}>
                <td>{registro.nome}</td>
                <td>{registro.count}</td>
                <td>
                  <Link to={{ pathname: `/ticket/consolidated/${registro.cliente_id}` }}>
                    <button className='card-service-btn btn color-theme-background'>Ver lista</button>
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

export default TicketViewConsolidated