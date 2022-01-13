import {useNavigate} from "react-router-dom";
import {customAlert} from "utils/commonUtil";
import {useDispatch} from "react-redux";
import {initUserInfo} from "modules/userInfo";
import {Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Fragment, useState} from "react";

const Menubar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isToken = localStorage.getItem('token')

    const [menuItem, setMenuItem] = useState(null);
    const open = Boolean(menuItem);

    /**
     * 메뉴 클릭 시 이벤트
     * @param e
     */
    const onMenuClickHandler = (e) => {
        setMenuItem(e.currentTarget);
    };

    /**
     * 메뉴가 닫혀야 하는 경우의 로직
     */
    const onMenuCloseHandler = () => {
        setMenuItem(null);
    };


    /**
     * 로그아웃 클릭 시 이벤트
     */
    const onLogOutHandler = () => {
        onMenuCloseHandler();
        customAlert({
            icon             : 'warning',
            title            : '로그아웃 하시겠습니까?',
            showCancelButton : true,
            confirmButtonText: '확인',
            cancelButtonText : '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                dispatch(initUserInfo());
                navigate('/sign-in');
            }
        })
    }

    /**
     * 로그인 여부를 통해 조회되는 메뉴 리턴
     * @returns {JSX.Element}
     */
    const getMenuElement = () => {
        return isToken ?
            <Fragment>
                <Button>PORTFOLIOS</Button>
                <Button id="fade-button" onClick={onMenuClickHandler}>MY PAGE</Button>
                <Menu
                    id="fade-menu"
                    anchorEl={menuItem}
                    open={open}
                    onClose={onMenuCloseHandler}
                >
                    <MenuItem onClick={() => {
                        navigate('/my-page')
                        onMenuCloseHandler();
                    }}>Account</MenuItem>
                    <MenuItem onClick={() => {
                        navigate('/trade-history')
                        onMenuCloseHandler();
                    }}>History</MenuItem>
                    <MenuItem onClick={onLogOutHandler}>Logout</MenuItem>
                </Menu>
            </Fragment>
            :
            <Fragment>
                <Button onClick={() => {
                    navigate('/sign-in')
                    onMenuCloseHandler();
                }}>SIGN-IN</Button>
                <Button onClick={() => {
                    navigate('/sign-up')
                    onMenuCloseHandler();
                }}>SIGN-UP</Button>
            </Fragment>

    }
    return (
        <div className="main-Container">
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Button>Fire Stock</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                </Typography>
                {getMenuElement()}
            </Toolbar>
        </div>
    )
}
export default Menubar