//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';

function ClientCRU() {
  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();


  //CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
  const navigate = useNavigate()

  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

  //CRIANDO USESTATE DA PAGINA
  const [registros, setRegistros] = useState([]);
  const [registroClient, setRegistroClients] = useState([]);

  //ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM 
  const form = (formContent) => {

    if (id) {
      console.log(formContent)
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.patch('/update_client', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.post('/create_client', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    }

  }

  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR LISTA DE CADASTRO DOS CONTRATOS EXISTENTES
  useEffect(() => {
    axiosApi.get("/list_contract")
      .then((response) => {
        setRegistros(response.data)
      })
      .catch(function (error) {
      });
  }, [])

  //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
  useEffect(() => {
    if (id) {
      axiosApi.get("/show_client/" + id)
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
          <Form.Label>VINCULO CONTRATUAL:</Form.Label>
          <Form.Select name="contrato_id" id="contrato " required {...register("contrato_id")}>
            <option value=''>Selecione...</option>
            {registros.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>CLIENTE/ ALMOXARIFADO:</Form.Label>
          <Form.Control type="text" name="nome" id="nome" required {...register("nome")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>CNPJ:</Form.Label>
          <Form.Control type="text" name="cnpj"  required {...register("cnpj")} />
        </Form.Group>
        <Row>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>RESPONSÁVEL/ OBRIGATÓRIO:</Form.Label>
            <Form.Control type="text" name="responsavel" required {...register("responsavel")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>TELEFONE CONTATO:</Form.Label>
            <Form.Control type="text" name="telefone"  required  {...register("telefone")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>EMAIL CONTATO:</Form.Label>
            <Form.Control type="text" name="email" required {...register("email")} />
          </Form.Group>
        </Row>
        {/*POR REGRA DE NEGÓCIO, SÃO DISPONIBILIZADOS O REGISTRO ATÉ 3 RESPONSÁVEIS. PORÉM, NÃO OBRIGATORIOS!*/}
        <Row>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>RESPONSÁVEL 2/ OPCIONAL:</Form.Label>
            <Form.Control type="text" name="responsavel2"{...register("responsavel2")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>TELEFONE CONTATO:</Form.Label>
            <Form.Control type="text" name="telefone2" {...register("telefone2")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12" >
            <Form.Label>EMAIL CONTATO:</Form.Label>
            <Form.Control type="text" name="email2"{...register("email2")} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>RESPONSÁVEL 3/ OPCIONAL:</Form.Label>
            <Form.Control type="text" name="responsavel3" {...register("responsavel3")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>TELEFONE CONTATO:</Form.Label>
            <Form.Control type="telefone3" name="telefone3"  {...register("telefone3")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>EMAIL CONTATO:</Form.Label>
            <Form.Control type="text" name="email3" {...register("email3")} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col-md-6 col-sm-12">
            <Form.Label>ENDEREÇO COMPLETO:</Form.Label>
            <Form.Control type="text" name="endereco" required {...register("endereco")} />
          </Form.Group>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>LINK GPS:</Form.Label>
            <Form.Control type="url" name="gps" required {...register("gps")} />
          </Form.Group>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>DISTÂNCIA:</Form.Label>
            <Form.Control type="text" name="distancia" required {...register("distancia")} />
          </Form.Group>
        </Row>
        {/*OS CAMPOS ABAIXO SÓ SÃO VISÍVEIS AOS USUÁRIOS RESPONSÁVEIS PELO FATURAMENTO*/}
        <Form.Group className="">
          <Form.Label>REF. IMPOSTO ISS:</Form.Label>
          <Form.Control type="text" name="valor_iss"  required  {...register("valor_iss")} />
        </Form.Group>
        <Row /* CUSTOS RELATIVOS A EXECUÇÃO DOS SERVIÇOS */>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>HORA ADICIONAL:</Form.Label>
            <Form.Control type="text" name="valor_hora"  required {...register("valor_hora")} />
          </Form.Group>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>ATENDIMENTO FRUSTADO:</Form.Label>
            <Form.Control type="text" name="valor_atendimento_frustado"  required  {...register("valor_atendimento_frustado")} />
          </Form.Group>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>HORA OCIOSA:</Form.Label>
            <Form.Control type="text" name="valor_ociosidade"  required {...register("valor_ociosidade")} />
          </Form.Group>
          <Form.Group className="col-md-3 col-sm-12">
            <Form.Label>VIOLAÇÃO SEM DANOS:</Form.Label>
            <Form.Control type="text" name="valor_violacao"  required {...register("valor_violacao")} />
          </Form.Group>
        </Row>
        <Row /* CUSTOS RELATIVOS A VISITA */>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>KM RODADO:</Form.Label>
            <Form.Control type="text" name="valor_km"  required {...register("valor_km")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>HOSPEDAGEM:</Form.Label>
            <Form.Control type="text" name="valor_hospedagem"  required {...register("valor_hospedagem")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>ALIMENTAÇÃO:</Form.Label>
            <Form.Control type="text" name="valor_alimentacao"  required {...register("valor_alimentacao")} />
          </Form.Group>
        </Row>
        <Row  /* CUSTOS RELATIVOS SERVIÇOS BASICOS */>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>INSTALAÇÃO FROTA LEVE:</Form.Label>
            <Form.Control type="text" name="valor_instalacao_leve"  required {...register("valor_instalacao_leve")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>REMOÇÃO FROTA LEVE:</Form.Label>
            <Form.Control type="text" name="valor_remocao_leve"  required {...register("valor_remocao_leve")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>SUBSTITUIÇÃO FROTA LEVE:</Form.Label>
            <Form.Control type="text" name="valor_substituicao_leve"  required {...register("valor_substituicao_leve")} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>INSTALAÇÃO FROTA PESADA:</Form.Label>
            <Form.Control type="text" name="valor_instalacao_pesada"  required {...register("valor_instalacao_pesada")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>REMOÇÃO FROTA PESADA:</Form.Label>
            <Form.Control type="text" name="valor_remocao_pesada"  required {...register("valor_remocao_pesada")} />
          </Form.Group>
          <Form.Group className="col-md-4 col-sm-12">
            <Form.Label>SUBSTITUIÇÃO FROTA PESADA:</Form.Label>
            <Form.Control type="text" name="valor_substituicao_pesada"  required {...register("valor_substituicao_pesada")} />
          </Form.Group>
        </Row>
        <Form.Group className="col-md-12 col-sm-12">
          <Button variant="primary float-right" type="submit">
            Salvar
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default ClientCRU