import {Card, CardContent, Grid, Typography} from "@mui/material";
import {getMsg} from "utils/stringUtil";

const DetailStockCards = ({detailData}) => {

    return (
        <Grid container direction="column">
            {detailData.map((value, index) => (
            <Card key={index} sx={{mt:1}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {getMsg(value.stockType)}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {value.stockName}
                    </Typography>
                    <Typography variant="body2" sx={{mt:2}}>
                        평가 손익 {value.totalProfit.toLocaleString('ko-KR')}원
                        수익률 {value.totalEarningsRate}<br/>
                        보유 수량 {value.stockAmount.toLocaleString('ko-KR')}개<br/>
                        구매가 {value.stockPrice.toLocaleString('ko-KR')}원<br/>
                        평가 금액 {value.totalSum.toLocaleString('ko-KR')}원<br/>
                        매수 금액 {value.purchasePrice.toLocaleString('ko-KR')}원
                    </Typography>
                </CardContent>
            </Card>
            ))}
        </Grid>
    )
}

export default DetailStockCards