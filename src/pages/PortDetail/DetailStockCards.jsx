import {Card, Col, Row} from "react-bootstrap";

const DetailStockCards = ({detailData}) => {

    return (
        <Row md={1} className="g-4">
            {detailData.map((value, index) => (
                <Col key={index}>
                    <Card border="Light" bg="Light">
                        <Card.Header>
                            {value.stockName}
                            <Card.Text>평가 손익 {value.totalProfit}원
                                수익률 {value.totalEarningsRate}</Card.Text>
                        </Card.Header>
                        <Card.Body>
                            보유 수량 {value.stockAmount}개<br/>
                            구매가 {value.stockPrice}원<br/>
                            평가 금액 {value.totalSum}원
                            매수 금액 {value.purchasePrice}원
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default DetailStockCards