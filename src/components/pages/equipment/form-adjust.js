//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi} from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EquipmentAdjust() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate= useNavigate()

  const animatedComponents = makeAnimated();
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registroUsers, setRegistroUsers] = useState([]);
  const [registroEquipments, setRegistroEquipments] = useState([]);
  const [selectEquipments, setSelectEquipments] = useState([]);
  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {
    const selectImputEquipments = formContent.equipamento_id_multi_select= selectEquipments
    console.log( formContent)
    axiosApi.post('/adjunt_equipment', formContent)
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
    axiosApi.get("/list_equipment_all")
      .then((response) => {
        setRegistroEquipments(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  

  
  return (
    <>
      <Form onSubmit={handleSubmit(form)}>

        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>USUÁRIO/ ALMOXARIFADO DE DESTINO!!:</Form.Label>
          <Form.Select name="usuario_id" id="selectUsuario" required {...register("usuario_id")}>
            <option value="">Selecione destinatário</option>
            {registroUsers.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome_usuario + "-" + registro.nome_cliente}</option>
              )

            })}
          </Form.Select>
        </Form.Group>
        <Form.Label>EQUIPAMENTOS:</Form.Label>
        <Form.Group className="col-md-0 col-sm-0">
        <Select name="equipamento_id_multi_select[]" id="Select-equipamentos" 
          options={registroEquipments.map(sup=>({value:sup.id, label:sup.tipo +" (ID "+ sup.identificador +")"}))} 
          isMulti 
          onChange={(item)=>setSelectEquipments(item)}
          components={animatedComponents}/>
          {/*
          <Form.Select name="equipamento_id[]" id="Select-equipamentos" multiple  {...register("equipamento_id[]")}>
          {registroEquipments.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.identificador +" -"+registro.tipo}</option>
              )
            })}
          </Form.Select>
          */}
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>TIPO DE AJUSTE:</Form.Label>
          <Form.Select name="status" id="status" required {...register("status")}>
          <option value="">Selecione destinatário</option>
          <option value="1">DISPONÍVEL PARA USO NO ESTOQUE SELECIONADO</option>
          <option value="2">EM USO NO ESTOQUE SELECIONADO</option>
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

export default EquipmentAdjust