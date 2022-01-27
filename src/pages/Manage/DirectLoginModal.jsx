import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import {getMsg} from "../../utils/stringUtil";
import {FixedSizeList} from "react-window";
import {axiosCall, customAlert} from "../../utils/commonUtil";
import {useNavigate} from "react-router-dom";

const DirectLoginModal = ({show, changeState}) => {

    // TODO useEffect 로 최초에 전체 계정 검색해서 state로
    const defaultArray = [
        {name : 'test1'},
        {name : 'test2'},
        {name : 'test3'},
        {name : 'test4'}
    ]

    const [searchArray, setSearchArray] = useState(defaultArray);


    /**
     * 계정 검색 시 이벤트
     * @param e
     */
    const onSearchHandler = (e) => {
        const searchValue = e.currentTarget.value;
        let searchArray;
        // TODO 계정 검색
    }

    /**
     * 계정 검색 시 계정 데이터 렌더링 로직
     * @param props
     * @returns {JSX.Element}
     */
    function renderRow(props) {
        const {data, index, style} = props;

        return (
            <ListItem style={style} key={index}>
                <ListItemButton onClick={(e) => {onListClickHandler(e, data[index])}}>
                    <ListItemText primary={data[index].name} sx={{textAlign: 'center'}}/>
                </ListItemButton>
            </ListItem>
        );
    }

    /**
     * 계정 검색 후 계정 클릭 시 이벤트
     * @param e
     * @param value
     */
    const onListClickHandler = (e, value) => {
        customAlert({
            icon             : 'question',
            title            : `${value.name} 계정으로 
                                로그인 하시겠습니까?`,
            showCancelButton : true,
            confirmButtonText: 'OK',
            cancelButtonText : 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const params = {};
                window.close();
                window.opener.location.replace("/");
            }
        });
    }

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     * changeState() 로 부모 컴포넌트의 값을 변경함.
     */
    const onHideHandler = () => {
        changeState();
    }

    return (
        <Dialog open={show} onClose={onHideHandler} fullWidth sx={{zIndex: 150}}>
            <DialogTitle>{getMsg('directLogin')}</DialogTitle>
            <DialogContent>
                <TextField autoFocus label="사용자명 검색하세요."
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
        </Dialog>
    )
}

export default DirectLoginModal;