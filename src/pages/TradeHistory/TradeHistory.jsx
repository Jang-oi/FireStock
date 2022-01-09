import {useEffect, useState} from "react";
import {axiosCall} from "../../utils/commonUtil";
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {setHistoryData} from "modules/history";
import {getMsg} from "utils/stringUtil";
import TradeHistoryModal from "./TradeHistoryModal";

const TradeHistory = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.userInfo.userInfo);
    const history = useSelector(store => store.history.historyData);

    const [isModalShow, setIsModalShow] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const params = {
            userId   : userInfo._id,
            startDate: startDate,
            endDate  : endDate
        }
        console.log(params);
        axiosCall.get('history/find/data', {userId: userInfo._id}, function (returnData) {
            // TODO 기간별 검색
            dispatch(setHistoryData(returnData));
        })
    }, [dispatch, userInfo._id, isModalShow, startDate, endDate])


    /**
     * 기간별 검색하기 버튼 클릭 시 이벤트
     */
    const onDateSearchHandler = () => {
        setIsModalShow(true);
    }

    /**
     * Modal 창이 닫힐 때 이벤트
     */
    const onChangeHandler = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setIsModalShow(false);
    }

    return (
        <div className="main-Container">
            <div className="inner-Container">
                <TradeHistoryModal show={isModalShow} changeState={onChangeHandler}/>
                <Button variant="primary" onClick={onDateSearchHandler}>기간별 검색하기</Button>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>체결 시간</th>
                        <th>종목명</th>
                        <th>종류</th>
                        <th>거래수량</th>
                        <th>거래단가</th>
                        <th>거래금액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.regdt}</td>
                                <td>{value.portFolioData.stockName}</td>
                                <td>{getMsg(value.type)}</td>
                                <td>{value.portFolioData.stockAmount}</td>
                                <td>{value.portFolioData.stockPrice}</td>
                                <td>{value.portFolioData.stockAmount * value.portFolioData.stockPrice}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TradeHistory;