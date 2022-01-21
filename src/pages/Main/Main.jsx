import {Card, CardContent, Container, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import {axiosCall} from "../../utils/commonUtil";
import {useSelector} from "react-redux";
import {getStockArray} from "../../utils/arrayUtil";

const Main = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const coinData = useSelector(store => store.coinData.coinData);

    const [portData, setPortData] = useState();
    const [stockArray, setStockArray] = useState();

    useEffect(() => {
        axiosCall.get('/portfolio/find/folio', {userId: userInfo._id}, function (returnData) {
            const testArray = Object.values(returnData.portFolioDetailMap);
            const test = [];
            for(let i = 0; i < testArray.length; i++) {
                test.push(getStockArray(testArray[i].portFolioDataList, coinData))
            }
            console.log(test);
            // setPortData(returnData);
            // setStockArray(getStockArray(returnData.portFolioDataList, coinData));
        })
    }, [userInfo._id])

    return (
        <Container>
            <Card sx={{height: '100%', mb: 3}}>
                <CardContent>
                        <Typography color="textSecondary" gutterBottom variant="overline">
                            총 자산
                        </Typography>
                        <Typography color="textPrimary" variant="h4">
                            $24k
                        </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Main;