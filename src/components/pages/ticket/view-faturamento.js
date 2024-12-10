//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Stack, OverlayTrigger, Form, Navbar, Container, Row } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import { CgSoftwareDownload } from "react-icons/cg";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdManageSearch } from "react-icons/md";
import React, { useRef } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';

import { RiDeleteBin5Line } from "react-icons/ri";//delete
import { FaRegEye } from "react-icons/fa";//view
import { IoFootstepsOutline } from "react-icons/io5";//tranking
import { IoArrowUndoSharp } from "react-icons/io5";//return
import { IoDocumentTextOutline } from "react-icons/io5";//extract
import { IoCheckmarkDone } from "react-icons/io5";//finalizar 
import { MdOutlineEditCalendar } from "react-icons/md";//editar data

function TicketFaturamento() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONAMENTO
  const navigate = useNavigate()
  const tableRef = useRef(null);
  const getURL = (e) => {
    axiosApi.patch(e)
      .then(function (response) {
      })
      .catch(function (error) {
      });
  }

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([])
  const [idSlected, setIdSlected] = useState('')
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE FATURAMENTO EM AERTO
  useEffect(() => {
    axiosApi.get("/list_ticket_open")
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO PARA CONFIMAR
  const handleSubmitConfirm = (id) => {
    const data = { id }; // seta todas variaveis
    axiosApi.patch('/ticket_confirm', data)
      .then(function (response) {
        navigate(0)
      })
      .catch(function (error) {
      });
  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO PARA CANCELAR
  const handleSubmitCancel = (id) => {
    const data = { id }; // seta todas variaveis
    axiosApi.patch('/ticket_cancel', data)
      .then(function (response) {
        navigate(0)
      })
      .catch(function (error) {
      });
  }

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
  const editDate = (value) => {
    setIdSlected(value)
    console.log('id é' + idSlected)
    setShow(true)

  }

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
formContent.id=idSlected
    console.log(formContent)
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO

    axiosApi.patch('/edite_ticket', formContent)
      .then(function (response) {
        navigate(0)
      })
      .catch(function (error) {
      });

  }
  return (
    <>
      <div className="w-head-option" expand="lg" style={{ backgroundColor: '#12192C', color: 'white' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>Faturamentos gerados</span></div>
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
            <th>Nº FATURA:</th>
            <th>TICKETS:</th>
            <th>CLIENTE:</th>
            <th>VENCIMENTO:</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, key) => {
            return (
              <tr key={key} className='clickable'>
                <td >{registro.id}</td>
                <td>{
                  Object.keys(registro.faturamento_id).length
                  /*registro.faturamento_id.map((item, key) => {
                    return (
                      <Link className='btn-secondary' to={{ pathname: `/ticket/show/${item}` }}> <Button variant="secondary" size="sm">{item}</Button></Link>
                    )
                  })*/
                }
                </td>
                <td>{registro.nome}</td>

                <td>{registro.vencimento} </td>

                <td>
                  <Link className='btn-secondary' to={{ pathname: `/ticket/extract/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'><IoDocumentTextOutline /></button>
                  </Link>
                  <Link className='btn-secondary'>
                    <button className='card-service-btn btn color-theme-background' onClick={e => handleSubmitConfirm(registro.id)}><IoCheckmarkDone /></button>

                  </Link>
                  <button className='card-service-btn btn color-theme-background' onClick={e => editDate(registro.id)} ><MdOutlineEditCalendar /></button>

                  <Link className='btn-secondary' to={{ pathname: `/ticket/extract/cancel/${registro.id}` }}>
                    <button className='card-service-btn btn color-theme-background'><RiDeleteBin5Line /></button>
                  </Link>
                </td>
              </tr>
            )

          })}
        </tbody>
      </Table>
      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Alterar data faturamento</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit(form)}>
            <Form.Control  value={idSlected} required {...register("id")}  hidden/>
            <Row>
              <Form.Group className="col-md-12 col-sm-12" >
                <Form.Label>NOVA DATA:</Form.Label>
                <Form.Control type="date" required {...register("data")} />
              </Form.Group>
            </Row>
            <Row style={{marginTop:'30px'}}>
              <Form.Group className="col-md-12 col-sm-12">
                <Button variant="primary float-right" type="submit">
                  Salvar
                </Button>
              </Form.Group>
            </Row>

          </Form>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}
export default TicketFaturamento