import 'styles/Sign.scss'
import {useEffect, useState} from "react";
import {axiosCall, customAlert} from "utils/commonUtil";
import {useDispatch} from "react-redux";
import {setUserInfo} from "modules/userInfo";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Container,
    Typography,
    TextField,
    Button, FormControlLabel, Checkbox, Grid
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {setCoinData} from "modules/coinData";
import axios from "axios";

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const [isSave, setIsSave] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['saveId']);
    const cookieMaxAge = 2 * 60 * 60 * 1000;

    /**
     * 쿠키에 아이디가 저장되어 있으면 입력 해주는 로직
     */
    useEffect(() => {
        if (cookies.saveId) {
            setId(cookies.saveId);
            setIsSave(true);
            setIsId(true);
        }
    }, [cookies.saveId]);

    /**
     * ID 입력 시 이벤트
     * @param e
     */
    const onIdHandler = (e) => {
        const currentId = e.currentTarget.value;
        setId(currentId);
        if (currentId === '') setIsId(false);
        else setIsId(true);
    }

    /**
     * ID 저장하기 체크 이벤트
     * @param e
     */
    const onIdSaveHandler = (e) => {
        const currentCheck = e.target.checked;
        setIsSave(currentCheck);
        if (currentCheck) {
            setCookie('saveId', id, {maxAge: cookieMaxAge});
        } else {
            removeCookie('saveId');
        }
    }

    /**
     * PW 입력 이벤트
     * @param e
     */
    const onPwHandler = (e) => {
        const currentPw = e.currentTarget.value;
        setPw(currentPw);
        if (currentPw === '') setIsPw(false);
        else setIsPw(true);
    }

    /**
     * 로그인 버튼 클릭시 이벤트
     * @param e
     */
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const signInData = {
            _id     : id,
            password: pw
        }
        if (isSave) setCookie('saveId', id, {maxAge: cookieMaxAge});

        const exchangeRate = await getExchangeRate();

        const coinData = await getCoinData();
        dispatch(setCoinData(coinData.data.data));

        axiosCall.post('auth/login', signInData, async function (returnData) {
            dispatch(setUserInfo(returnData));
            localStorage.setItem('token', returnData.token);
            localStorage.setItem('exchangeRate', exchangeRate.data[0].basePrice);
            navigate('/');
        })
    }

    /**
     * 주식, 코인의 데이터를 가져와 사용하는 값만 새로운 배열로 꺼내서 store 에 저장하는 로직
     * @returns {Promise<*[]>}
     */
    const getCoinData = async () => {
        try {
            return await axiosCall.promiseGet('/crypto/find/allinfo');
        } catch (e) {
            customAlert({
                icon : 'error',
                title: 'Oops...',
                text : e
            });
            throw e;
        }
    }

    /**
     * 환율 정보 가져오는 로직
     * @returns {Promise<any>}
     */
    const getExchangeRate = async () => {
        try {
            return await axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD');
        } catch (e) {
            customAlert({
                icon : 'error',
                title: 'Oops...',
                text : e
            });
            throw e;
        }

    }

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop    : 8,
                    display      : 'flex',
                    flexDirection: 'column',
                    alignItems   : 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}} onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                id="id"
                                label="ID"
                                name="id"
                                autoComplete="off"
                                onChange={onIdHandler}
                                value={id}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={onPwHandler}
                                value={pw}
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="아이디 저장하기" checked={isSave} onChange={onIdSaveHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!(isId && isPw)}
                    >
                        로그인
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn;