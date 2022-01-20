import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getMsg, makeUrlParameter} from "utils/stringUtil";
import {axiosCall} from "utils/commonUtil";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Checkbox, FormControlLabel
} from "@mui/material";
import {FixedSizeList} from "react-window";
import {getStockArray} from "../../utils/arrayUtil";

const StockTradeModal = ({stockTradeType, show, changeState}) => {
    const portFolioName = useParams().id;
    const navigate = useNavigate();

    const coinData = useSelector(store => store.coinData.coinData);
    const userInfo = useSelector(store => store.userInfo.userInfo);

    const defaultArray = [
        {stockName: '기타자산 - 부동산', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
        {stockName: '기타자산 - 금', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
        {stockName: '기타자산 - 청약', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'}
    ]

    const [searchArray, setSearchArray] = useState(defaultArray);
    const [sellArray, setSellArray] = useState([]);
    const [selectStock, setSelectStock] = useState({});

    const [averagePrice, setAveragePrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const [isQuantity, setIsQuantity] = useState(false);
    const [isAveragePrice, setIsAveragePrice] = useState(false);

    const [isStockModal, setIsStockModal] = useState(true);

    useEffect(() => {
        if (stockTradeType === 'sell') {
            const params = {
                userId       : userInfo._id,
                type         : 'all',
                portFolioName: portFolioName
            }
            axiosCall.get('/portfolio/find/foliodetail', params, function (returnData) {
                setSearchArray(getStockArray(returnData.portFolioDataList, coinData));
                setSellArray(getStockArray(returnData.portFolioDataList, coinData));
            }, function () {
                navigate('/404');
            })
        }
        if (stockTradeType === 'buy') {
            setSearchArray([
                {stockName: '기타자산 - 부동산', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
                {stockName: '기타자산 - 금', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
                {stockName: '기타자산 - 청약', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'}
            ])
        }
    }, [coinData, navigate, portFolioName, stockTradeType, userInfo._id, show])

    /**
     * stockTradeModal 설정 된 값 초기화
     */
    const stockTradeModalInit = () => {
        setIsStockModal(true);
        if(stockTradeType === 'buy') setSearchArray(defaultArray);
        else setSearchArray(sellArray)
        setAveragePrice('');
        setQuantity('');
        setIsAveragePrice(false);
        setIsQuantity(false);
    }

    /**
     * StockTradeModal 창에서 종목 매수, 매도 버튼 클릭 시 이벤트
     */
    const onStockTradeHandler = () => {
        const params = {
            userId       : userInfo._id,
            method       : stockTradeType,
            portFolioName: portFolioName
        }
        const url = makeUrlParameter('/portfolio/input/stock', params);
        const stockTradeData = {
            stockInfo  : selectStock.stockInfo,
            stockName  : selectStock.stockName,
            stockType  : selectStock.stockType,
            stockPrice : averagePrice.replace(/,/g, ""),
            stockAmount: quantity
        }
        axiosCall.post(url, stockTradeData, function () {
            onHideHandler();
        })
    }

    /**
     * 종목명 검색 시 이벤트
     * @param e
     */
    const onSearchHandler = (e) => {
        const searchValue = e.currentTarget.value;
        let searchArray;
        if (stockTradeType === 'buy') {
            searchArray = coinData.filter(data => data.stockName.includes(searchValue))
            if (searchValue === '') setSearchArray(defaultArray);
            else setSearchArray(searchArray);
        } else {
            searchArray = sellArray.filter(data => data.stockName.includes(searchValue))
            setSearchArray(searchArray);
        }
    }

    /**
     * 종목 검색 후 종목 클릭 시 이벤트
     * isStockModal 을 통해 StockTradeModal 창에서 화면 변경함.
     * @param e
     * @param value
     */
    const onListClickHandler = (e, value) => {
        setIsStockModal(false);
        setSelectStock(value);
    }

    /**
     * 뒤로가기 버튼 시 이벤트
     */
    const onBackBtnClickHandler = () => {
        stockTradeModalInit()
    }

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     * changeState() 로 부모 컴포넌트의 값을 변경함.
     */
    const onHideHandler = () => {
        stockTradeModalInit();
        changeState();
    }

    /**
     * 현재가격 적용하기 클릭 시 이벤트
     * 선택한 종목의 현재가격을 평균 단가에 입력해줌.
     * @param e
     */
    const onCurrentPriceCheckHandler = (e) => {
        const currentCheck = e.target.checked;
        if (currentCheck === false) {
            setAveragePrice('');
            setIsAveragePrice(false);
        } else {
            setAveragePrice(selectStock.currentPrice);
            setIsAveragePrice(true);
        }

    }

    /**
     * 수량 입력 시 이벤트
     * @param e
     */
    const onQuantityInputHandler = (e) => {
        const currentQuantity = e.currentTarget.value
        setQuantity(currentQuantity);
        if (currentQuantity === '') setIsQuantity(false);
        else setIsQuantity(true);
    }

    /**
     * 평균단가 입력 시 이벤트
     * @param e
     */
    const onAveragePriceInputHandler = (e) => {
        let currentAveragePrice = e.currentTarget.value
        currentAveragePrice = currentAveragePrice.replace(/(\.\d{2})\d+/g, '$1');
        setAveragePrice(currentAveragePrice);
        if (currentAveragePrice === '') setIsAveragePrice(false);
        else setIsAveragePrice(true);
    }

    /**
     * 종목 검색 시 종목 데이터 렌더링 로직
     * @param props
     * @returns {JSX.Element}
     */
    function renderRow(props) {
        const {data, index, style} = props;

        return (
            <ListItem style={style} key={index}>
                <ListItemButton onClick={(e) => {
                    onListClickHandler(e, data[index])
                }}>
                    <ListItemText primary={data[index].stockName} sx={{textAlign: 'center'}}/>
                </ListItemButton>
            </ListItem>
        );
    }

    /**
     * StockTradeModal 에서 종목을 검색하는 화면
     * @returns {JSX.Element}
     */
    const searchModalBody = () => {
        return (
            <DialogContent>
                <TextField autoFocus label="종목명을 검색하세요."
                           type="text" fullWidth variant="standard"
                           onChange={onSearchHandler}
                           sx={{mb: 3}}
                />
                <FixedSizeList
                    height={300}
                    width={'100%'}
                    itemSize={40}
                    itemCount={searchArray.length}
                    itemData={searchArray}
                >
                    {renderRow}
                </FixedSizeList>
            </DialogContent>
        )
    }

    /**
     * StockTradeModal 에서 종목 매수, 매도 하는 화면
     * @returns {JSX.Element}
     */
    const tradeModalBody = () => {
        return (
            <DialogContent>
                <Typography variant="h7">{selectStock.stockName}</Typography>
                <TextField autoFocus label="수량" type="number" fullWidth variant="standard"
                           value={quantity}
                           onChange={onQuantityInputHandler}
                           sx={{mb: 3, mt: 3}}
                />
                <TextField label="평균단가" type="number" fullWidth variant="standard"
                           value={averagePrice}
                           onChange={onAveragePriceInputHandler}
                           sx={{mb: 3}}
                />
                <FormControlLabel
                    sx={{width: '100%', mb: 5}}
                    control={<Checkbox value="remember" color="primary"/>}
                    label="현재가격 적용하기" onChange={onCurrentPriceCheckHandler}
                />
                <Button variant="outlined" id="input" size="medium" sx={{width: '50%'}}
                        onClick={onBackBtnClickHandler}>뒤로가기</Button>
                <Button variant="outlined" id="output" size="medium" sx={{width: '50%'}}
                        disabled={!(isAveragePrice && isQuantity)}
                        onClick={onStockTradeHandler}>{getMsg(stockTradeType)}</Button>
            </DialogContent>
        )
    }

    return (
        <Dialog open={show} onClose={onHideHandler} fullWidth sx={{zIndex: 150}}>
            <DialogTitle>{getMsg(stockTradeType)}</DialogTitle>
            {isStockModal ? searchModalBody() : tradeModalBody()}
        </Dialog>
    )
}

export default StockTradeModal