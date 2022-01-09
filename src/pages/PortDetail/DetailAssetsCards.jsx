import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {getSumValue} from "utils/arrayUtil";

const DetailAssetsCards = () => {
    const portFolioName = useParams().id;
    const navigate = useNavigate();

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const [portData, setPortData] = useState([]);

    useEffect(() => {
        const params = {
            userId       : userInfo._id,
            type         : 'all',
            portFolioName: portFolioName
        }
        axiosCall.get('/portfolio/find/foliodetail', params, function (returnData) {
            setPortData(returnData);
        }, function () {
            navigate('/404');
        })
    }, [navigate, portFolioName, userInfo._id])

    const purchasePrice = getSumValue(portData, 'purchasePrice');
    const totalSum = getSumValue(portData, 'totalSum');
    const totalProfit = getSumValue(portData, 'totalProfit');
    const totalEarningsRate = (totalProfit / purchasePrice).toLocaleString('ko-KR', {style: "percent", minimumFractionDigits : 2});

    return (
        <Card>
            <Card.Header>
                {useParams().id}
            </Card.Header>
            <Card.Body>
                <Card.Title>총 보유 자산 : </Card.Title>
                <Card.Text>총 매수 금액 : {purchasePrice.toLocaleString('ko-KR')}원</Card.Text>
                <Card.Text>총 평가 금액 : {totalSum.toLocaleString('ko-KR')}원</Card.Text>
                <Card.Text>예수금 : </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Text>총 평가 손익 : {totalProfit.toLocaleString('ko-KR')}원</Card.Text>
                <Card.Text>총 수익률 : {totalEarningsRate}</Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default DetailAssetsCards