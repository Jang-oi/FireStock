import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Container, Grid, Tab, Tabs} from "@mui/material";
import {TabContext, TabPanel} from "@mui/lab";
import {getMsg} from "../../utils/stringUtil";
import DirectLoginModal from "./DirectLoginModal";

const Manage = () => {

    const userInfo = useSelector(store => store.userInfo.userInfo);
    const navigate = useNavigate();
    useEffect(() => {
        userInfo.roles !== 'ADMIN' && navigate('/404');
    }, [navigate, userInfo.roles])

    const [type, setType] = useState('stockSetting');
    const tabArray = ['stockSetting', 'directLogin'];

    const [isModalShow, setIsModalShow] = useState(false);

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


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TabContext value={type}>
                        <Tabs
                            value={type}
                            onChange={onTabSelectHandler}
                            variant="scrollable"
                            scrollButtons={'auto'}
                            aria-label="scrollable auto tabs example"
                        >
                            {tabArray.map((value, index) => {
                                return (
                                    <Tab key={index} label={getMsg(value)} value={value}/>
                                )
                            })}
                        </Tabs>
                        <TabPanel value={'stockSetting'} sx={{padding: 0}}>

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