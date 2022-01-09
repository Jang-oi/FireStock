import {FloatingLabel, Modal, Form, Button} from "react-bootstrap";
import {useState} from "react";

const TradeHistoryModal = ({show, changeState}) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endMinDate, setEndMinDate] = useState('');

    const [isStartDate, setIsStartDate] = useState(false);
    const [isEndDate, setIsEndDate] = useState(false);


    /**
     * TradeHistoryModal 설정 된 값 초기화
     */
    const TradeHistoryModalInit = () => {
        setStartDate('');
        setEndDate('');
        setEndMinDate('');
        setIsStartDate(false);
        setIsEndDate(false);
    }

    /**
     * Date 값 변경 시 이벤트
     * @param e
     */
    const onDateChangeHandler = (e) => {
        const currentDate = e.target.value;
        if (e.currentTarget.id.includes('Start')) {
            setEndMinDate(currentDate);
            setStartDate(currentDate);
            setIsStartDate(true)
        } else {
            setEndDate(currentDate);
            setIsEndDate(true);
        }
    }

    /**
     * 검색하기 버튼 클릭 시 이벤트
     * TradeHistory 로 값을 전달
     */
    const onHistorySearchHandler = () => {
        changeState(startDate, endDate);
        TradeHistoryModalInit();
    }

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     * changeState() 로 부모 컴포넌트의 값을 변경함.
     */
    const onHideHandler = () => {
        changeState('', '');
        TradeHistoryModalInit();
    }

    return (
        <Modal
            show={show}
            onHide={onHideHandler}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    기간별 검색 하기
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel className={"mb-3"} controlId="floatingStartDate" label="시작 날짜">
                    <Form.Control type="date" placeholder="date" min={"2022-01-01"} max={"2024-01-01"}
                                  onChange={onDateChangeHandler}/>
                </FloatingLabel>
                <FloatingLabel className={"mb-3"} controlId="floatingEndDate" label="끝 날짜">
                    <Form.Control type="date" placeholder="date" min={endMinDate} max={"2024-01-01"}
                                  onChange={onDateChangeHandler}/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHistorySearchHandler} disabled={!(isStartDate && isEndDate)}>검색하기</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TradeHistoryModal