
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { axiosApi } from '../../../services/axios';
import { useParams } from 'react-router-dom';

function UserCRU() {

  //OBTENDO VARIAVEIS PARASSADAS VIA URL
  const { id } = useParams();

  const navigate = useNavigate()
  //CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
  const { register, handleSubmit, reset/*, formStates:{erros}*/ } = useForm();

  //FUNÇÃO PADRÃO PARA EXTRAÇÃO DE DADOS DO FORMULARIO PELO REACT-HOOK-GORM
  const form = (formContent) => {

    if (id) {
      console.log(formContent)
      //REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
      axiosApi.patch('/update_user', formContent)
        .then(function (response) {
          navigate(-1)
        })
        .catch(function (error) {
        });
    } else {
      //CONSUMO DE API COM A BIBLIOTECA AXIOS
      axiosApi.post('/create_user', formContent)
        .then(function (response) {
          navigate('/user')

        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  const frotaItnerna = (obj) => {
    const campoFrota = document.getElementById('frota')
    if (obj === "TECNICO") {
      // campoFrota.setAttribute('required','true');
      campoFrota.removeAttribute('disabled');
    } else {
      campoFrota.disabled = 'true'
      //campoFrota.removeAttribute('required')
    }
  }

  //CONSUMO DE API COM A BIBLIOTECA AXIOS
  const [registrosClient, setRegistrosClients] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_client_input")
      .then((response) => {
        setRegistrosClients(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });

  }, [])

  //CONSUMO DE API COM A BIBLIOTECA axiosApi
  const [registrosInternalFleet, setRegistrosInternalFleets] = useState([]);
  useEffect(() => {
    axiosApi.get("/list_internal_fleet_input")
      .then((response) => {
        setRegistrosInternalFleets(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });

  }, [])
 //REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
 useEffect(() => {
  if (id) {
    axiosApi.get("/show_user/" + id)
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
          <Form.Label>TIPO DE USUÁRIO:</Form.Label >
          <Form.Select name="tipo" id="tipo" onClick={e => frotaItnerna(e.target.value)} required {...register("tipo")}>
            <option value='' selected>Selecione...</option>
            <option value="GESTOR">GESTOR</option>
            <option value="TECNICO">COLABORADOR EXTERNO</option>
            <option value="TERCEIRO">PRESTADOR DE SERVIÇO</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>SETOR:</Form.Label >
          <Form.Select name="setor" id="setor" onClick={e => frotaItnerna(e.target.value)} required {...register("setor")}>
            <option value='' selected>Selecione...</option>
            <option value="COMPRAS">COMPRAS</option>
            <option value="FATURAMENTO">FATURAMENTO</option>
            <option value="MATERIAIS">MATERIAIS</option>
            <option value="POS_VENDA">POS_VENDAS</option>
            <option value="TECNICO">TECNICO</option>
            <option value="HARDWARE">HARDWARE</option>
            <option value="CLIENTE">CLIENTE</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>CLIENTE/ ALMOXARIFADO:</Form.Label>
          <Form.Select name="cliente_id" id="cliente" required {...register("cliente_id")}>
            <option value=''>Selecione...</option>
            {registrosClient.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.nome}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>NOME DO USUÁRIO:</Form.Label>
          <Form.Control type="text" name="nome" required  {...register("nome")} />
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>EMAIL DE ACESSO:</Form.Label>
          <Form.Control type="email" name="email" required {...register("email")} />
        </Form.Group>

        {/*SE FOR EDIÇÃO E O USUARÁRIO FOR DO TIPO TÉCNICO E CAMPO ABAIXO SERÁ EXIBIDO*/}
        <Form.Group className="" >
          <Form.Label>FROTA INTERNA:</Form.Label>
          <Form.Select name="frota_interna_id" id="frota" disabled {...register("frota_interna_id")}>
            <option value=''>Selecione...</option>
            {registrosInternalFleet.map((registro, key) => {
              return (
                <option value={registro.id}>{registro.placa + " " + registro.frota}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="" >
          <Form.Label>SENHA:</Form.Label>
          <Form.Control type="password" name="senha" required  {...register("senha")} />
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

export default UserCRU