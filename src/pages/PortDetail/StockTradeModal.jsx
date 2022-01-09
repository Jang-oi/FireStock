import {Button, Modal, Form, FormControl, ListGroup, FloatingLabel} from "react-bootstrap";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getMsg, makeUrlParameter} from "utils/stringUtil";
import {axiosCall} from "utils/commonUtil";

const StockTradeModal = ({stockTradeType, show, changeState}) => {
    const portFolioName = useParams().id;

    const coinData = useSelector(store => store.coinData.coinData);
    const userInfo = useSelector(store => store.userInfo.userInfo);

    const defaultArray = [
        {stockName: '기타자산 - 부동산', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
        {stockName: '기타자산 - 금', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'},
        {stockName: '기타자산 - 청약', stockType: 'nonCurrent', currentPrice: 0, stockInfo: 'etc'}
    ]

    const [searchArray, setSearchArray] = useState(defaultArray);
    const [selectStock, setSelectStock] = useState({});

    const [averagePrice, setAveragePrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const [isQuantity, setIsQuantity] = useState(false);
    const [isAveragePrice, setIsAveragePrice] = useState(false);

    const [isStockModal, setIsStockModal] = useState(true);

    /**
     * stockTradeModal 설정 된 값 초기화
     */
    const stockTradeModalInit = () => {
        setIsStockModal(true);
        setSearchArray(defaultArray);
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
        let searchArray = [];
        for (let i = 0; i < coinData.length; i++) {
            if (coinData[i].stockName.includes(searchValue)) {
                searchArray.push(coinData[i]);
            }
        }
        if (searchValue === '') setSearchArray(defaultArray);
        else setSearchArray(searchArray);
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
        setTimeout(() => {
            document.getElementById("input-Search").focus();
        }, 10)
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
            setAveragePrice(selectStock.currentPrice.toLocaleString('ko-KR'));
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
        currentAveragePrice = currentAveragePrice.replace(/[^0-9]/g, '');
        setAveragePrice(Number(currentAveragePrice).toLocaleString('ko-KR'));
        if (currentAveragePrice === '') setIsAveragePrice(false);
        else setIsAveragePrice(true);
    }

    /**
     * StockTradeModal 에서 종목을 검색하는 화면
     * @returns {JSX.Element}
     */
    const searchModalBody = () => {
        return (
            <Modal.Body>
                <Form className="searchForm">
                    <FormControl
                        type="search"
                        placeholder="종목명을 검색해주세요."
                        className="me-2"
                        aria-label="Search"
                        id={"input-Search"}
                        onChange={onSearchHandler}
                        onKeyDown={event => {
                            if (event.key === 'Enter') event.preventDefault()
                        }}
                    />
                </Form>
                {searchArray.map((value, index) => {
                    return (
                        <ListGroup key={index}>
                            <ListGroup.Item onClick={(e) => {
                                onListClickHandler(e, value)
                            }}>{value.stockName}</ListGroup.Item>
                        </ListGroup>
                    )
                })}
            </Modal.Body>
        )
    }

    /**
     * StockTradeModal 에서 종목 매수, 매도 하는 화면
     * @returns {JSX.Element}
     */
    const tradeModalBody = () => {
        return (
            <Modal.Body>
                <Form className="searchForm">
                    <FloatingLabel controlId="property" label="자산" className="mb-3">
                        <Form.Control type="text" placeholder="property" disabled={true} value={selectStock.stockName}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="quantity" label="수량" className="mb-3">
                        <Form.Control type="number" placeholder="quantity" value={quantity}
                                      onChange={onQuantityInputHandler}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="averagePrice" label="평균단가" className="mb-3">
                        <Form.Control type="text" placeholder="averagePrice" value={averagePrice}
                                      onChange={onAveragePriceInputHandler}/>
                    </FloatingLabel>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="현재가격 적용하기" onChange={onCurrentPriceCheckHandler}/>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button onClick={onBackBtnClickHandler}>뒤로 가기</Button>
                    <Button
                        onClick={onStockTradeHandler}
                        disabled={!(isAveragePrice && isQuantity)}>{getMsg(stockTradeType)}</Button>
                </Modal.Footer>
            </Modal.Body>

        )
    }

    return (
        <Modal show={show} onHide={onHideHandler} centered contentClassName="portDetail-tradeModal">
            <Modal.Header closeButton>
                <Modal.Title>{getMsg(stockTradeType)}</Modal.Title>
            </Modal.Header>
            {isStockModal ? searchModalBody() : tradeModalBody()}
        </Modal>
    )
}

export default StockTradeModal