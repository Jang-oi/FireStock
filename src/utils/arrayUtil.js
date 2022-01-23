/**
 * 포트폴리오에서 사용하는 데이터를 계산해주는 로직
 * @param portData
 * @param apiData
 * @returns {{totalSum: number, totalProfit: number, purchasePrice: number, totalEarningsRate: string}}
 */
import {getMsg} from "./stringUtil";

const getStockDataCalc = (portData, apiData) => {
    const purchasePrice = Number(portData.stockPrice) * Number(portData.stockAmount);
    const totalSum = Number(apiData.currentPrice) * Number(portData.stockAmount);
    const totalProfit = totalSum - purchasePrice;
    const totalEarningsRate = (totalProfit / purchasePrice).toLocaleString('ko-KR', {
        style                : "percent",
        minimumFractionDigits: 2
    });
    return {
        purchasePrice    : purchasePrice,
        totalSum         : totalSum,
        totalProfit      : totalProfit,
        totalEarningsRate: totalEarningsRate
    }
}

/**
 * 해당 포트폴리오의 있는 종목 리스트와
 * API(주식, 코인 등)의 종목 리스트를 가져와서
 * 종목을 업데이트 하여 배열로 리턴함.
 * @param portData
 * @param apiData
 * @returns {*[]}
 * stockType            종목 타입 ( 주식, 코인 등 )
 * stockInfo            종목 설명 ( 주식 티커 )
 * stockName            종목 이름
 * stockPrice           구매가    ( 평균 단가 )
 * stockAmount          총 수량   ( 보유 수량 )
 * currentPrice         현재 가격
 * purchasePrice        매수 금액 ( 구매가 X 총 수량 )
 * totalSum             평가 금액 ( 현재가격 X 총 수량 )
 * totalProfit          평가 손익 ( 평가 금액 - 매수 금액 )
 * totalEarningsRate    수익률    ( 평가손익 / 매수금액 )
 */
export const getStockArray = (portData, apiData) => {
    const stockArray = [];
    const nonCurrentArray = getNonCurrentArray(portData);
    for (let i = 0; i < portData.length; i++) {
        for (let j = 0; j < apiData.length; j++) {
            if (portData[i].stockName === apiData[j].stockName) {
                const stockData = getStockDataCalc(portData[i], apiData[j]);
                stockArray.push({
                    stockType        : portData[i].stockType,
                    stockInfo        : portData[i].stockInfo,
                    stockName        : portData[i].stockName,
                    stockPrice       : Number(portData[i].stockPrice),
                    stockAmount      : Number(portData[i].stockAmount),
                    currentPrice     : apiData[j].currentPrice,
                    purchasePrice    : stockData.purchasePrice,
                    totalSum         : stockData.totalSum,
                    totalProfit      : stockData.totalProfit,
                    totalEarningsRate: stockData.totalEarningsRate,
                })
            }
        }
    }
    return nonCurrentArray.concat(stockArray);
}

/**
 * 해당 포트폴리오에서 유동적이지 않은 자산의 리스트의 데이터를
 * 사용하기 좋게 가공해서 리턴함.
 * (청약, 적금, 부동산 등의 자산)
 * @param portData
 * @returns {*[]}
 */
export const getNonCurrentArray = (portData) => {
    const nonCurrentArray = [];
    for (let i = 0; i < portData.length; i++) {
        if (portData[i].stockType === 'nonCurrent') {
            const stockData = getStockDataCalc(portData[i], {currentPrice: Number(portData[i].stockPrice)});
            nonCurrentArray.push({
                stockType        : portData[i].stockType,
                stockInfo        : portData[i].stockInfo,
                stockName        : portData[i].stockName,
                stockPrice       : Number(portData[i].stockPrice),
                stockAmount      : Number(portData[i].stockAmount),
                currentPrice     : 0,
                purchasePrice    : stockData.purchasePrice,
                totalSum         : stockData.totalSum,
                totalProfit      : stockData.totalProfit,
                totalEarningsRate: stockData.totalEarningsRate,
            })
        }
    }
    return nonCurrentArray;
}

/**
 * key 에 해당하는 value 값을 전부 더해서 리턴함.
 * @param data array
 * @param key string
 * @returns {number}
 */
export const getSumValue = (data, key) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += Number(data[i][key]);
    }
    return sum;
}

/**
 * [{}, {]] 구조의 배열에서 Object 안에 있는
 * key 의 value 값을 배열로 리턴함.
 * @param data
 * @param key
 * @returns {*[]}
 */
export const getArrayKey = (data, key) => {
    return data.map(data => data[key]);
}

/**
 * Grid 에 Column 에 맞춰 데이터 세팅된 배열로 리턴함.
 * @param historyData
 * @returns {*[]}
 */
export const getHistoryData = (historyData) => {
    const newArray = [];
    for (let i = 0; i < historyData.length; i++) {
        newArray.push({
            id           : i,
            regdt        : historyData[i].regdt,
            stockName    : historyData[i].portFolioData.stockName,
            portFolioName: historyData[i].portFolioName,
            type         : getMsg(historyData[i].type),
            stockAmount  : Number(historyData[i].portFolioData.stockAmount),
            stockPrice   : historyData[i].portFolioData.stockAmount * historyData[i].portFolioData.stockPrice,
        })
    }
    return newArray;
}