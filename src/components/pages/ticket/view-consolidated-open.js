//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { OverlayTrigger, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineExclamationCircle, AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import {  Stack} from 'react-bootstrap'
import { IoArrowUndoCircleOutline, IoArrowUndoSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPlayBtnFill, BsHandThumbsDown, BsHandThumbsUp, BsPause, BsPlay, BsStop, BsStopBtnFill } from 'react-icons/bs';
import { AiOutlineDelete } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { TbEyeEdit } from "react-icons/tb";
import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from 'react-bootstrap/Tooltip';

import { FaRegEye } from "react-icons/fa";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdManageSearch } from "react-icons/md";
import { CgSoftwareDownload } from "react-icons/cg";

function TicketConsolidatedOpen() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  const tableRef = useRef(null);

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONAMENTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();


  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [urlForm, setUrlForm] = useState([]);
  const [motivo, setMotivo] = useState([]);
  const [vecimento, setvencimento] = useState([]);
  const [motivoRequired, setMotivoRequired] = useState(false);
  
  const [searchValue, setSearchValue] = useState('');
  const handleAccept = () => {
    setUrlForm('/create_ticket')
    setMotivoRequired(false)
  }
  const handleRefuse = () => {
    setUrlForm('/refuse_ticket_2')
    setMotivoRequired(true)
  }
  const handleReturn = () => {
    setUrlForm('/return_ticket_2')
    setMotivoRequired(true)
  }
  const retur = () => {
    navigate(-1)
  };

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
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TICKETS ABERTO PARA O CLIENTE SELECIONADOS
  useEffect(() => {
    axiosApi.get("/ticket/consolidated/" + id)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
  
    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const checkBoxes = document.querySelectorAll(".input-select");
    checkBoxes.forEach(function (checkBox, i) {
      if (checkBox.checked) {
        formContent.faturamento_id.push(checkBox.id)
      }
    });
    formContent.justificativa = motivo
    formContent.vencimento=vecimento
    console.log(formContent)
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    
    axiosApi.post(urlForm, formContent)

      .then(function (response) {
      navigate(-1)
      })
      .catch(function (error) {
      });
  
  }



  //FUNÇÃO PARA SELEÇÃO DOS IMPUTS TIPO SELECTS DA TABELA E PREENCHIEMNTO DO FORMULARIO COM OS VALORES
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
  //FUNÇÃO PARA ALTERNAR OS COMPOS DO FORMULÁRIO CONFORME PREENCHIMENTOS
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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Já houve retorno deste ticket!
    </Tooltip>
  );
  return (
    <>
        <div className="w-head-option" expand="lg" style={{ backgroundColor: '#12192C', color: 'white' }} >
        <Stack className='w-head-hstack' direction="horizontal" gap={2}>
          <div className="p-2 w-head-hstack-p2"><span className='w-head-option-title'>Tickets</span></div>
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
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark" />
      <Container>

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
              <th>TIPO:</th>
            <th>DESCRIÇÃO:</th>
              <th>SETOR:</th>
              {/*<th>ORIGEM: </th>*/}
              <th>UNID.:</th>
              <th>QD.:</th>
              <th>VALOR:</th>
              {/*<th>DATA LIBERAÇÃO:</th>*/}
              <th>OBSERVAÇÕES:</th>
              <th>OPÇÕES:</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, key) => {
              let hiddeIcon = (registro.retorno == "true");
              return (
                <tr key={key} className='clickable'>
                  <td>
                    <label className="control control-checkbox">
                      <input className="input-select" id={registro.id} type="checkbox" onClick={e => select()} />
                      <div className="control-indicator"></div>
                    </label>
                  </td>
                  <td>{registro.id}</td>
                  <td>{registro.tipo}</td>
                  <td>{registro.descricao}</td>
                  <td>{registro.setor}</td>
                  <td>{registro.unidade}</td>
                  <td>{registro.quantidade}</td>
                  <td>{'R$ ' + registro.valor}</td>
                  <td>{registro.data_liberacao}</td>
                  <td>
                    <Link to={{ pathname: `/ticket/show/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'><FaRegEye /></button>
                    </Link>
                    <Link to={{ pathname: `/ticket/tracking/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'><IoFootstepsOutline /></button>
                    </Link>
                    <Link to={{ pathname: `/ticket/return/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'><IoArrowUndoSharp /></button>
                    </Link>
                    <Link to={{ pathname: `/ticket/cancel/${registro.id}` }}>
                      <button className='card-service-btn btn color-theme-background'><RiDeleteBin5Line />  </button>
                    </Link>
                    <button className=' btn'>
                      <span hidden={!hiddeIcon}>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <Button variant="outline-warning" size="sm"> <AiOutlineExclamationCircle /> </Button>
                        </OverlayTrigger>
                      </span>
                    </button>
                  </td>
                </tr>
              )

            })}
          </tbody>
        </Table>
        <Navbar id="form-trasnfer" className='nav-form' expand="lg" variant="light" bg="light" fixed="bottom" hidden>
          <Container className='container-botton'>
            <Form onSubmit={handleSubmit(form)}>
              <Form.Control name="cliente_id" value={id} required {...register("cliente_id")} hidden />
              <Form.Group className="col-md-0 col-sm-0" hidden>
                <Form.Select name="faturamento_id[]" id="Select-tickets" multiple  {...register("faturamento_id[]")}>
                  {/*o preenchimento desse input sera atráves da selecao dos registro em grid pelo usuario*/}
                </Form.Select>
              </Form.Group>
              <Row>
              <Form.Group className="col-md-2 col-sm-2 label-botton" >
                  <Form.Label id="total-check" className=''></Form.Label>
                </Form.Group>
              
                <Form.Group className="col-md-3 col-sm-3label-button">
                <InputGroup>
                    <Form.Control
                      type='date'
                      onChange={(e) => setvencimento(e.target.value)}
                      required={!motivoRequired}
                    />

                    <Button variant="primary" type="submit" onClick={handleAccept}>
                    <AiOutlinePlus />
                    faturamento
                  </Button>
     
                  </InputGroup>

                </Form.Group>
                <Form.Group className="col-md-6 col-sm-6 label-button">

                  <InputGroup>
                    <Form.Control
                      placeholder="motivo cancelamento"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setMotivo(e.target.value)}
                      required={motivoRequired}
                    />
                   
                    <Button variant="warning" id="button-addon2" type='submit' onClick={(e) => handleReturn()}>
                    <IoArrowUndoSharp /> Retornar
                    </Button>
                    <Button variant="danger " id="button-addon2" type='submit' onClick={(e) => handleRefuse()}>
                      <AiOutlineDelete /> Excluir 
                    </Button>
                  </InputGroup>
                </Form.Group>

              </Row>
            </Form>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}

export default TicketConsolidatedOpen