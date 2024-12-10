
import Form from 'react-bootstrap/Form';

function OrderOfActivities() {
    return (
        <>
            <Form.Group className="" >
                <Form.Label>QUAL A SOLUÇÃO?:</Form.Label>
                <Form.Select id='solucao' name='solucao[]' required multiple>
                    <option value='SEM PROBLEMAS DIAGNOSTICADO'>SEM PROBLEMAS DIAGNOSTICADO</option>
                    <option value='SEM NECESSIDADE DE TRATATIVAS'>SEM NECESSIDADE DE TRATATIVAS</option>
                    <option value='ATUALIZAÇÃO FIRMWARE/SCRIPT'>ATUALIZAÇÃO FIRMWARE/SCRIPT</option>
                    <option value='CHICOTE SUBSTITUIDO/CONSERTADO'>CHICOTE SUBSTITUIDO/CONSERTADO</option>
                    <option value='CHIP SUBSTITUIDO'>CHIP SUBSTITUIDO</option>
                    <option value='EQUIPAMENTO SUBSTITUIDO DANIFICADO'>EQUIPAMENTO SUBSTITUIDO DANIFICADO</option>
                    <option value='EQUIPAMENTO SUBSTITUIDO DEFEITO'>EQUIPAMENTO SUBSTITUIDO DEFEITO</option>
                    <option value='INCLUSÃO NOVOS RECURSOS'>INCLUSÃO NOVOS RECURSOS</option>
                    <option value='LEITORA SUBSTITUIDA'>LEITORA SUBSTITUIDA</option>
                    <option value='LOCAL DA INSTALAÇÃO ALTERADO'>LOCAL DA INSTALAÇÃO ALTERADO</option>
                    <option value='REPOSICIONAMENTO/CALIBRACAO CAMERAS'>REPOSICIONAMENTO/CALIBRAÇAO CAMERAS</option>
                </Form.Select>
            </Form.Group>
        </>
    );
}

export default OrderOfActivities