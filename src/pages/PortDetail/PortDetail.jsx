import 'styles/PortDetail.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, FloatingLabel, Form, Tab, Tabs} from "react-bootstrap";
import DetailStockCards from "./DetailStockCards";
import {axiosCall} from "utils/commonUtil";
import {getStockArray} from 'utils/arrayUtil';
import {setPortDetailData} from "modules/portDetail";
import {getMsg} from "utils/stringUtil";
import StockTradeModal from "./StockTradeModal";
import DetailAssetsCards from "./DetailAssetsCards";
import {PieChart} from "components/Charts";

const PortDetail = () => {
    const dispatch = useDispatch();
    const portFolioName = useParams().id;
    const navigate = useNavigate();

    const coinData = useSelector(store => store.coinData.coinData);
    const userInfo = useSelector(store => store.userInfo.userInfo);
    const detailData = useSelector(store => store.portDetail.portDetailData);

    const [type, setType] = useState('list');
    const tabArray = ['list', 'domestic', 'overseas', 'coin', 'nonCurrent'];

    const [money, setMoney] = useState('');
    const [moneyType, setMoneyType] = useState('');

    const [isMoney, setIsMoney] = useState(false);
    const [isMoneyType, setIsMoneyType] = useState(false);

    const [isModalShow, setIsModalShow] = useState(false);

    useEffect(() => {
        if (type === 'stockEdit' || type === 'moneyEdit') return;
        const params = {
            userId       : userInfo._id,
            type         : type,
            portFolioName: portFolioName
        }
        axiosCall.get('/portfolio/find/foliodetail', params, function (returnData) {
            const stockArray = getStockArray(returnData, coinData);
            dispatch(setPortDetailData(stockArray));
        }, function () {
            navigate('/404');
        })
    }, [coinData, dispatch, type, portFolioName, userInfo._id, navigate])

    const [stockTradeType, setStockTradeType] = useState('');


    /**
     * 종목 매수 버튼 클릭 시 이벤트
     */
    const onStockBuyHandler = () => {
        setStockTradeType('buy');
        setIsModalShow(true);
    }

    /**
     * 종목 매도 버튼 클릭 시 이벤트
     */
    const onStockSellHandler = () => {
        setStockTradeType('sell');
        setIsModalShow(true);
    }

    /**
     * 메뉴 탭 클릭 시 이벤트
     * @param e
     */
    const onTabSelectHandler = (e) => {
        setType(e);
    }

    /**
     * 입출금의 금액 입력 시 이벤트
     * 유효성 검사 등
     * @param e
     */
    const onMoneyHandler = (e) => {
        let currentMoney = e.currentTarget.value;
        currentMoney = currentMoney.replace(/[^0-9]/g, '');
        setMoney(Number(currentMoney).toLocaleString('ko-KR'));
        if (currentMoney === '') setIsMoney(false);
        else setIsMoney(true);
    }

    /**
     * 입금, 출금 버튼 클릭 시 이벤트
     * @param e
     */
    const onMoneyEditHandler = (e) => {
        const currentMethod = e.target.id;
        const params = {
            userId       : userInfo._id,
            method       : currentMethod,
            portFolioName: portFolioName,
            money        : Number(money.replace(/,/g, "")),
            moneyType    : moneyType
        }
        axiosCall.get('/portfolio/input/won', params, function() {
            // TODO 현재 예수금에 대한 정보가 업데이트 되는지 확인.
            // window.location.replace(`/portfolios/${portFolioName}`);
        })
    }

    /**
     * 원 달러 체크 시 이벤트
     * @param e
     */
    const onCurrencyHandler = (e) => {
        const currentMoneyType = e.target.id;
        setMoneyType(currentMoneyType);
        if (currentMoneyType) setIsMoneyType(true);
    }

    /**
     * Modal 창이 닫힐 때 이벤트
     */
    const onChangeHandler = () => {
        setIsModalShow(false);
    }

    return (
        <div className="main-Container">
            <div className="inner-Container">
                <StockTradeModal stockTradeType={stockTradeType} show={isModalShow} changeState={onChangeHandler}/>
                <div className="detail-Left-Container">
                    <div className="left-Assets-Container">
                        <DetailAssetsCards detailData={detailData}/>
                    </div>
                    <div className="left-Chart-Container">
                        <PieChart detailData={detailData}/>
                    </div>
                </div>
                <div className="detail-Right-Container">
                    <div className="right-Btn-Container">
                        <Button variant="outline-primary" onClick={onStockBuyHandler}>종목 매수</Button>
                        <Button variant="outline-danger" onClick={onStockSellHandler}>종목 매도</Button>
                    </div>
                    <Tabs id="controlled-tab-example" activeKey={type} onSelect={onTabSelectHandler} className="mb-3">
                        {tabArray.map((value) => {
                            return (
                                <Tab key={value} eventKey={value} title={getMsg(value)}>
                                    <div className="right-Stock-Container">
                                        <DetailStockCards detailData={detailData}/>
                                    </div>
                                </Tab>
                            )
                        })}
                        <Tab eventKey="stockEdit" title="종목 편집">
                            <div className="right-Stock-Container">

                            </div>
                        </Tab>
                        <Tab eventKey="moneyEdit" title="입출금">
                            <div className="right-Stock-Container">
                                <Form>
                                    <FloatingLabel controlId="money" label="금액" className="mb-3">
                                        <Form.Control type="text" placeholder="money" value={money}
                                                      onChange={onMoneyHandler}/>
                                    </FloatingLabel>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check inline name="currencyGroup" id="won" type="radio" label="원(₩)"
                                                    onChange={onCurrencyHandler}/>
                                        <Form.Check inline name="currencyGroup" id="dollar" type="radio" label="달러($)"
                                                    onChange={onCurrencyHandler}/>
                                    </Form.Group>
                                    <Button variant="primary" id="input" disabled={!(isMoney && isMoneyType)}
                                            onClick={onMoneyEditHandler}>입금</Button>
                                    <Button variant="primary" id="output" disabled={!(isMoney && isMoneyType)}
                                            onClick={onMoneyEditHandler}>출금</Button>
                                </Form>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default PortDetail;