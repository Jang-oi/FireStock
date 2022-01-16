import React, {useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Select, MenuItem, InputLabel, FormControl
} from "@mui/material";

const PortModal = ({userInfo, show, changeState}) => {

    const [portName, setPortName] = useState('')
    const [account, setAccount] = useState('');

    const [isPortName, setIsPortName] = useState(false);
    const [isAccountChk, setIsAccountChk] = useState(false);

    const [portType, setPortType] = useState('');

    /**
     * portModal 설정 된 값 초기화
     */
    const portModalInit = () => {
        setPortName('')
        setPortType('')
        setAccount('')
        setIsPortName(false);
        setIsAccountChk(false);
    }
    /**
     * 계좌 선택시 이벤트
     * @param e
     */
    const onAccountHandler = (e) => {
        const currentAccount = e.target.value;
        setPortType(currentAccount);
        setAccount(currentAccount);
        if (currentAccount === '') setIsAccountChk(false);
        else setIsAccountChk(true);
    }
    /**
     * 포트폴리오 이름 입력 시 이벤트
     * @param e
     */
    const onPortNameHandler = (e) => {
        const currentName = e.currentTarget.value
        setPortName(currentName);
        if (currentName === '') setIsPortName(false)
        else setIsPortName(true);
    }

    /**
     * 모달창이 닫히거나 취소 버튼 클릭시 이벤트
     * changeState() 로 부모 컴포넌트의 값을 변경함.
     */
    const onHideHandler = () => {
        changeState();
        portModalInit();
    }


    /**
     * 추가하기 버튼 클릭 시 이벤트
     */
    const onAddPortHandler = () => {
        const params = {
            userId       : userInfo._id,
            portFolioName: portName,
            portFolioType: portType,
        }
        axiosCall.get('/portfolio/input/folioname', params, function () {
            changeState();
            portModalInit();
        })
    }
    return (
        <Dialog open={show} onClose={onHideHandler} fullWidth sx={{zIndex:150}}>
            <DialogTitle>포트폴리오 추가하기</DialogTitle>
            <DialogContent>
                <TextField autoFocus label="포트폴리오 이름을 입력해주세요." type="text" fullWidth variant="standard"
                           value={portName}
                           onChange={onPortNameHandler}
                           sx={{mb: 3}}
                />
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">계좌 선택</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={account}
                        onChange={onAccountHandler}
                        label="계좌 선택"
                    >
                        <MenuItem value={'일반'}>일반 계좌</MenuItem>
                        <MenuItem value={'기타'}>그 외(예적금, 부동산, 청약 등)</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onAddPortHandler} disabled={!(isPortName && isAccountChk)}>추가</Button>
                <Button onClick={onHideHandler}>취소</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PortModal;

