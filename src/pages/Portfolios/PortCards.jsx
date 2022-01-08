import {Card, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {axiosCall, customAlert} from "utils/commonUtil";

const PortCards = ({portFolios, userInfo}) => {
    /**
     * 포트폴리오 삭제 이벤트
     * @param e
     */
    const onPortDeleteHandler = (e) => {
        const currentName = e.currentTarget.value;
        customAlert({
            icon             : 'warning',
            title            : currentName + '포트폴리오를 삭제 하시겠습니까?',
            showCancelButton : true,
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                const params = {
                    userId       : userInfo._id,
                    portFolioName: currentName
                };
                axiosCall.get('portfolio/delete/foliodetail', params, function () {
                    window.location.replace("/portfolios");
                })
            }
        });
    }

    return (
        <Row md={3} className="g-4">
            {Object.keys(portFolios).map((value, index) => (
                <Col key={index}>
                    <Card>
                        <Card.Header>
                            <Link to={`/portfolios/${value}`}>{value}</Link>
                        </Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-muted">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox"/>
                                    <label className="form-check-label">모아 보기</label>
                                </div>
                            </Card.Subtitle>
                            <Card.Text>
                                포트폴리오 종류 : {portFolios[value].portFolioType}
                            </Card.Text>
                            <Button variant="danger" onClick={onPortDeleteHandler} value={value}>삭제하기</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            Created At : {portFolios[value].regDt} <br/>
                            Updated At : {portFolios[value].upDt}
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default PortCards