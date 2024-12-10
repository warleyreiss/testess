import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Stack from 'react-bootstrap/Stack';
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'

function UserMenu() {
  return (
    <>
    <CardGroup>
    <Link className='link-card' to="/user/form" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Cadastrar usuário</Card.Title>
            <AiOutlinePlus className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Cadastre novos usuários ao projeto
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    <Link className='link-card' to="/user/view" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Lista de usuários</Card.Title>
            <AiOutlineUnorderedList className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Veja os usuários já cadastrados
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    </CardGroup>
  </>
  );
}

export default UserMenu