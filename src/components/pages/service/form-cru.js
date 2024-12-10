//IMPORTAÇÕES BIBLIOTECAS REACT
//options={registrosUser.map(sup=>({value:sup.id, label:sup.nome}))}
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ServiceCRU() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { outsourced } = useParams();
  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()
  const animatedComponents = makeAnimated();
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [isOutSourced, setIsOutSourced] = useState(outsourced ? true : false);
  const [registrosClient, setRegistrosClients] = useState([]);
  const [registrosUser, setRegistrosUsers] = useState([]);
  const [selectTecnico, setSelectTecnico] = useState([]);

  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
    const selectImputTecnico = formContent.usuario_id = selectTecnico
    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO

    axiosApi.post('/create_service', formContent)
      .then(function (response) {
        toast("Criado com Sucesso!")
        navigate('/service/view')
      })
      .catch(function (error) {
      });

  }

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE CLIENTES CADASTRADOS NA APLICAÇÃO
  useEffect(() => {

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistrosClients(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA SOLICITAR LISTA DE USUARIOS DO TIPO TÉCNICO
  useEffect(() => {

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS
    axiosApi.get("/list_user_input")
      .then((response) => {
        setRegistrosUsers(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });



  }, [])


  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Row>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>NÚMERO DO CHAMADO:</Form.Label>
            <Form.Control type="text" name="chamado" required {...register("chamado")} />
          </Form.Group>
          <Form.Group className="col-md-6 col-sm-6" >
            <Form.Label>CLIENTE/LOCAL:</Form.Label>
            <Form.Select name="cliente_id" id="cliente" required {...register("cliente_id")}>
              <option value='' selected>Selecione ...</option>
              {registrosClient.map((registro, key) => {
                return (
                  <option value={registro.id}>{registro.nome}</option>
                )
              })}

            </Form.Select>
          </Form.Group>
          <Form.Group className="col-md-2 col-sm-2" >
            <Form.Label>KM PREVISTO:</Form.Label>
            <Form.Control type="number" name="km" required={!isOutSourced} {...register("km")} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>ÍNICIO:</Form.Label>
            <Form.Control type="date" name="inicio" required {...register("inicio")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>TÉRMINO:</Form.Label>
            <Form.Control type="date" name="termino" required {...register("termino")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>TURNO:</Form.Label>
            <Form.Select name="turno" id="turno" required {...register("turno")}>
              <option value="DIURNO - DIA UTIL">DIURNO - DIA UTIL</option>
              <option value="NOTURNO - DIA UTIL">NOTURNO - DIA UTIL</option>
              <option value="DIURNO - FIM DE SEMANA">DIURNO - FIM DE SEMANA</option>
              <option value="NOTURNO - FIM DE SEMANA">NOTURNO - FIM DE SEMANA</option>
            </Form.Select>
            {/* caso seja um edição do registro não será permitida editar esse campo */}
          </Form.Group>
        </Row>

        <Form.Group className="" >
          <Form.Label>EQUIPE PREVISTA:</Form.Label>
          { /*<Form.Select name="usuario_id[]" id="tecnico" className='select-choice' required multiple {...register("usuario_id[]")}>
            registrosUser.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )
            })
          </Form.Select>*/}
          <Select name="usuario_id[]" id="tecnicos"
            options={registrosUser.map(sup => ({ value: sup.id, label: sup.nome }))}
            isMulti
            onChange={(item) => setSelectTecnico(item)}
            components={animatedComponents} />

        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>ORIENTAÇÕES PARA EXECUÇÃO DA TAREFA:</Form.Label>
          <Form.Control name='observacao' as="textarea" rows={3}  {...register("observacao")} />
        </Form.Group>
        <Card className='form-div' hidden={!isOutSourced}>
          <Row>
            <Form.Group className="col-md-8 col-sm-12" >
              <Form.Label>NOME DO TERCEIRIZADO:</Form.Label>
              <Form.Control type="text" name="inicio" required={isOutSourced} {...register("nome_terceiro")} />
            </Form.Group>
            <Form.Group className="col-md-2 col-sm-12" >
              <Form.Label>Nº NOTA FISCAL:</Form.Label>
              <Form.Control type="text" name="nota_fiscal" required={isOutSourced}{...register("nota_fiscal")} />
            </Form.Group>
            <Form.Group className="col-md-2 col-sm-12" >
              <Form.Label>VALOR DO SERVIÇO:</Form.Label>
              <Form.Control type="text" name="custo" required={isOutSourced} {...register("custo")} />
            </Form.Group>
          </Row>
        </Card>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ServiceCRU