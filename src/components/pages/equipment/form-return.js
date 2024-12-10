//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EquipmentReturn() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  const animatedComponents = makeAnimated();
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registroUsers, setRegistroUsers] = useState([]);
  const [registroEquipments, setRegistroEquipments] = useState([]);
  const [registroClients, setRegistroClients] = useState([]);
  const [selectEquipments, setSelectEquipments] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    const selectImputEquipments = formContent.equipamento_id_multi_select = selectEquipments
    console.log(formContent)
    axiosApi.post('/return_equipment', formContent)
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
      });
  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_equipment_others")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS EM POSSO DO USUARIO ATIVO
  useEffect(() => {
    axiosApi.get("/list_equipment_others")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE USUARIOS DO SETOR DE HARDWARE
  useEffect(() => {
    axiosApi.get("/list_user_hardware")
      .then((response) => {
        console.log(response)
        setRegistroUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE CLIENTES ATIVOS
  useEffect(() => {
    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistroClients(response.data)
      })
      .catch(function (error) {
      });
  }, [])


  return (
    <>
      <Form onSubmit={handleSubmit(form)}>

        <Form.Label>EQUIPAMENTOS:</Form.Label>
        <Form.Group className="col-md-0 col-sm-0">
          <Select name="equipamento_id_multi_select[]" id="Select-equipamentos"
            options={registroEquipments.map(sup => ({ value: sup.id, label: sup.tipo + " (ID " + sup.identificador + ")" }))}
            isMulti
            onChange={(item) => setSelectEquipments(item)}
            components={animatedComponents} />
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>MOTIVO DA DEVOLUÇÃO:</Form.Label>
          <Form.Select name="motivo" required {...register("motivo")}>
            <option value="REMOCAO">REMOÇÃO</option>
            <option value="SUBSTITUICAO">SUBSTITUIÇÃO</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>CLIENTE DE ORIGEM:</Form.Label>
          <Form.Select name="cliente_id" required {...register("cliente_id")}>
            <option value="">...</option>
            {registroClients.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )

            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>DESTINATÁRIO DO HARDWARE:</Form.Label>
          <Form.Select name="usuario_id" id="selectUsuario" required {...register("usuario_id")}>
            <option value="">...</option>
            {registroUsers.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome_usuario}</option>
              )

            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form >
    </>
  );
}

export default EquipmentReturn