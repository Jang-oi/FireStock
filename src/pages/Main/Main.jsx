import {Card, CardContent, Container, Grid, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {useSelector} from "react-redux";
import {PieChart} from "components/Charts";
import {getStockArray} from "../../utils/arrayUtil";

const Main = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const coinData = useSelector(store => store.coinData.coinData);
    const [mainStockArray, setMainStockArray] = useState([]);
    const [mainWonMoney, setMainWonMoney] = useState(0);
    const [mainDollarMoney, setMainDollarMoney] = useState(0);

    useEffect(() => {
        axiosCall.get(`portfolio/find/all/portfolio/${userInfo._id}`, '', function (returnData) {
            setMainDollarMoney(returnData.portFolioDollarMoney);
            setMainWonMoney(returnData.portFolioWonMoney);
            setMainStockArray(getStockArray(returnData.portFolioDataList, coinData));
        })
    }, [coinData, userInfo._id])

    const assetArray = ['국내 주식', '해외 주식', '암호 화폐', '비유동 자산', '현금성 자산'];
    const assetSumArray = [];

    console.log(mainStockArray.filter(value => value.stockType === 'coin'))
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
            width     : 1200,
            labels    : ['국내주식', '해외주식', '암호화폐', '비유동 자산', '현금성 자산'],
            legend    : {
                position: 'right',
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
        width      : 500,
        series     : [1, 2, 3, 4, 5]
    }

    console.log(mainStockArray);
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
                                mainWonMoney + (mainDollarMoney * 환율) + 자산 가격
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
                                        $24k
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                <Grid item xs={6}>
                    <PieChart chartOptions={chartOptions}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Main;