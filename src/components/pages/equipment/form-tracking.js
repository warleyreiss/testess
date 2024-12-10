import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { axiosApi} from '../../../services/axios';
import { useForm } from 'react-hook-form';
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
function EquipmentFormTracking() {
  return (
    <>
      <Form>
        <Form.Group className="" >
          <Form.Label>NÚMERO DE SÉRIE:</Form.Label>
          <Form.Control type="text" name="numero_serie"/>
        </Form.Group>
        <Form.Group className="">
        <Link className='link-os btn-secondary'  to={{ pathname: `/ordem-de-servico/assess/` }}>  </Link>

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

export default EquipmentFormTracking