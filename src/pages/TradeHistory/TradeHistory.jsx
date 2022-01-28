import {useEffect, useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {useDispatch, useSelector} from "react-redux";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {DataGrid} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {getHistoryData} from "utils/arrayUtil";
import {Container} from "@mui/material";

/**
 * 검색 툴바에 대한 내역
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const QuickSearchToolbar = (props) => {
    return (
        <Box sx={{
            p             : 0.5,
            pb            : 0,
            justifyContent: 'flex-end',
            display       : 'flex',
        }}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small"/>,
                    endAdornment  : (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{visibility: props.value ? 'visible' : 'hidden'}}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );
}

const TradeHistory = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.userInfo.userInfo);

    const [history, setHistory] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [gridList, setGridList] = useState([]);

    useEffect(() => {
        axiosCall.get('history/find/data', {userId: userInfo._id}, function (returnData) {
            const historyData = getHistoryData(returnData);
            setHistory(historyData);
            setGridList(historyData);
        })
    }, [dispatch, userInfo._id])

    /**
     * 검색 시 이벤트
     * @param searchValue
     */
    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const filteredRows = history.filter(row => row.stockName.includes(searchValue));
        setGridList(filteredRows);
    };

    const historyColumns = [
        {field: "regdt", headerName: "체결 시간", type: 'date', width: 200},
        {field: "portFolioName", headerName: "포트폴리오명", width: 200},
        {field: "stockName", headerName: "종목명", width: 200},
        {field: "type", headerName: "종류", width: 150},
        {field: "stockAmount", headerName: "거래 수량", type: 'number', width: 150},
        {field: "stockPrice", headerName: "거래 금액", type: 'number', width: 200},
    ]
    return (
        <Container>
            <Box sx={{height: 800, width: '100%'}}>
                <DataGrid
                    components={{Toolbar: QuickSearchToolbar}}
                    rows={gridList}
                    columns={historyColumns}
                    componentsProps={{
                        toolbar: {
                            value      : searchText,
                            onChange   : (e) => requestSearch(e.target.value),
                            clearSearch: () => requestSearch(''),
                        },
                    }}
                />
            </Box>
        </Container>
    )
}

export default TradeHistory;