import {
    Card,
    CardContent,
    CardHeader,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {getStockArray, getSumValue} from "utils/arrayUtil";

const DetailAssetsCards = ({show}) => {
    const portFolioName = useParams().id;
    const navigate = useNavigate();

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const coinData = useSelector(store => store.coinData.coinData);
    const [portData, setPortData] = useState([]);
    const [stockArray, setStockArray] = useState([]);

    useEffect(() => {
        const params = {
            userId       : userInfo._id,
            type         : 'all',
            portFolioName: portFolioName
        }
        axiosCall.get('/portfolio/find/foliodetail', params, function (returnData) {
            setPortData(returnData);
            setStockArray(getStockArray(returnData.portFolioDataList, coinData));
        }, function () {
            navigate('/404');
        })
    }, [coinData, navigate, portFolioName, userInfo._id, show])

    const purchasePrice = getSumValue(stockArray, 'purchasePrice')
    const totalSum = getSumValue(stockArray, 'totalSum')
    const totalProfit = getSumValue(stockArray, 'totalProfit')
    const totalEarningsRate = (!(totalProfit / purchasePrice) ? 0 : (totalProfit / purchasePrice)).toLocaleString('ko-KR', {style: "percent", minimumFractionDigits : 2});
    const portMoney = Number(portData.portFolioWonMoney + portData.portFolioDollarMoney);
    const portTotalMoney = Number(portMoney + totalSum);

    return (
        <Card>
            <CardContent>
                <CardHeader title={useParams().id}/>
                <Typography component="p" variant="body1">
                    총 보유 자산 : {portTotalMoney.toLocaleString('ko-KR')}원<br/>
                    총 매수 금액 : {purchasePrice.toLocaleString('ko-KR')}원 <br/>
                    총 평가 금액 : {totalSum.toLocaleString('ko-KR')}원 <br/>
                    예수금 : {portMoney.toLocaleString('ko-KR')}원
                </Typography>
                <Typography sx={{mt:3}} component="p" variant="body1">
                    총 평가 손익 : {totalProfit.toLocaleString('ko-KR')}원 <br/>
                    총 수익률 : {totalEarningsRate}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DetailAssetsCards