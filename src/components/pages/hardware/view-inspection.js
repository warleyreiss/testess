//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { CardGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import { BsFillPlayBtnFill, BsHandThumbsDown, BsHandThumbsUp, BsPause, BsPlay, BsStop, BsStopBtnFill } from 'react-icons/bs';
import { TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdManageSearch } from "react-icons/md";
import { CgSoftwareDownload} from "react-icons/cg";

function HardwareInspection() {
  const { object } = useParams();


  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [formId, setFormId] = useState('');
  const [hiddenStartAll, setHiddenStartAll] = useState(false);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DE UM USUÁRIO ESPECÍFICO
  useEffect(() => {
    axiosApi.get("/hardware/list_order_service/" + object)
      .then((response) => {
        setRegistros(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
      });

  }, [])


  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const handleSubmit = (id,result) => {

    const inicio_inspecao = document.getElementById('inicio' + id).value
    const termino_inspecao = new Date().toLocaleString('zh-CN').replace("/", "-").replace("/", "-")
    const observacao_inspecao = document.getElementById('observacao_inspecao' + id).value
    const switch_inspecao = result
    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const perifericos = document.getElementsByName("periferico_id");
    let value = []
    perifericos.forEach(function (periferico, i) {
      value.push(periferico.value)
    });
    const periferico_id = value

    const qdadePerifericos = document.getElementsByName("qdade_periferico_id");
    let value2 = []
    qdadePerifericos.forEach(function (qdadePeriferico, i) {
      value2.push(qdadePeriferico.value)
    });
    const qdade_periferico_id = value2


    const data = { id, inicio_inspecao, termino_inspecao, observacao_inspecao,switch_inspecao }; // seta todas variaveis
    console.log(data)
 axiosApi.patch('/update_wardware_order_service_inspecao', data)
      .then(function (response) {
        toast(response.data.msg)
        const card = document.getElementById('card' + id).style.display = "none";
      })
      .catch(function (error) {
      });
  }

  const start = (id) => {
    const imput = document.getElementById('inicio' + id).value = new Date().toLocaleString('sv-SE').replace("/", "-").replace("/", "-")
    const btn = document.getElementById('btn-finalizar' + id).hidden = false;
    const btn2 = document.getElementById('btn-finalizar2' + id).hidden = false;
    const btn3 = document.getElementById('btn-iniciar' + id).hidden = true;
  }
  const allStart = (id) => {
    const imputs = document.querySelectorAll(".input-time");
    const btns = document.querySelectorAll(".btn-inicio");
    const btns2 = document.querySelectorAll(".btn-termino");
    const now = new Date().toLocaleString('sv-SE').replace("/", "-").replace("/", "-")
    let qdade = 0;

    imputs.forEach(function (q) {
      if( !q.value ){
        let imput = q.value = now
      }
     
    });
    btns.forEach(function (q) {
      let btn = q.hidden = true;
    });
    btns2.forEach(function (q) {
      let btn = q.hidden = false;
    });
    setHiddenStartAll(true)
  }
  return (
    <>
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
      <div className="d-flex flex-row-reverse bd-highlight" expand="lg" variant="light" bg="light">
        <div className="p-2">

          <Button className='float-right' size="sm" onClick={e => allStart()} disabled={hiddenStartAll}> <TbPlayerSkipForwardFilled /> Iniciar todos</Button>
        </div>

      </div>
      <CardGroup>
        {registros.map((registro, key) => {
          return (

            <div className='card-hardware' >
              <Card className="line" id={"card" + registro.id} >
                <Card.Body>

                  <Card.Title>
                    <div className='title-card-hardware'>{"NÚMERO SÉRIE: " + registro.numero_serie}</div>
                  </Card.Title>

                  <Card.Text className='card-text'>
                    <div className='row' style={{ 'padding': '5px' }}>
                      <Form.Label>{registro.tipo}</Form.Label>
                    </div>
                  </Card.Text>
                  <Card.Text className='card-text'>
                    <div className='row' style={{ 'padding': '5px' }}>

                      <Form.Label>{'ID Nº: ' + registro.identificador}</Form.Label>
                    </div>
                  </Card.Text>

                  <Form >
                    <Form.Control type="hidden" name="id" value={registro.id} />
                    <Form.Group className="card-hardware-form-control" >
                      <Form.Label>INÍCIO:</Form.Label>
                      <Form.Control className='input-time' type="datetime-local" name="inicio_inspecao" id={'inicio' + registro.id} required disabled />
                    </Form.Group>

                    <Form.Group className="card-hardware-form-control" >
                      <Form.Label>DESVIOS OBSERVADOS:</Form.Label>
                      <Form.Control as="textarea" name='observacao_inspecao' style={{ height: '80px' }} id={'observacao_inspecao' + registro.id} />
                    </Form.Group>
                    <Form.Group className="col-md-12 col-sm-12">
                      <Button variant="success" className='btn-hardware  float-right' size='sm'  hidden={true} onClick={e => handleSubmit(registro.id,true)}  id={'btn-finalizar' + registro.id}>
                      <BsHandThumbsUp /> Tudo certo!</Button>
                      <Button variant="danger float-right" className='btn-hardware  float-right' size='sm' hidden={true} onClick={e => handleSubmit(registro.id,false)} id={'btn-finalizar2' + registro.id}>
                      <BsHandThumbsDown /> Precisa de manutenção!</Button>
                      <Button variant="primary float-right" className='btn-hardware  float-right' size='sm'  onClick={e => start(registro.id)} id={'btn-iniciar' + registro.id}>
                        <BsPlay /> Iniciar</Button>
                    </Form.Group>
                  </Form >
                </Card.Body>
              </Card>
            </div>


          )
        })}
      </CardGroup>

    </>
  );
}
export default HardwareInspection