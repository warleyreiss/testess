//IMPORTAÇÕES BIBLIOTECAS REACT
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineCar } from 'react-icons/ai'
function ClientMenu() {
  return (
    <>
      <CardGroup>
      <Link className='link-card' to="/client/form" >
        <Card className="line" >
          <Card.Body>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>Cadastrar cliente</Card.Title>
              <AiOutlinePlus className="ms-auto icon-card"/>
            </Stack>
            <Card.Text>
              Cadastre novos clientes ao projeto
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Link className='link-card' to="/client/view" >
        <Card className="line" >
          <Card.Body>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>Lista de clientes</Card.Title>
              <AiOutlineUnorderedList className="ms-auto icon-card"/>
            </Stack>
            <Card.Text>
              Veja os clientes já cadastrados
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Link className='link-card' to="/vehicle/form" >
        <Card className="line" >
          <Card.Body>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>Cadastrar Veículo</Card.Title>
              <AiOutlineCar className="ms-auto icon-card"/>
            </Stack>
            <Card.Text>
              Cadastre novos veículos ao projeto
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Link className='link-card' to="/vehicle/view" >
        <Card className="line" >
          <Card.Body>
            <Stack direction="horizontal" gap={2}>
              <Card.Title>Lista de veículos</Card.Title>
              <AiOutlineUnorderedList className="ms-auto icon-card"/>
            </Stack>
            <Card.Text>
              Veja os veículos já cadastrados
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      </CardGroup>
    </>
  );
}

export default ClientMenu