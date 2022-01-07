import {Card, Col, Row} from "react-bootstrap";

const DetailStockCards = ({detailData}) => {
    return (
        <Row md={1} className="g-4">
            {detailData.map((value, index) => (
                <Col key={index}>
                    <Card border="Light" bg="Light">
                        <Card.Header>
                            {value.stockName}
                            <Card.Text>평가 손익 {value.totProfit.toLocaleString('ko-KR')}원
                                수익률 {value.earningsRate.toLocaleString('ko-KR', {style: "percent", minimumFractionDigits : 2})}</Card.Text>
                        </Card.Header>
                        <Card.Body>
                            보유 수량 {value.totAmount.toLocaleString('ko-KR')}개<br/>
                            구매가 {value.purchasePrice.toLocaleString('ko-KR')}원<br/>
                            평가 금액 {value.totSum.toLocaleString('ko-KR')}원
                            매수 금액 {value.purchaseAmount.toLocaleString('ko-KR')}원
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default DetailStockCards