
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom'
import React, {useState}  from 'react';
function ContractCRU() {
	const [nome, setNome] = useState('');
    const [cnpj, setcnpj] = useState('');
    const [endereco, setEndereco] = useState('');
	const [responsavel, setResponsavel] = useState('');
	const [telefone, setTelefone] = useState('');
	const [email, setEmail] = useState('');
	const [irpj, setirpj] = useState('');
	const [pis, setpis] = useState('');
	const [cofins, setcofis] = useState('');
	const [csl, setcsl] = useState('');
	const [ibpt, setibpt] = useState('');

	const handleSubmit = (e) => {
        e.preventDefault();//previne envio prematuro do formulario



		
        /*const data = { nome, cnpj, endereco, responsavel, telefone, email, irpj, pis, cofins, csl, ibpt }; // seta todas variaveis
        fetch('http://localhost:3001/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                history.push('/');
            }).catch(err => {
                console.log(err);
            }
            );*/
    }

	return (
		<>
			<Form >
				<Form.Group className="" >
					<Form.Label>NOME/RAZÃO SOCIAL:</Form.Label>
					<Form.Control type="text" name="nome" required onChange={(e) => setNome(e.target.value)}/>
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>CNPJ:</Form.Label>
					<Form.Control type="text" name="cnpj" required onChange={(e) => setcnpj(e.target.value)}/>
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>ENDEREÇO COMPLETO:</Form.Label>
					<Form.Control type="text" name="endereco" required onChange={(e) => setEndereco(e.target.value)}/>
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>RESPONSÁVEL FINANCEIRO:</Form.Label>
					<Form.Control type="text" name="responsavel" required onChange={(e) => setResponsavel(e.target.value)}/>
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>TELEFONE:</Form.Label>
					<Form.Control type="text" name="telefone" required onChange={(e) => setTelefone(e.target.value)}/>
				</Form.Group>
				<Form.Group className="" >
					<Form.Label>EMAIL:</Form.Label>
					<Form.Control type="text" name="email" required onChange={(e) => setEmail(e.target.value)}/>
				</Form.Group>
				<Row>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO IRPJ:</Form.Label>
						<Form.Control type="text" name="irpj" required onChange={(e) => setirpj(e.target.value)}/>
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO PIS:</Form.Label>
						<Form.Control type="text" name="pis" required onChange={(e) => setpis(e.target.value)}/>
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO COFIS:</Form.Label>
						<Form.Control type="text" name="cofis" required onChange={(e) => setcofis(e.target.value)}/>
					</Form.Group>
					<Form.Group className="col-md-3 col-sm-12" >
						<Form.Label>IMPOSTO CSL:</Form.Label>
						<Form.Control type="text" name="csl" required onChange={(e) => setcsl(e.target.value)}/>
					</Form.Group>
				</Row>
				<Form.Group className="col-md-3 col-sm-12" >
					<Form.Label>FONTE IBPT:</Form.Label>
					<Form.Control type="text" name="ibpt" required onChange={(e) => setibpt(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" type="button" onClick={handleSubmit}>
					Salvarssssss
				</Button>
			</Form>
		</>
	);
}

export default ContractCRU