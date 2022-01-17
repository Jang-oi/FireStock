// import {Card, Col, Row} from "react-bootstrap";
import {Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {getMsg} from "utils/stringUtil";

const DetailStockCards = ({detailData}) => {
    console.log(detailData);
    return (
        <Grid container direction="column">
            {detailData.map((value, index) => (
            <Card>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {getMsg(value.stockType)}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {value.stockName}
                    </Typography>
                    <Typography variant="body2">
                        평가 손익 {value.totalProfit}원
                        수익률 {value.totalEarningsRate}<br/>
                        보유 수량 {value.stockAmount}개<br/>
                        구매가 {value.stockPrice}원<br/>
                        평가 금액 {value.totalSum}원<br/>
                        매수 금액 {value.purchasePrice}원
                    </Typography>
                </CardContent>
            </Card>
            ))}
        </Grid>
/*        <Row md={1} className="g-4">
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
        </Row>*/
    )
}

export default DetailStockCards