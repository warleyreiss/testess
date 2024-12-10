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
    <Link className='link-card' to="/internal-fleet/form" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Cadastrar veículo</Card.Title>
            <AiOutlinePlus className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Cadastre uma nova frota interna
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    <Link className='link-card' to="/internal-fleet/view" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Lista de veículos internos</Card.Title>
            <AiOutlineUnorderedList className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Veja status da frota iterna
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    {/*<Link className='link-card' to="/internal-fleet/view" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Historico serviços</Card.Title>
            <AiOutlineUnorderedList className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Registro de manutenções
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
    <Link className='link-card' to="/internal-fleet/view" >
      <Card className="line" >
        <Card.Body>
          <Stack direction="horizontal" gap={2}>
            <Card.Title>Historico abastecimento</Card.Title>
            <AiOutlineUnorderedList className="ms-auto icon-card"/>
          </Stack>
          <Card.Text>
            Registro de abastecimentos
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  */}
    </CardGroup>
  </>
  );
}

export default UserMenu