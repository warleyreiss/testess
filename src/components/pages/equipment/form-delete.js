//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi} from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

function EquipmentDelete() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const id  = useParams();

  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate= useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit /*, formStates:{erros}*/ } = useForm();

 //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
  const form = (formContent) => {

    //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
    axiosApi.post('/delet_equipment', formContent)
      .then(function (response) {
        navigate(-1)
      })
      .catch(function (error) {
      });

  }
  return (
    <>
      <Form onSubmit={handleSubmit(form)} >
      <Form.Control type="hidden" name="equipamento_id" value={id} required {...register("equipamento_id")} />
        <Form.Group className="" >
          <Form.Label>IDENTIFICADOR:</Form.Label>
          <Form.Control type="text" name="numero_serie" required {...register("numero_serie")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>MOTIVO PRINCIPAL:</Form.Label>
          <Form.Select name="motivo" required {...register("motivo")} >
            <option value="PERCA/EXTRAVIO CLIENTE">PERCA/EXTRAVIO CLIENTE</option>
            <option value="PERCA/EXTRAVIO INTERNO">PERCA/EXTRAVIO INTERNO</option>
            <option value="DANO IRREPARAVEL CLIENTE">DANO IRREPARAVEL CLIENTE</option>
            <option value="DANO IRREPARAVEL INTERNO">DANO IRREPARAVEL INTERNO</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>JUSTIFICATIVA/DESCRIÇÃO DO OCORRIDO:</Form.Label>
          <Form.Control type="text" name="justificativa" required {...register("justificativa")} />
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

export default EquipmentDelete