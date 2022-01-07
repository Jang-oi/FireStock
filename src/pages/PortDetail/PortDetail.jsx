import 'styles/PortDetail.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, FloatingLabel, Form, Tab, Tabs} from "react-bootstrap";
import DetailStockCards from "./DetailStockCards";
import {axiosCall} from "../../utils/commonUtil";

const PortDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const portFolioName = useParams().id;

    const coinData = useSelector(store => store.coinData.coinData);
    const userInfo = useSelector(store => store.userInfo.userInfo);
    useEffect(() => {
        const params = {
            userId       : userInfo._id,
            type         : key,
            portFolioName: portFolioName
        }
        axiosCall.get('/portfolio/find/foliodetail', params, function(returnData) {
            console.log(returnData);
            // dispatch(setPortDetailData(getStockArray))
        })
    })

    // const getDetailData = useSelector(store => store.portDetailReducer.portDetail);*/

    const [key, setKey] = useState('all');
    const [stockTradeType, setStockTradeType] = useState('');
    const [amount, setAmount] = useState('');
    const [isAmount, setIsAmount] = useState(false);
    const [moneyType, setMoneyType] = useState('');
    const [isMoneyType, setIsMoneyType] = useState(false);

    const tabArray = ['all', 'coin'];

/*    const onStockBuyHandler = () => {
        dispatch(showModal(true));
        setStockTradeType('buy');
    }*/

/*    const onStockSellHandler = () => {
        dispatch(showModal(true));
        setStockTradeType('sell');
    }

    const params = {
        userId       : getUserInfo.userId,
        type         : key,
        portFolioName: portFolioName
    }*/
    // const url = $stringUtil.makeUrlParameter('/portfolio/find/foliodetail', params);
/*    useEffect(() => {
        if(key === 'stockEdit' || key === 'moneyEdit') return;
        $commonUtil.customAxios.get(url)
            .then(response => {
                const returnCode = $stringUtil.getReturnCode(response);
                const returnData = $stringUtil.getReturnData(response);
                const getStockArray = $arrayUtil.getStockArray(returnData, getCoinData, key);
                switch (returnCode) {
                    case 0 :
                        dispatch(setPortDetailData(getStockArray))
                        break;
                    case -1 :
                        navigate('/404');
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                console.log(error)
            });
    }, [dispatch, navigate, url, isModal, getCoinData, key]);*/

    const onTabSelectHandler = (eventKey) => {
        setKey(eventKey);
    }

    const onAmountHandler = (event) => {
        let currentAmount = event.currentTarget.value;
        currentAmount = currentAmount.replace(/[^0-9]/g, '');
        // setAmount(Number(currentAmount).toLocaleString('ko-KR', {style: 'currency', currency: 'KRW'}));
        setAmount(Number(currentAmount).toLocaleString('ko-KR'));
        if (currentAmount === '') setIsAmount(false);
        else setIsAmount(true);
    }

   /* const onMoneyEditHandler = (event) => {
        const currentMethod = event.target.id;
        const params = {
            userId       : getUserInfo.userId,
            method       : currentMethod,
            portFolioName: portFolioName,
            money        : Number(amount.replace(/,/g, "")),
            moneyType    : moneyType
        }
        const url = $stringUtil.makeUrlParameter('/portfolio/input/won', params);
        $commonUtil.customAxios.get(url)
            .then(response => {
                const returnCode = $stringUtil.getReturnCode(response);
                const returnMsg = $stringUtil.getReturnMsg(response);
                switch (returnCode) {
                    case 0 :
                        $commonUtil.customAlert({
                            icon : 'success',
                            title: returnMsg
                        }).then(() => {
                            window.location.replace(`/portfolios/${portFolioName}`);
                        })
                        break;
                    case -1 :
                        $commonUtil.customAlert({
                            icon : 'error',
                            title: returnMsg
                        });
                        break;
                    default:
                        break;
                }
            })
            .catch(error => console.log(error))
    }*/

    const onCurrencyHandler = (event) => {
        const currentMoneyType = event.target.id;
        setMoneyType(currentMoneyType);
        if (currentMoneyType) setIsMoneyType(true);
    }

    return (
        <div className="main-Container">
            <div className="inner-Container">
                {/*<StockTradeModal stockTradeType={stockTradeType}/>*/}
                <div className="detail-Left-Container">
                    <div className="left-Assets-Container">
                        {/*<DetailAssetsCards/>*/}
                    </div>
                    <div className="left-Chart-Container">
                        {/*<PieChart detailData={getDetailData}/>*/}
                    </div>
                </div>
                <div className="detail-Right-Container">
                    <div className="right-Btn-Container">
                        <Button variant="outline-primary">종목 매수</Button>
                        <Button variant="outline-danger" >종목 매도</Button>
                    </div>
                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={onTabSelectHandler} className="mb-3">
                        {tabArray.map((value, index) => {
                            return (
                                <Tab key={value} eventKey={value} title={value}>
                                    <div className="right-Stock-Container">
                                        <DetailStockCards detailData={[]}/>
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
                                    <FloatingLabel controlId="amount" label="금액" className="mb-3">
                                        <Form.Control type="text" placeholder="amount" value={amount}
                                                      onChange={onAmountHandler}/>
                                    </FloatingLabel>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check inline name="currencyGroup" id="won" type="radio" label="원(₩)"
                                                    onChange={onCurrencyHandler}/>
                                        <Form.Check inline name="currencyGroup" id="dollar" type="radio" label="달러($)"
                                                    onChange={onCurrencyHandler}/>
                                    </Form.Group>
                                    <Button variant="primary" id="input" disabled={!(isAmount && isMoneyType)}
                                            >입금</Button>
                                    <Button variant="primary" id="output" disabled={!(isAmount && isMoneyType)}
                                            >출금</Button>
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