import {Card, CardContent, Container, Grid, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {useSelector} from "react-redux";
import {PieChart} from "components/Charts";
import {getStockArray} from "utils/arrayUtil";

const Main = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const coinData = useSelector(store => store.coinData.coinData);
    const [mainStockArray, setMainStockArray] = useState([]);
    const [mainWonMoney, setMainWonMoney] = useState(0);
    const [mainDollarMoney, setMainDollarMoney] = useState(0);

    useEffect(() => {
        axiosCall.get(`portfolio/find/all/portfolio/${userInfo._id}`, '', function (returnData) {
            console.log(returnData);
            setMainDollarMoney(returnData.portFolioDollarMoney);
            setMainWonMoney(returnData.portFolioWonMoney);
            setMainStockArray(getStockArray(returnData.portFolioDataList, coinData));
        })
    }, [coinData, userInfo._id])

    /**
     * 자산 정리
     * mainTotalMoney : 전체 포트폴리오 금액 합계
     * mainMoney : 전체 포트폴리오의 현금 합계 (원화, 달러)
     * mainDomesticMoney : 전체 국내주식 합계
     * mainOverseasMoney : 전체 해외주식 합계
     * mainCoinMoney : 전체 코인 합계
     * mainNonCurrentMoney : 그 외 자산 합계
     */
    let mainMoney = mainWonMoney + (mainDollarMoney * localStorage.getItem('exchangeRate'));
    let mainTotalMoney = mainWonMoney + (mainDollarMoney * localStorage.getItem('exchangeRate'));
    let mainDomesticMoney = 0;
    let mainOverseasMoney = 0;
    let mainCoinMoney = 0;
    let mainNonCurrentMoney = 0;

    for (let i = 0; i < mainStockArray.length; i++) {
        if (mainStockArray[i].stockType === 'domestic') mainDomesticMoney += mainStockArray[i].totalSum;
        if (mainStockArray[i].stockType === 'overseas') mainOverseasMoney += mainStockArray[i].totalSum;
        if (mainStockArray[i].stockType === 'coin') mainCoinMoney += mainStockArray[i].totalSum;
        if (mainStockArray[i].stockType === 'nonCurrent') mainNonCurrentMoney += mainStockArray[i].totalSum;
        mainTotalMoney += mainStockArray[i].totalSum;
    }

    const assetArray = ['국내 주식', '해외 주식', '암호 화폐', '그 외 자산', '현금성 자산'];
    const assetSumArray = [mainDomesticMoney, mainOverseasMoney, mainCoinMoney, mainNonCurrentMoney, mainMoney];

    /**
     * 차트를 위한 옵션 및 데이터
     */
    const chartOptions = {
        cardOptions: {
            title: '구성 비중',
            style: {
                height: '100%', mb: 3
            }
        },
        options    : {
            width     : 1000,
            labels    : assetArray,
            legend    : {
                position : 'right',
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) + "%";
                }
            },
            responsive: [
                {
                    breakpoint: 1060,
                    options   : {
                        chart: {
                            width: 425
                        },
                    }
                },
                {
                    breakpoint: 900,
                    options   : {
                        chart: {
                            width: 350
                        },
                    }
                },
                {
                    breakpoint: 750,
                    options   : {
                        chart: {
                            width: 300
                        },
                    }
                },
                {
                    breakpoint: 550,
                    options   : {
                        chart: {
                            width: 250
                        },
                    }
                }
            ],
        },
        width      : 600,
        series     : assetSumArray
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sx={{mt: 3}}>
                    <Card sx={{height: '100%', mb: 3}}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="overline">
                                총 자산
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="overline" sx={{float: 'right'}}>
                                환율 {localStorage.getItem('exchangeRate')}
                            </Typography>
                            <Typography color="textPrimary" variant="h4">
                                {mainTotalMoney.toLocaleString()}원<br/>
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
                {assetArray.map((value, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            <Card sx={{height: '100%', mb: 3}}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom variant="overline">
                                        {value}
                                    </Typography>
                                    <Typography color="textPrimary" variant="h4">
                                        {assetSumArray[index].toLocaleString()}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                <Grid item xs={8}>
                    <PieChart chartOptions={chartOptions}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Main;