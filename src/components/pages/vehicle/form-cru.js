//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VehicleCRU() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);

  //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
  const form = (formContent) => {

    if (id) {
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.patch('/update_vehicle', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //CONSUMO DE API COM A BIBLIOTECA AXIOS
      axiosApi.post('/create_vehicle', formContent)
        .then(function (response) {
          navigate('/client')
        })
        .catch(function (error) {
        });
    }

  }
  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR LISTA DE CLIENTES CADASTRADOS NO PROJETO
  useEffect(() => {
    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });

  }, [])
  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
  useEffect(() => {
    if (id) {
      axiosApi.get("/show_vehicle/" + id)
        .then((response) => {
          reset(response.data)
        })
        .catch(function (error) {
        });
    }
  }, [])
  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Form.Control type="hidden" name="id" value={id}  {...register("id")} />
        <Form.Group className="" >
          <Form.Label>PLACA:</Form.Label>
          <Form.Control type="text" name="placa" required {...register("placa")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>DESCRIÇÃO/FROTA:</Form.Label>
          <Form.Control type="text" name="frota" required {...register("frota")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>TIPO:</Form.Label>
          <Form.Select name="tipo" required {...register("tipo")}>
            <option value=''>Selecione...</option>
            <option value="PESADO">PESADO</option>
            <option value="LEVE">LEVE</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>CLIENTE:</Form.Label>
          <Form.Select name="cliente_id" required {...register("cliente_id")}>
            < option value='' > Selecione...</option>
            {registros.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )
            })}
          </Form.Select>
        </Form.Group >
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form >
    </>
  );
}

export default VehicleCRU