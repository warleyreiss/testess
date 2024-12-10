//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function VehicleFuel() {

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
      axiosApi.patch('/', formContent) /*não deixei habilitada a funcionalidade de editar cadastro da frota*/
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //CONSUMO DE API COM A BIBLIOTECA AXIOS
      axiosApi.post('/create_internal_fleet', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    }

  }
  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
        <Form.Control type="hidden" name="id" value={id}  {...register("id")} />
        <Form.Group className="" >
          <Form.Label>QUILOMETRAGEM:</Form.Label>
          <Form.Control type="text" name="kmAtual" required {...register("kmAtual")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>TIPO COMBUSTÍVEL:</Form.Label>
          <Form.Control type="text" name="tipoCombustivel" required {...register("tipoCombustivel")} />
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>QDADE. LITROS:</Form.Label>
          <Form.Control type="text" name="quantidade" required {...register("quantidade")} />
        </Form.Group>
        <Form.Group className="col-md-12 col-sm-12" >
          <Form.Label>VALOR TOTAL:</Form.Label>
          <Form.Control type="text" name="valorTotal" required {...register("valorTotal")} />
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

export default VehicleFuel