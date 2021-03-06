import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DetailStockCards from "./DetailStockCards";
import {axiosCall} from "utils/commonUtil";
import {getArrayKey, getStockArray} from 'utils/arrayUtil';
import {setPortDetailData} from "modules/portDetail";
import {getMsg} from "utils/stringUtil";
import StockTradeModal from "./StockTradeModal";
import DetailAssetsCards from "./DetailAssetsCards";
import {PieChart} from "components/Charts";
import {
    Container,
    Button,
    Tab,
    Tabs,
    TextField,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup, FormControlLabel, Radio, Grid
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
    const tabArray = ['list', 'domestic', 'overseas', 'coin', 'nonCurrent'];

    const [money, setMoney] = useState('');
    const [moneyType, setMoneyType] = useState('won');

    const [isMoney, setIsMoney] = useState(false);
    const [isMoneyType, setIsMoneyType] = useState(true);
    const [isMoneySubmit, setIsMoneySubmit] = useState(false);

    const [isModalShow, setIsModalShow] = useState(false);
    const [isStockUpdate, setIsStockUpdate] = useState(false);

    useEffect(() => {
        setMoneyType('won');
        if (type === 'moneyEdit') return;
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
    }, [coinData, dispatch, type, portFolioName, userInfo._id, navigate, isModalShow, isStockUpdate])

    const [stockTradeType, setStockTradeType] = useState('');


    /**
     * ?????? ?????? ?????? ?????? ??? ?????????
     */
    const onStockBuyHandler = () => {
        setStockTradeType('buy');
        setIsModalShow(true);
    }

    /**
     * ?????? ?????? ?????? ?????? ??? ?????????
     */
    const onStockSellHandler = () => {
        setStockTradeType('sell');
        setIsModalShow(true);
    }

    /**
     * ?????? ??? ?????? ??? ?????????
     * @param e
     * @param newValue
     */
    const onTabSelectHandler = (e, newValue) => {
        setType(newValue);
    }

    /**
     * ???????????? ?????? ?????? ??? ?????????
     * ????????? ?????? ???
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
     * ??????, ?????? ?????? ?????? ??? ?????????
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
     * ??? ?????? ?????? ??? ?????????
     * @param e
     */
    const onCurrencyHandler = (e) => {
        const currentMoneyType = e.target.value;
        setMoneyType(currentMoneyType);
        if (currentMoneyType) setIsMoneyType(true);
    }

    /**
     * Modal ?????? ?????? ??? ?????????
     */
    const onChangeHandler = () => {
        setIsModalShow(false);
    }

    /**
     * ????????? ?????? ???????????? ??????, ?????? ??? ????????? ?????????
     */
    const onStockUpdateHandler = () => {
        setIsStockUpdate(!isStockUpdate);
    }

    /**
     * ????????? ?????? ?????? ??? ?????????
     */
    const chartOptions = {
        cardOptions: {
            title: '?????? ??????',
            sx   : {
                mt: 3
            },
        },
        options    : {
            labels    : getArrayKey(detailData, 'stockName'),
            legend    : {
                position : 'bottom',
                formatter: function (val, opts) {
                    return val + " - " + opts.w.globals.seriesPercent[opts.seriesIndex][0].toFixed(1) + "%";
                }
            },
            responsive: [
                {
                    breakpoint: 650,
                    options   : {
                        chart: {
                            width: 275
                        },
                    }
                },
                {
                    breakpoint: 750,
                    options   : {
                        chart: {
                            width: 350
                        },
                    }
                },
                {
                    breakpoint: 1000,
                    options   : {
                        chart: {
                            width: 425
                        },
                    }
                },
            ],
        },
        width      : 500,
        series     : getArrayKey(detailData, 'totalSum'),
    }

    return (
        <Container>
            <StockTradeModal stockTradeType={stockTradeType} show={isModalShow} changeState={onChangeHandler}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <DetailAssetsCards show={isModalShow} isMoneySubmit={isMoneySubmit}/>
                    <PieChart chartOptions={chartOptions}/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" size="medium" sx={{width: '50%'}} onClick={onStockBuyHandler}>??????
                        ??????</Button>
                    <Button variant="outlined" size="medium" sx={{width: '50%'}} onClick={onStockSellHandler}>??????
                        ??????</Button>
                    <TabContext value={type}>
                        <Tabs
                            value={type}
                            onChange={onTabSelectHandler}
                            variant="scrollable"
                            scrollButtons={'auto'}
                            aria-label="scrollable auto tabs example"
                        >
                            {tabArray.map((value, index) => {
                                return (
                                    <Tab key={index} label={getMsg(value)} value={value}/>
                                )
                            })}
                            <Tab label='?????????' value='moneyEdit'/>
                        </Tabs>
                        {tabArray.map((value, index) => {
                            return (
                                <TabPanel key={index} value={value} sx={{padding: 0}}>
                                    <DetailStockCards detailData={detailData} isStockUpdate={onStockUpdateHandler}/>
                                </TabPanel>
                            )
                        })}
                        <TabPanel value="moneyEdit">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontSize: 12}}>??????</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue="won"
                                >
                                    <FormControlLabel value="won" onChange={onCurrencyHandler} control={<Radio/>}
                                                      label="??????(???)"/>
                                    <FormControlLabel value="dollar" onChange={onCurrencyHandler} control={<Radio/>}
                                                      label="??????($)"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField autoFocus label="????????? ??????????????????." type="number" fullWidth variant="standard"
                                       inputProps={{step: 0.01}}
                                       InputProps={{
                                           startAdornment: <InputAdornment
                                               position="start">{getMsg(moneyType)}</InputAdornment>
                                       }}
                                       value={money}
                                       onChange={onMoneyHandler}
                                       sx={{mb: 3}}
                            />
                            <Button variant="outlined" id="input" size="medium" sx={{width: '50%'}}
                                    disabled={!(isMoney && isMoneyType)}
                                    onClick={onMoneyEditHandler}>??????</Button>
                            <Button variant="outlined" id="output" size="medium" sx={{width: '50%'}}
                                    disabled={!(isMoney && isMoneyType)}
                                    onClick={onMoneyEditHandler}>??????</Button>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PortDetail;