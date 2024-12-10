import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ServiceFormSearch() {
  return (
    <>
      <Form >
        <Form.Group className="" >
          <Form.Label>NÚMERO Do SERVIÇO:</Form.Label>
          <Form.Control type="text" name="servico" required />
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

export default ServiceFormSearch