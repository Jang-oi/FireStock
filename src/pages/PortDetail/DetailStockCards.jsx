import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Menu,
    MenuItem, TextField,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {getMsg, makeUrlParameter} from "utils/stringUtil";
import React, {useState} from "react";
import {axiosCall, customAlert} from "utils/commonUtil";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const DetailStockCards = ({detailData, isStockUpdate}) => {

    const portFolioName = useParams().id;
    const userInfo = useSelector(store => store.userInfo.userInfo);

    const [cardMenuItem, setCardMenuItem] = useState(null);
    const [selectStock, setSelectStock] = useState({stockPrice : 0});
    const open = Boolean(cardMenuItem);

    const [isModalShow, setIsModalShow] = useState(false);

    const [stockAmount, setStockAmount] = useState('')
    const [stockPrice, setStockPrice] = useState('');

    const [isStockAmount, setIsStockAmount] = useState(false);
    const [isStockPrice, setIsStockPrice] = useState(false);

    /**
     * 카드에서 메뉴 아이콘 클릭 시 이벤트
     * @param e
     * @param value
     */
    const onCardMenuClickHandler = (e, value) => {
        setCardMenuItem(e.currentTarget);
        setSelectStock(value);
    };

    /**
     * 편집 창이 닫혀야 하는 경우의 로직
     */
    const onCardEditCloseHandler = () => {
        setCardMenuItem(null);
    };

    /**
     * 메뉴 아이콘 -> 편집, 삭제 클릭 시 이벤트
     * @param e
     */
    const onCardEditHandler = (e) => {
        const stockTradeType = e.target.id;
        if (stockTradeType === 'delete') {
            customAlert({
                icon             : 'question',
                title            : `${selectStock.stockName}
                                    삭제 하시겠습니까?`,
                showCancelButton : true,
                confirmButtonText: 'OK',
                cancelButtonText : 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    onStockTradeHandler(stockTradeType);
                }
            });
        } else setIsModalShow(true);
    };

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     */
    const onHideHandler = () => {
        setIsModalShow(false);
        stockEditInit();
    }

    /**
     * 종목 편집 시 입력값 초기화
     */
    const stockEditInit = () => {
        setStockAmount('');
        setStockPrice('');
        setIsStockAmount(false);
        setIsStockPrice(false);
    }

    /**
     * 종목 편집, 삭제에 대한 이벤트
     * @param stockTradeType
     * @param stockPrice
     * @param stockAmount
     */
    const onStockTradeHandler = (stockTradeType, stockPrice, stockAmount) => {
        const params = {
            userId       : userInfo._id,
            method       : stockTradeType,
            portFolioName: portFolioName
        }
        const url = makeUrlParameter('portfolio/input/stock', params);
        const stockTradeData = {
            stockInfo  : selectStock.stockInfo,
            stockName  : selectStock.stockName,
            stockType  : selectStock.stockType,
            stockPrice : stockPrice | 0,
            stockAmount: stockAmount | 0
        }
        axiosCall.post(url, stockTradeData, function () {
            isStockUpdate();
            onHideHandler();
        })
    }

    /**
     * 종목 편집 -> 구매가 입력 시 이벤트
     * @param e
     */
    const onStockPriceHandler = (e) => {
        let currentStockPrice = e.currentTarget.value
        currentStockPrice = currentStockPrice.replace(/(\.\d{2})\d+/g, '$1');
        setStockPrice(currentStockPrice);
        if (currentStockPrice === '') setIsStockPrice(false);
        else setIsStockPrice(true);
    }

    /**
     * 종목 편집 -> 보유 수량 입력 시 이벤트
     * @param e
     */
    const onStockAmountHandler = (e) => {
        let currentAmountPrice = e.currentTarget.value
        currentAmountPrice = currentAmountPrice.replace(/(\.\d{2})\d+/g, '$1');
        setStockAmount(currentAmountPrice);
        if (currentAmountPrice === '') setIsStockAmount(false);
        else setIsStockAmount(true);
    }

    /**
     * 종목 편집 시 이벤트
     */
    const onStockEditHandler = () => {
        onStockTradeHandler('update', stockPrice, stockAmount);
    }

    return (
        <Grid container direction="column">
            <Dialog open={isModalShow} onClose={onHideHandler} fullWidth sx={{zIndex: 150}}>
                <DialogTitle>{selectStock.stockName} 편집하기</DialogTitle>
                <DialogContent>
                    <Typography
                        sx={{fontSize: 14}}
                        color="text.secondary" gutterBottom>
                        {
                            `현재 보유 수량 : ${selectStock.stockAmount} 
                        현재 구매가 : ${selectStock.stockType === 'overseas' ? '$' + selectStock.stockPrice.toLocaleString() : '₩' + selectStock.stockPrice.toLocaleString()}`
                        }
                    </Typography>
                    <TextField autoFocus label="보유 수량을 입력해주세요." type="number" fullWidth variant="standard"
                               autoComplete="off"
                               value={stockAmount}
                               onChange={onStockAmountHandler}
                               sx={{mb: 3}}
                    />
                    <TextField label="구매가를 입력해주세요." type="number" fullWidth variant="standard"
                               autoComplete="off"
                               value={stockPrice}
                               onChange={onStockPriceHandler}
                               sx={{mb: 3}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onStockEditHandler} disabled={!(isStockAmount && isStockPrice)}>편집</Button>
                    <Button onClick={onHideHandler}>취소</Button>
                </DialogActions>
            </Dialog>
            <Menu id="fade-menu2" anchorEl={cardMenuItem} open={open} onClose={onCardEditCloseHandler}>
                <MenuItem id="update" onClick={(e) => {
                    onCardEditHandler(e);
                    onCardEditCloseHandler();
                }}>편집</MenuItem>
                <MenuItem id="delete" onClick={(e) => {
                    onCardEditHandler(e);
                    onCardEditCloseHandler();
                }}>삭제</MenuItem>
            </Menu>
            {detailData.map((value, index) => (
                <Card key={index} sx={{mt: 1}}>
                    <CardContent>
                        <Typography
                            sx={{fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                            color="text.secondary" gutterBottom>
                            {getMsg(value.stockType)}
                            <IconButton id="fade-button2" onClick={(e) => {
                                onCardMenuClickHandler(e, value)
                            }}>
                                <MoreVertIcon/>
                            </IconButton>
                        </Typography>
                        <Typography variant="h5" component="div">
                            {value.stockName}
                        </Typography>
                        <Typography variant="body2" sx={{mt: 2}}>
                            평가 손익 {value.totalProfit.toLocaleString('ko-KR')}원
                            수익률 {value.totalEarningsRate}<br/>
                            보유 수량 {value.stockAmount.toLocaleString('ko-KR')}개<br/>
                            구매가 {value.stockPrice.toLocaleString('ko-KR')}원<br/>
                            평가 금액 {value.totalSum.toLocaleString('ko-KR')}원<br/>
                            매수 금액 {value.purchasePrice.toLocaleString('ko-KR')}원
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    )
}

export default DetailStockCards