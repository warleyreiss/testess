import Form from 'react-bootstrap/Form';

function LabelReplacement() {
    return (
        <>
                <Form.Group className="row bg-yellow-100 bg-yellow-100 border-0" >
                    <Form.Label>MATERIAL UTILIZADO:</Form.Label>
                    {/* indicar qual veiculo estará sendo substituido */}
                </Form.Group>
        </>
    );
}

export default LabelReplacement
