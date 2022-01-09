import {Modal, Button, Form, InputGroup, DropdownButton, Dropdown, FormControl, FloatingLabel} from "react-bootstrap";
import React, {useState} from "react";
import {axiosCall} from "utils/commonUtil";

const PortModal = ({userInfo, show, changeState}) => {

    const [portName, setPortName] = useState('')
    const [account, setAccount] = useState('');

    const [isPortName, setIsPortName] = useState(false);
    const [isAccountChk, setIsAccountChk] = useState(false);

    const [portType, setPortType] = useState('');

    /**
     * portModal 설정 된 값 초기화
     */
    const portModalInit = () => {
        setPortName('')
        setPortType('')
        setAccount('')
        setIsPortName(false);
        setIsAccountChk(false);
    }
    /**
     * 계좌 선택시 이벤트
     * @param e
     */
    const onAccountHandler = (e) => {
        const currentAccount = e.target.innerHTML;
        setAccount(currentAccount);
        if (currentAccount === '') setIsAccountChk(false);
        else setIsAccountChk(true);
    }
    /**
     * 계좌 선택시 이벤트
     * 포트 타입을 지정해서 서버에 넘기는 용도
     * Dropdown.Item 에서 eventKey 값 가져옴
     * @param e
     */
    const onPortTypeHandler = (e) => {
        setPortType(e);
    }
    /**
     * 포트폴리오 이름 입력 시 이벤트
     * @param e
     */
    const onPortNameHandler = (e) => {
        const currentName = e.currentTarget.value
        setPortName(currentName);
        if (currentName === '') setIsPortName(false)
        else setIsPortName(true);
    }

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     * changeState() 로 부모 컴포넌트의 값을 변경함.
     */
    const onHideHandler = () => {
        changeState();
        portModalInit();
    }


    /**
     * 추가하기 버튼 클릭 시 이벤트
     */
    const onAddPortHandler = () => {
        const params = {
            userId       : userInfo._id,
            portFolioName: portName,
            portFolioType: portType,
        }
        axiosCall.get('/portfolio/input/folioname', params, function () {
            changeState();
            portModalInit();
        })
    }
    return (
        <Modal show={show} onHide={onHideHandler} centered>
            <Modal.Header closeButton>
                <Modal.Title>포트폴리오 추가하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="portName">
                        <FloatingLabel controlId="signInId" label="포트폴리오 이름을 입력해주세요." className="mb-3">
                            <Form.Control type="text" placeholder="ID" value={portName} onChange={onPortNameHandler}/>
                        </FloatingLabel>
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <FormControl aria-label="Text input with dropdown button" placeholder={account}
                                     disabled={true}/>
                        <DropdownButton
                            variant="outline-secondary"
                            title="계좌 선택"
                            id="input-group-dropdown-2"
                            align="end"
                            onSelect={onPortTypeHandler}
                        >
                            <Dropdown.Item onClick={onAccountHandler} eventKey='1'>일반 계좌</Dropdown.Item>
                            <Dropdown.Item onClick={onAccountHandler} eventKey='2'>ISA 계좌</Dropdown.Item>
                            <Dropdown.Item onClick={onAccountHandler} eventKey='3'>개인 연금 계좌</Dropdown.Item>
                            <Dropdown.Item onClick={onAccountHandler} eventKey='4'>IRP 계좌</Dropdown.Item>
                            <Dropdown.Item onClick={onAccountHandler} eventKey='6'>그 외(예적금, 부동산, 청약 등)</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onAddPortHandler} disabled={!(isPortName && isAccountChk)}>
                    추가
                </Button>
                <Button variant="primary" onClick={onHideHandler}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PortModal;

