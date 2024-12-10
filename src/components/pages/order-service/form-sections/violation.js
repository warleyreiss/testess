import Form from 'react-bootstrap/Form';

function SectionViolation() {
    return (
        <>
            <Form.Group className="" >
                <Form.Label>HOUVE VIOLAÇÃO?:</Form.Label>
                <Form.Select id='violacao' name='violacao' onchange="viol()" required >
                    <option value='SIM' selected> Houve violação</option>
                    <option value='NAO'> Não houve violação</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="" >
                <Form.Label>A VIOLAÇÃO CAUSOU DANOS?:</Form.Label>
                <Form.Select id='danos' name='danos' required>
                    <option value='SIM' selected> Houve violação</option>
                    <option value='NAO'> Não houve violação</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="" >
                <Form.Label>O QUE FOI VIOLADO?:</Form.Label>
                <Form.Select id='descricaoViolacao' name='descricaoViolacao' required>
                    {/* preencher os equipamentos para seleção */}
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default SectionViolation