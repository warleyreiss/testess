//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi} from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

function TicketReaccept() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

   //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
   const navigate= useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {
    console.log(formContent)
    //CONSUMO DE API COM A BIBLIOTECA AXIOS
    axiosApi.patch('/ticket_reaccept', formContent)
      .then(function (response) {
       navigate(-1)
      })
      .catch(function (error) {
      });
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit(form)}>
      <Form.Control type="hidden" name="id" value={id} required {...register("id")} />
      <Form.Group className="" >
          <Form.Label>JUSTIFICATIVA:</Form.Label>
          <Form.Control type="text" name="motivo" required  {...register("motivo")} />
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

export default TicketReaccept
