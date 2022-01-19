import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DetailStockCards from "./DetailStockCards";
import {axiosCall} from "utils/commonUtil";
import {getStockArray} from 'utils/arrayUtil';
import {setPortDetailData} from "modules/portDetail";
import {getMsg} from "utils/stringUtil";
import StockTradeModal from "./StockTradeModal";
import DetailAssetsCards from "./DetailAssetsCards";
import {PieChart} from "components/Charts";
import {
    Box,
    Container,
    Button,
    Tab,
    Tabs,
    TextField,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";

const PortDetail = () => {
    const dispatch = useDispatch();
    const portFolioName = useParams().id;
    const navigate = useNavigate();

    const coinData = useSelector(store => store.coinData.coinData);
    const userInfo = useSelector(store => store.userInfo.userInfo);
    const detailData = useSelector(store => store.portDetail.portDetailData);

    const [type, setType] = useState('list');
    const tabArray = ['list', 'coin', 'nonCurrent'];

    const [money, setMoney] = useState('');
    const [moneyType, setMoneyType] = useState('won');

    const [isMoney, setIsMoney] = useState(false);
    const [isMoneyType, setIsMoneyType] = useState(true);
    const [isMoneySubmit, setIsMoneySubmit] = useState(false);

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
    }, [coinData, dispatch, type, portFolioName, userInfo._id, navigate, isModalShow])

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
     * @param newValue
     */
    const onTabSelectHandler = (e, newValue) => {
        setType(newValue);
    }

    /**
     * 입출금의 금액 입력 시 이벤트
     * 유효성 검사 등
     * @param e
     */
    const onMoneyHandler = (e) => {
        let currentMoney = e.currentTarget.value;
        currentMoney = currentMoney.replace(/(\.\d{2})\d+/g, '$1');
        setMoney(currentMoney);
        if (currentMoney === '') setIsMoney(false);
        else setIsMoney(true);
    }

    /**
     * 입금, 출금 버튼 클릭 시 이벤트
     * @param e
     */
    const onMoneyEditHandler = (e) => {
        const currentMethod = e.target.id;
        setIsMoneySubmit(false);
        const params = {
            userId       : userInfo._id,
            method       : currentMethod,
            portFolioName: portFolioName,
            money        : Number(money.replace(/,/g, "")),
            moneyType    : moneyType
        }
        axiosCall.get('/portfolio/input/won', params, function () {
            setMoney('');
            setMoneyType('won');
            setIsMoneySubmit(true);
        })
    }

    /**
     * 원 달러 체크 시 이벤트
     * @param e
     */
    const onCurrencyHandler = (e) => {
        const currentMoneyType = e.target.value;
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
        <Container>
            <StockTradeModal stockTradeType={stockTradeType} show={isModalShow} changeState={onChangeHandler}/>
            <Box sx={{width: '50%', float: 'left'}}>
                <DetailAssetsCards show={isModalShow} isMoneySubmit={isMoneySubmit}/>
                <PieChart detailData={detailData}/>
            </Box>
            <Box sx={{width: '50%', float: 'right'}}>
                <Button variant="outlined" size="medium" sx={{width: '50%'}} onClick={onStockBuyHandler}>종목 매수</Button>
                <Button variant="outlined" size="medium" sx={{width: '50%'}} onClick={onStockSellHandler}>종목 매도</Button>
                <TabContext value={type}>
                    <Tabs
                        value={type}
                        onChange={onTabSelectHandler}
                        variant="scrollable"
                        scrollButtons={'auto'}
                        aria-label="scrollable auto tabs example"
                    >
                        {tabArray.map((value, index)=> {
                            return (
                                <Tab key={index} label={getMsg(value)} value={value}/>
                            )
                        })}
                        {/*<Tab label='종목 편집' value='stockEdit'/>*/}
                        <Tab label='입출금' value='moneyEdit'/>
                    </Tabs>
                    {tabArray.map((value, index)=> {
                        return (
                            <TabPanel key={index} value={value} sx={{padding : 0}}>
                                <DetailStockCards detailData={detailData}/>
                            </TabPanel>
                        )
                    })}
                    <TabPanel value="moneyEdit">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontSize:12}}>통화</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="won"
                            >
                                <FormControlLabel value="won" onChange={onCurrencyHandler} control={<Radio />} label="원화(₩)" />
                                <FormControlLabel value="dollar" onChange={onCurrencyHandler} control={<Radio />} label="달러($)" />
                            </RadioGroup>
                        </FormControl>
                        <TextField autoFocus label="금액을 입력해주세요." type="number" fullWidth variant="standard"
                                   inputProps={{step:0.01}}
                                   InputProps={{startAdornment: <InputAdornment position="start">{getMsg(moneyType)}</InputAdornment>}}
                                   value={money}
                                   onChange={onMoneyHandler}
                                   sx={{mb: 3}}
                        />
                        <Button variant="outlined" id="input" size="medium" sx={{width: '50%'}} disabled={!(isMoney && isMoneyType)}
                                onClick={onMoneyEditHandler}>입금</Button>
                        <Button variant="outlined" id="output" size="medium" sx={{width: '50%'}} disabled={!(isMoney && isMoneyType)}
                                onClick={onMoneyEditHandler}>출금</Button>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default PortDetail;