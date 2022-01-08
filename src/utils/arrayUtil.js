/**
 * 포트폴리오에서 사용하는 데이터를 계산해주는 로직
 * @param portData
 * @param apiData
 * @returns {{totalSum: number, totalProfit: number, purchasePrice: number, totalEarningsRate: string}}
 */
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
    return stockArray;
}

/**
 * 해당 포트폴리오에서 유동적이지 않은 자산의 리스트의 데이터를
 * 사용하기 좋게 가공해서 리턴함.
 * (청약, 적금, 부동산 등의 자산)
 * @param portData
 */
export const getNonCurrentArray = (portData) => {

}