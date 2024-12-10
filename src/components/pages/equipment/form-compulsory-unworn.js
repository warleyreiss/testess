//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi} from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

function EquipmentCompulsoryUnworn() {

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registrosUser, setRegistrosUsers] = useState([]);

  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {

   //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.post('/create_equipment_compulsory_unworn', formContent)
      .then(function (response) {
        navigate('/equipment')
      })
      .catch(function (error) {
      });
  }

   //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE USUARIOS APTOS AO CADASTRO COMPULSORIO (TIPO PADRINHO)
  useEffect(() => {
    axiosApi.get("/list_user_input_compulsory")
      .then((response) => {
        setRegistrosUsers(response.data)
      })
      .catch(function (error) {
      });
  }, [])
  
  
 //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE EQUIPAMENTOS CADASTRADOS SOBRE POSSO DO USUARIO ATIVO 
  const [registrosInput, setRegistrosInputs] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_equipment_input")
      .then((response) => {
        setRegistrosInputs(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Form.Group className="" >
          <Form.Label>NÚMERO DE SERIE:</Form.Label>
          <Form.Control type="text" name="numero_serie" required  {...register("numero_serie")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>IDENTIFICADOR(ID):</Form.Label>
          <Form.Control type="text" name="identificador" required  {...register("identificador")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>TIPO DE EQUIPAMENTO:</Form.Label>
          <Form.Select name="tipo" id="tipo" required {...register("tipo")}>
            <option value=''>Selecione...</option>
            {registrosInput.map((registro, key) => {
              return (
                <option value={registro.item}>{registro.item}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>PADRINHO/ALMOXARIFADO:</Form.Label>
          <Form.Select name="usuario_id" required {...register("usuario_id")}>
            <option value="">Selecione para fazer uma transferência compusória</option>
            {registrosUser.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome_usuarios} -{registro.nome_clientes} </option>
              )
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default EquipmentCompulsoryUnworn
