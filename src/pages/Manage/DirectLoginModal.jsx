import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import {getMsg} from "../../utils/stringUtil";
import {FixedSizeList} from "react-window";
import {axiosCall, customAlert} from "../../utils/commonUtil";
import {useNavigate} from "react-router-dom";

const DirectLoginModal = ({show, changeState}) => {

    const [userList, setUserList] = useState([]);
    const [searchArray, setSearchArray] = useState([]);


    useEffect(() => {
        axiosCall.get('manage/find/all/userlist','', function(returnData) {
            setUserList(returnData);
            setSearchArray(returnData);
        });
    }, [])

    /**
     * 계정 검색 시 이벤트
     * @param e
     */
    const onSearchHandler = (e) => {
        const searchValue = e.currentTarget.value;
        let searchArray;
        searchArray = userList.filter(data => data.includes(searchValue))
        if (searchValue === '') setSearchArray(userList);
        else setSearchArray(searchArray);
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
                <ListItemButton onClick={(e) => {
                    onListClickHandler(e, data[index])
                }}>
                    <ListItemText primary={data[index]} sx={{textAlign: 'center'}}/>
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
            title            : `${value} 계정으로 
                                로그인 하시겠습니까?`,
            showCancelButton : true,
            confirmButtonText: 'OK',
            cancelButtonText : 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO 다이렉트 로그인 API 확인
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