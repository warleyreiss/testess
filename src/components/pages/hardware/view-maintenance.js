//IMPORTAÇÕES BIBLIOTECAS REACT
import Table from 'react-bootstrap/Table';
import { axiosApi } from '../../../services/axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { CardGroup, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';

import { AiOutlinePlusSquare } from 'react-icons/ai';
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import { BsFillPlayBtnFill, BsHandThumbsDown, BsHandThumbsUp, BsPause, BsPlay, BsStop, BsStopBtnFill } from 'react-icons/bs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HardwareMaintenance() {
  const { object } = useParams();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  const [registrosServices, setRegistrosServices] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSE DE UM USUÁRIO ESPECÍFICO
  useEffect(() => {
    axiosApi.get("/hardware/list_order_service/" + object)
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });

  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INSUMOS
  useEffect(() => {
    axiosApi.get("/hardware/list_cost_input")
      .then((response) => {
        setRegistrosServices(response.data)
      })
      .catch(function (error) {
      });

  }, [])
  useEffect(() => {

  }, [])

  //CLONAGEM LISTA servicos
  const clonagem = (id) => {
    const divpai = document.getElementById("clone" + id);
    const copiado = divpai.lastElementChild.cloneNode(true);
    divpai.appendChild(copiado);
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const handleSubmit = (id,status) => {

    const inicio_manutencao = document.getElementById('inicio' + id).value
    const termino_manutencao = new Date().toLocaleString('zh-CN').replace("/", "-").replace("/", "-")
    const observacao_manutencao = document.getElementById('observacao_manutencao' + id).value
    const cobranca =status;

    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const servicos = document.getElementsByName("hardware_list_costs_id" + id);
    let value = []
    servicos.forEach(function (servico, i) {
      value.push(servico.value)
    });
    const servico_tipo = value

    const qdadeServicos = document.getElementsByName("qdade" + id);
    let value2 = []
    qdadeServicos.forEach(function (qdadeServico, i) {
      value2.push(qdadeServico.value)
    });
    const qdade_servico_tipo = value2

    const data = { id, inicio_manutencao, termino_manutencao, observacao_manutencao, servico_tipo, qdade_servico_tipo, cobranca }; // seta todas variaveis

   axiosApi.patch('update_wardware_order_service_maintenance', data)
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
    const cardSelect= document.getElementById('cardSelect' + id).style.display='flex'
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
      <CardGroup>
        {registros.map((registro, key) => {
          return (

            <div className='card-hardware' style={{'width':'350px'}} >
              <Card className="line" id={"card" + registro.id} >
                <Card.Body>
               
                    <Card.Title >
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
                  
                  <Form id={'form' + registro.id} >
                    <Form.Control type="hidden" name="id" value={registro.id} />
                    <Form.Group className="card-hardware-form-control card-obs" >
                      <Form.Label>OBSERVAÇÕES ANTERIOR: </Form.Label>
                      <Form.Label>{registro.observacao_inspecao}</Form.Label>
                    </Form.Group>
                    <Form.Group className="card-hardware-form-control" >
                      <Form.Label>INÍCIO:</Form.Label>
                      <Form.Control className='input-time' type="datetime-local" name="inicio_manutencao" id={'inicio' + registro.id} required disabled />
                    </Form.Group>
                    <Card className='form-div card-hardware-form-control'  id={'cardSelect' + registro.id} style={{'display':'none'}}>
                      <Form.Label>ITEM RETIFICADO/QDADE.:</Form.Label>
                      <div id={'clone' + registro.id}>
                        <Row>
                          <Form.Group className="col-md-10 col-sm-10 list-clone">
                            

                            <Form.Select name={'hardware_list_costs_id' + registro.id} className={'hardware_list_costs_id' + registro.id} >
                              <option value=''>Em branco...</option>
                              {registrosServices.map((registro, key) => {
                                return (
                                  <option value={registro.tipo}>{registro.tipo}</option>
                                )
                              })}
                            </Form.Select>

                          </Form.Group>
                          <Form.Group className="col-md-2 col-sm-2 qdade-clone">

                            <Form.Control type="text" name={"qdade" + registro.id} className={'qdade' + registro.id} required />
                          </Form.Group>
                        </Row>
                      </div>
                      <Form.Group className="col-md-12 col-sm-12">
                        <Button variant="outline-success float-right btn-card-clone" onClick={e => clonagem(registro.id)}><AiOutlinePlusSquare />
                        </Button>
                      </Form.Group>
                    </Card>
                    <Form.Group className="card-hardware-form-control" >
                      <Form.Label>DESVIOS OBSERVADOS:</Form.Label>
                      <Form.Control as="textarea" name='observacao_manutencao' style={{ height: '80px' }} id={'observacao_manutencao' + registro.id} />
                    </Form.Group>
                    <Form.Group className="col-md-12 col-sm-12">

                      <Button variant="success" className='btn-hardware  float-right' size='sm'  hidden={true} onClick={e => handleSubmit(registro.id,true)}  id={'btn-finalizar' + registro.id}>
                      <BsHandThumbsUp /> Será cobrado!</Button>
                      <Button variant="danger float-right" className='btn-hardware  float-right' size='sm' hidden={true} onClick={e => handleSubmit(registro.id,false)} id={'btn-finalizar2' + registro.id}>
                      <BsHandThumbsDown /> Não será cobrado!</Button>
                      
                      <Button variant="primary float-right btn-hardware" onClick={e => start(registro.id)} id={'btn-iniciar' + registro.id}>
                        <BsPlay />
                        Iniciar
                      </Button>
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
export default HardwareMaintenance 