import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Tab, Tabs} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";
import {getMsg} from "../../utils/stringUtil";
import DirectLoginModal from "./DirectLoginModal";
import {DataGrid} from "@mui/x-data-grid";

const Manage = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const navigate = useNavigate();
    useEffect(() => {
        userInfo.roles !== 'ADMIN' && navigate('/404');
    }, [navigate, userInfo.roles])

    const [type, setType] = useState('stockSetting');
    const tabArray = ['stockSetting', 'directLogin'];

    const [isModalShow, setIsModalShow] = useState(false);

    const [selectStockData, setSelectStockData] = useState([]);

    /**
     * 메뉴 탭 클릭 시 이벤트
     * @param e
     * @param newValue
     */
    const onTabSelectHandler = (e, newValue) => {
        setType(newValue);
        newValue === 'directLogin' && setIsModalShow(true);
    }

    /**
     * Modal 창이 닫힐 때 이벤트
     */
    const onChangeHandler = () => {
        setIsModalShow(false);
        setType('stockSetting');
    }

    const stockColumns = [
        {field: "stockType", headerName: "국내 / 해외", width: 200},
        {field: "stockName", headerName: "종목 명", width: 200},
        {field: "stockTicker", headerName: "종목 티커", width: 200},

        {
            field: "stockEdit", headerName: "종목 편집", width: 150, renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{marginLeft: 16}}
                >
                    {params.id}
                    Edit
                </Button>
            ),
        }
    ]

    console.log(selectStockData);
    const rows = [
        {id: 1, stockType: '국내', stockName: '삼성전자', stockTicker: '005930.XKRX'},
        {id: 2, stockType: '국내', stockName: '드림어스컴퍼니', stockTicker: '060570.XKRX'},
        {id: 3, stockType: '국내', stockName: '한미반도체', stockTicker: '042700.XKRX'},
        {id: 4, stockType: '국내', stockName: 'SK하이닉스', stockTicker: '000660.XKRX'},
        {id: 5, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 6, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 7, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 8, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 9, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 10, stockType: '국내', stockName: '현대차', stockTicker: '005380.XKRX'},
        {id: 21, stockType: '해외', stockName: '마이크로소프트', stockTicker: 'MSFT'},
        {id: 22, stockType: '해외', stockName: '애플', stockTicker: 'AAPL'},
        {id: 23, stockType: '해외', stockName: '아마존', stockTicker: 'AMZN'},
        {id: 24, stockType: '해외', stockName: '메타플랫폼', stockTicker: 'FB'},
        {id: 25, stockType: '해외', stockName: '비자', stockTicker: 'V'},
        {id: 26, stockType: '해외', stockName: '비자', stockTicker: 'V'},
        {id: 27, stockType: '해외', stockName: '비자', stockTicker: 'V'},
        {id: 28, stockType: '해외', stockName: '비자', stockTicker: 'V'},
        {id: 29, stockType: '해외', stockName: '비자', stockTicker: 'V'},
        {id: 30, stockType: '해외', stockName: '비자', stockTicker: 'V'},
    ];

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TabContext value={type}>
                        <Tabs value={type} onChange={onTabSelectHandler} variant="scrollable" scrollButtons={'auto'}>
                            {tabArray.map((value, index) => {
                                return (
                                    <Tab key={index} label={getMsg(value)} value={value}/>
                                )
                            })}
                        </Tabs>
                        <TabPanel value={'stockSetting'} sx={{padding: 0}}>
                            <Box sx={{height: 650, width: '100%', mt:10}}>
                                <DataGrid
                                    rows={rows}
                                    columns={stockColumns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    checkboxSelection
                                    onSelectionModelChange={(ids) => {
                                        const selectedIDs = new Set(ids);
                                        const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
                                        setSelectStockData(selectedRowData);
                                    }}
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel value={'directLogin'} sx={{padding: 0}}/>
                    </TabContext>
                </Grid>
            </Grid>
            <DirectLoginModal show={isModalShow} changeState={onChangeHandler}/>
        </Container>
    )
}

export default Manage