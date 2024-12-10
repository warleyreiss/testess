
//IMPORTAÇÕES BIBLIOTECAS REACT
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi } from '../../../services/axios';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';
function ContractCRU() {

	//OBTENDO VARIAVEIS PARASSADAS VIA URL
	const { id } = useParams();

	//CRIANDO ESTANCIA DE NAVEGAÇÃO PARA REDIRECIONEMNTO
	const navigate = useNavigate()

	//CARREGA AS FUNÇOES DA BIBLIOTECA REACT-HOOK-FORM
	const { register, handleSubmit, reset /*, formStates:{erros}*/ } = useForm();

	//ENVIANDO FORMULARIO COM A BIBLIOTECA REACT-HOOK-FORM
	const form = (formContent) => {
		if (id) {
			//REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
			axiosApi.patch('/update_contract', formContent)
				.then(function (response) {
					navigate(-1)
				})
				.catch(function (error) {
				});
		} else {
			//REQUISIÇÃO COM A BIBLIOTECA AXIOS PARA ENVIO FORMULARIO
			axiosApi.post('/create_contract', formContent)
				.then(function (response) {
					navigate(-1)
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	}

	//REQUISIÇÃO COM A BIBLIOTECA axiosApi PARA SOLICITAR O CADASTRO DO CLIENTE CASO SEJA UMA EDIÇÃO
	useEffect(() => {
		if (id) {
			axiosApi.get("/show_contract/" + id)
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
					<Form.Label>NOME/RAZÃO SOCIAL:</Form.Label>
					<Form.Control type="text" name="nome" required {...register("nome")} />
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>CNPJ:</Form.Label>
					<Form.Control type="text" name="cnpj" required {...register("cnpj")} />
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>ENDEREÇO COMPLETO:</Form.Label>
					<Form.Control type="text" name="endereco" required {...register("endereco")} />
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>RESPONSÁVEL FINANCEIRO:</Form.Label>
					<Form.Control type="text" name="responsavel" required {...register("responsavel")} />
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>TELEFONE:</Form.Label>
					<Form.Control type="text" name="telefone" required {...register("telefone")} />
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>EMAIL:</Form.Label>
					<Form.Control type="text" name="email" {...register("email")} />
				</Form.Group>
				<Row>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO IRPJ:</Form.Label>
						<Form.Control type="text" name="irpj" as={InputMask} mask="999.99" required {...register("irpj")} />
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO PIS:</Form.Label>
						<Form.Control type="text" name="pis" as={InputMask} mask="999.99" required {...register("pis")} />
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO COFINS:</Form.Label>
						<Form.Control type="text" name="cofis" as={InputMask} mask="999.99" required {...register("cofis")} />
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO CSL:</Form.Label>
						<Form.Control type="text" name="csl" as={InputMask} mask="999.99" required {...register("csl")} />
					</Form.Group>
				</Row>
				<Form.Group className="col-md-3 col-sm-12" >
					<Form.Label>FONTE IBPT:</Form.Label>
					<Form.Control type="text" name="ibpt" required {...register("ibpt")} />
				</Form.Group>
				<Form.Group className="col-md-12 col-sm-12" >
					<Button variant="primary float-right" type="submit">
						Salvar
					</Button>
				</Form.Group>
			</Form>
		</>
	);
}

export default ContractCRU