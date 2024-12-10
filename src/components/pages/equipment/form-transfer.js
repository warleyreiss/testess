//IMPORTAÇÕES BIBLIOTECAS REACT


//   "react-qr-code": "^2.0.12",
//"react-qr-reader": "^3.0.0-beta-1",

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios.js';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlusSquare } from 'react-icons/ai';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Row } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
function EquipmentTransfer(props) {


  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const animatedComponents = makeAnimated();
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA

  const [registroUsers, setRegistroUsers] = useState([]);
  const [registroEquipments, setRegistroEquipments] = useState([]);
  const [selectEquipments, setSelectEquipments] = useState([]);
  const [registrosPeripherals, setRegistrosPeripherals] = useState([]);
  const [custo_correios, setCusto_correios] = useState([]);
  const [chamado, setChamado] = useState([]);
  const [situacao, setSituacao] = useState([]);
  const [custo_motoboy, setCusto_motoboy] = useState([]);
  const [custo_extras, setCusto_extras] = useState([]);
  const [selectUsuario, setSelectUsuario] = useState([]);
  const clonagem = () => {
    const divpai = document.getElementById("clone");
    const copiado = divpai.lastElementChild.cloneNode(true);
    divpai.appendChild(copiado);
  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    formContent.equipamento_id_multi_select = selectEquipments

    // FUNÇÃO PARA FORÇAR A O INPUT DA BIBLIOTECA REACT-HOOK-FORM
    const perifericos = document.getElementsByName("periferico_id");
    let value = []
    perifericos.forEach(function (periferico, i) {
      value.push(periferico.value)
    });
    formContent.periferico_id = value

    const qdadePerifericos = document.getElementsByName("qdade_periferico_id");
    let value2 = []
    qdadePerifericos.forEach(function (qdadePeriferico, i) {
      value2.push(qdadePeriferico.value)
    });
    formContent.qdade_periferico_id = value2

    console.log(formContent)
    axiosApi.post('/transfer_equipment_request', formContent)
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
      });

  }
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE TODOS USUARIOS DA APLICAÇÃO
  useEffect(() => {
    axiosApi.get("/list_user_all_input")
      .then((response) => {
        setRegistroUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_equipment_me")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE INSUMOS
  useEffect(() => {
    axiosApi.get("/list_peripheral_input")
      .then((response) => {
        setRegistrosPeripherals(response.data)
      })
      .catch(function (error) {
      });

  }, [])

  const [scanResult, setScanResult] = useState('No result');
  const [data, setData] = useState('No result');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Card className='form-div'>
          <Row>
            <Form.Group className="col-md-6 col-sm-6">
              <Form.Label>NÚMERO CHAMADO:</Form.Label>
              <Form.Control type="text" name="chamado" onClick={e => setChamado(e.target.value)} required {...register("chamado")} />
            </Form.Group>
            <Form.Group className="col-md-6 col-sm-6">
              <Form.Label>SITUAÇÃO:</Form.Label>
              <Form.Select name="situacao" onClick={e => setSituacao(e.target.value)} required {...register("situacao")}>
                <option value="NOVA INSTALACAO">NOVA INSTALAÇÃO</option>
                <option value="POC">POC- PROVA OPERACIONAL DE CONCEITO</option>
                <option value="MANUTENCAO">MANUTENÇÃO</option>
                <option value="PEDIDO DE COMPRA">PEDIDO DE COMPRA</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group className="col-md-12 col-sm-12" >
            <Form.Label>DESTINATÁRIO:</Form.Label>
            <Form.Select name="usuario_id" id="selectUsuario" onClick={e => setSelectUsuario(e.target.value)} required {...register("usuario_id")}>
              <option value="">...</option>
              {registroUsers.map((registro, key) => {
                return (
                  <option value={registro.id}>{registro.nome_cliente.toUpperCase() + "-" + registro.nome_usuario.toUpperCase()}</option>
                )

              })}
            </Form.Select>
          </Form.Group>
          <Row>
            <Form.Group className="col-md-4 col-sm-12">
              <Form.Label>CUSTO CORREIOS:</Form.Label>
              <Form.Control type="text" required {...register("custo_correios")} />
            </Form.Group>
            <Form.Group className="col-md-4 col-sm-12">
              <Form.Label>CUSTO MOTOBOY:</Form.Label>
              <Form.Control type="text" required {...register("custo_motoboy")} />
            </Form.Group>
            <Form.Group className="col-md-4 col-sm-12">
              <Form.Label>CUSTO EXTRAS:</Form.Label>
              <Form.Control type="text" required {...register("custo_extras")} />
            </Form.Group>
          </Row>
        </Card>
        <Card className='form-div'>
          <Form.Group className="col-md-0 col-sm-0">
           
            <Form.Label>EQUIPAMENTOS:</Form.Label>
            <Select name="equipamento_id_multi_select[]" id="Select-equipamentos"
              options={registroEquipments.map(sup => ({ value: sup.id, label: sup.tipo + " (ID " + sup.identificador + ")" }))}
              isMulti
              onChange={(item) => setSelectEquipments(item)}
              components={animatedComponents}

            />
          </Form.Group>
        </Card>
        <Card className='form-div'>
          <div id='clone'>
            <Row>
              <Form.Group className="col-md-10 col-sm-12">
                <Form.Label>INSUMO/PERIFÉRICO:</Form.Label>
                <Form.Select name='periferico_id' >
                  <option value=''>Selecione...</option>
                  {registrosPeripherals.map((registro, key) => {
                    return (
                      <option value={registro.id}>{registro.item}</option>
                    )
                  })}
                </Form.Select>

              </Form.Group>
              <Form.Group className="col-md-2 col-sm-12">
                <Form.Label>QDADE.:</Form.Label>
                <Form.Control type="number" name="qdade_periferico_id" />
              </Form.Group>
            </Row>
          </div>
          <Form.Group className="col-md-12 col-sm-12">
            <Button variant="primary float-right" onClick={clonagem}><AiOutlinePlusSquare />
            </Button>
          </Form.Group>
        </Card>

        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form >
    



    </>

  );
}

export default EquipmentTransfer