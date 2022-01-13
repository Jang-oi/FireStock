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

const TradeHistory = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.userInfo.userInfo);

    const [history, setHistory] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axiosCall.get('history/find/data', {userId: userInfo._id}, function (returnData) {
            const historyData = getHistoryData(returnData);
            setHistory(historyData);
        })
    }, [dispatch, userInfo._id])

    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function QuickSearchToolbar() {
        return (
            <Box sx={{
                p             : 0.5,
                pb            : 0,
                justifyContent: 'flex-end',
                display       : 'flex',
            }}>
                <TextField
                    variant="standard"
                    value={searchText}
                    onChange={requestSearch}
                    placeholder="Search…"
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small"/>,
                        endAdornment  : (
                            <IconButton
                                title="Clear"
                                aria-label="Clear"
                                size="small"
                                style={{visibility: searchText ? 'visible' : 'hidden'}}
                            >
                                <ClearIcon fontSize="small"/>
                            </IconButton>
                        ),
                    }}
                />
            </Box>
        );
    }

    const requestSearch = (e) => {
        const currentSearchValue = e.currentTarget.value;
        setSearchText(currentSearchValue);
        /*        const searchRegex = new RegExp(escapeRegExp(currentSearchValue), 'i');
                const filteredRows = history.filter((row) => {
                    return Object.keys(row).some((field) => {
                        return searchRegex.test(row[field].toString());
                    });
                });
                setHistory(filteredRows);*/
    };

    const historyColumns = [
        {
            field     : "regdt",
            headerName: "체결 시간",
            type      : 'date',
            width     : 180
        },
        {
            field     : "stockName",
            headerName: "종목명",
            width     : 180
        },
        {
            field     : "type",
            headerName: "종류",
            width     : 180
        },
        {
            field     : "stockAmount",
            headerName: "거래 수량",
            type      : 'number',
            width     : 180
        },
        {
            field     : "stockPrice",
            headerName: "거래 금액",
            type      : 'number',
            width     : 180,
        },
    ]

    return (
        <div className="main-Container">
            <Box sx={{height: 800, width : '100%'}}>
                <DataGrid
                    components={{Toolbar: QuickSearchToolbar}}
                    rows={history}
                    columns={historyColumns}
                />
            </Box>
        </div>
    )
}

export default TradeHistory;