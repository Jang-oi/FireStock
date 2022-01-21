import {Avatar, Card, CardContent, Container, Grid, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {axiosCall} from "../../utils/commonUtil";
import {useSelector} from "react-redux";
import {getStockArray} from "../../utils/arrayUtil";
import MoneyIcon from '@mui/icons-material/Money';

const Main = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const coinData = useSelector(store => store.coinData.coinData);

    const [portData, setPortData] = useState();
    const [stockArray, setStockArray] = useState();

    useEffect(() => {
        axiosCall.get('/portfolio/find/folio', {userId: userInfo._id}, function (returnData) {
            const testArray = Object.values(returnData.portFolioDetailMap);
            let test = [];
            for (let i = 0; i < testArray.length; i++) {
                test.push(getStockArray(testArray[i].portFolioDataList, coinData))
            }
            console.log(test);
            // setPortData(returnData);
            // setStockArray(getStockArray(returnData.portFolioDataList, coinData));
        })
    }, [userInfo._id])

    const assetArray = ['국내 주식', '해외 주식', '암호 화폐', '비유동 자산'];

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{height: '100%', mb: 3}}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="overline">
                                총 자산
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="overline" sx={{float:'right'}}>
                                환율 {window.basePrice}
                            </Typography>
                            <Typography color="textPrimary" variant="h4">
                                $24k
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
                {assetArray.map((value, index) => {
                    return (
                        <Grid item xs={6} key={index}>
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
                <Grid item xs={12}>
                    <Card sx={{height: '100%', mb: 3}}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="overline">
                                현금성 자산
                            </Typography>
                            <Typography color="textPrimary" variant="h4">
                                $24k
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Main;