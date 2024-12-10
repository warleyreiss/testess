//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPlayBtnFill, BsHandThumbsDown, BsHandThumbsUp, BsPause, BsPlay, BsStop, BsStopBtnFill } from 'react-icons/bs';
import { InputGroup, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { FaRegEye } from "react-icons/fa";
import { IoFootstepsOutline } from "react-icons/io5";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import { MdManageSearch } from "react-icons/md";
import { CgSoftwareDownload } from "react-icons/cg";

function TicketAcceptReturn() {

  const tableRef = useRef(null);

  // CRIANDO INSTANCIA DO REACT CONTEXT
  const { userSetor } = useContext(AuthContext);
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONAMENTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [urlForm, setUrlForm] = useState([]);


  const [searchValue, setSearchValue] = useState('');
  const handleAccept = () => {
    setUrlForm('/ticket_reaccept')
  }
  const handleRefuse = () =>{ 
    setUrlForm('/refuse_ticket')
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TICKETS PARA APROVAÇÃO
  useEffect(() => {
    axiosApi.get("/list_ticket_return")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //FUNÇÃO PARA SELEÇÃO DE TODOS OS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
  const selectAll = () => {
    const btn = document.getElementById('check-all');

    if (btn.checked) {
      const checkBoxes = document.querySelectorAll(".input-select");
      checkBoxes.forEach(function (q) {
        q.checked = true;
      });
    }
    if (!btn.checked) {
      const checkBoxes = document.querySelectorAll(".input-select");
      checkBoxes.forEach(function (q) {
        q.checked = false;
      });
    }
    select()
  }
  //FUNÇÃO PARA SELEÇÃO DOS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
  const select = () => {

    const checkBoxes = document.querySelectorAll(".input-select");
    let qdadecheck = 0;

    checkBoxes.forEach(function (q) {

      if (q.checked) {
        qdadecheck++;
      }
      let label = document.getElementById('total-check').innerHTML = qdadecheck + " item(s)"
      if (qdadecheck > 0) {
        let form = document.getElementById('form-trasnfer').hidden = false;
      } else {
        let form = document.getElementById('form-trasnfer').hidden = true;
      }
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
  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM

  const form = (formContent) => {
  
    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        formContent.faturamento_id.push(checkBox.id)
      }
    });
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    
    axiosApi.post(urlForm, formContent)

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
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>Tickets retornados</span></div>
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
            <th>
              <label className="control control--checkbox">
                <input type="checkbox" className="js-check-all" id="check-all" onClick={e => selectAll()} />
                <div className="control__indicator"></div>
              </label>
            </th>
            <th>ID:</th>
            <th>CLIENTE</th>
            <th>TIPO:</th>
            <th>DESCRIÇÃO:</th>
            <th>SETOR</th>
            <th>DATA/HORA:</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {registros

            .map((registro, key) => {
              if (registro.setor == userSetor) {
                return (
                  <tr key={key} className='clickable'>
                    <td>
                      <label className="control control-checkbox">
                        <input className="input-select" id={registro.id} type="checkbox" onClick={e => select()} />
                        <div className="control-indicator"></div>
                      </label>
                    </td>
                    <td><strong>{registro.id}</strong></td>
                    <td>{registro.nome_cliente}</td>
                    <td>{registro.tipo}</td>
                    <td>{registro.descricao}</td>
                    <td>{registro.setor}</td>
                    <td>{registro.data_registro}</td>
                    <td>
                      <Link to={{ pathname: `/ticket/show/${registro.id}` }}>
                        <button className='card-service-btn btn color-theme-background'><FaRegEye /></button>
                      </Link>
                      <Link to={{ pathname: `/ticket/tracking/${registro.id}` }}>
                        <button className='card-service-btn btn color-theme-background'  size='sm'><IoFootstepsOutline /></button>
                      </Link>
                      <Link to={{ pathname: `/ticket/cancel/${registro.id}` }}>
                        <button className='card-service-btn btn color-theme-background'><RiDeleteBin5Line /></button>
                      </Link>
                      <Link to={{ pathname: `/ticket/reaccept/${registro.id}` }}>
                        <button className='card-service-btn btn color-theme-background'><BsHandThumbsUp /></button>
                      </Link>

                    </td>
                  </tr>
                )
              }

            })}
        </tbody>
      </Table>
      <Navbar id="form-trasnfer" className='nav-form' expand="lg" variant="light" bg="light" fixed="bottom" hidden>
        <Container className='container-botton'>
          <Form onSubmit={handleSubmit(form)}>
            <Form.Group className="col-md-0 col-sm-0" hidden>
              <Form.Select name="faturamento_id[]" id="Select-tickets" multiple   {...register("faturamento_id[]")}>
                {/*o preenchimento desse input sera atráves da selecao dos registro em grid pelo usuario*/}
              </Form.Select>
            </Form.Group>
            <Row>
              <Form.Group className="col-md-4 col-sm-12 label-botton" >
                <Form.Label id="total-check" className=''></Form.Label>
              </Form.Group>
              <Form.Group className="col-md-3 col-sm-3 label-button">
              <Button variant="success" className='btn-hardware  float-right' size='sm' type="submit" onClick={handleAccept}>
                  <BsHandThumbsUp /> Aprovar!</Button>
              </Form.Group>
              <Form.Group className="col-md-5 col-sm-3 label-button">  
               <Button variant="danger float-right" className='btn-hardware  float-right' size='sm' type="submit" onClick={handleRefuse}>
                  <BsHandThumbsDown /> Cancelar!</Button>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  )

}

export default TicketAcceptReturn