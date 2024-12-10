import Form from 'react-bootstrap/Form';

function SectionRemovedEquipment() {
    return (
        <>
                <Form.Group className="" >
                    <Form.Label>MATERIAL UTILIZADO:</Form.Label>
                    <Form.Select id='materialRemovido' name='materialRemovido[]' multiple search='true'>
                         {/* preencher os equipamentos do estoque do cliente que esteja sendo utilizado em veiculos, ou se puder listar os equipamentos que estão no veiculo*/}
                    </Form.Select>
                </Form.Group>
        </>
    );
}

export default SectionRemovedEquipment