
//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus } from 'react-icons/ai'

function ContractMenu() {

  return (
    <CardGroup>
    <Link className='link-card' to="/contract/form" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Cadastrar contrato</Card.Title>
            <AiOutlinePlus className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Cadastre novos contratos ao projeto
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    <Link className='link-card' to="/contract/view" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Lista de contratos</Card.Title>
            <AiOutlinePlus className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
           Veja os contratos já cadastrados
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    </CardGroup>
  );
}

export default ContractMenu