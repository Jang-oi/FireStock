import {useNavigate} from "react-router-dom";
import 'styles/Sign.scss'
import {useState} from "react";
import {axiosCall} from "utils/commonUtil";
import {
    Avatar,
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [nameMsg, setNameMsg] = useState('');
    const [nickNameMsg, setNickNameMsg] = useState('');
    const [idMsg, setIdMsg] = useState('');
    const [pwMsg, setPwMsg] = useState('');

    const [isName, setIsName] = useState(false);
    const [isNickName, setIsNickName] = useState(false);
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const [isNameError, setIsNameError] = useState(false);
    const [isNickNameError, setIsNickNameError] = useState(false);
    const [isIdError, setIsIdError] = useState(false);
    const [isPwError, setIsPwError] = useState(false);


    /**
     * 이름 입력 시 이벤트
     * 이름 입력 시 유효성 검사 진행
     * @param e
     */
    const onNameHandler = (e) => {
        const nameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ가-힣]{2,6}$/
        const currentName = e.currentTarget.value;
        setName(currentName);

        if (!nameRegex.test(currentName)) {
            setNameMsg('이름은 2~6글자의 한글로만 입력해주세요.');
            setIsName(false);
            setIsNameError(true);
        } else {
            setNameMsg('올바른 형식입니다. ');
            setIsName(true);
            setIsNameError(false);
        }
    }

    /**
     * 닉네임 입력 시 이벤트
     * 닉네임 입력 시 유효성 검사 진행
     * @param e
     */
    const onNickNameHandler = (e) => {
        const currentNickName = e.currentTarget.value;
        setNickName(currentNickName);

        if (!currentNickName) {
            setNickNameMsg('닉네임을 입력해주세요');
            setIsNickName(false);
            setIsNickNameError(true);
        } else {
            setNickNameMsg('올바른 형식입니다. ');
            setIsNickName(true);
            setIsNickNameError(false);
        }
    }

    /**
     * ID 입력 시 이벤트
     * ID 입력 시 중복확인, 유효성 검사 진행
     * @param e
     */
    const onIdHandler = (e) => {
        const idRegex = /^[a-zA-Z0-9]{4,12}$/
        const currentId = e.currentTarget.value;
        setId(currentId);

        if (!idRegex.test(currentId)) {
            setIdMsg('ID는 4~12글자의 영문 숫자로만 입력해주세요.');
            setIsId(false);
            setIsIdError(true);
        } else {
            setIdMsg('올바른 형식입니다. ');
            setIsId(true);
            setIsIdError(false);
        }
    }

    /**
     * PW 입력 시 이벤트
     * PW 입력 시 유효성 검사
     * @param e
     */
    const onPwHandler = (e) => {
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const currentPw = e.currentTarget.value
        setPw(currentPw);
        if (!pwRegex.test(currentPw)) {
            setPwMsg('숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.');
            setIsPw(false);
            setIsPwError(true);
        } else {
            setPwMsg('올바른 형식입니다. ');
            setIsPw(true);
            setIsPwError(false);
        }
    }

    /**
     * 회원가입 버튼 클릭 시 이벤트
     * @param e
     */
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const signUpData = {
            name    : name,
            _id     : id,
            password: pw
        }
        axiosCall.post('auth/join', signUpData, function () {
            navigate('/sign-in');
        })
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
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}} onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={isNameError}
                                variant="standard"
                                fullWidth
                                autoFocus
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="off"
                                onChange={onNameHandler}
                                value={name}
                                helperText={nameMsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={isNickNameError}
                                variant="standard"
                                fullWidth
                                id="nickName"
                                label="NickName"
                                name="nickName"
                                autoComplete="off"
                                onChange={onNickNameHandler}
                                value={nickName}
                                helperText={nickNameMsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={isIdError}
                                variant="standard"
                                fullWidth
                                id="id"
                                label="ID"
                                name="id"
                                autoComplete="off"
                                onChange={onIdHandler}
                                value={id}
                                helperText={idMsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={isPwError}
                                variant="standard"
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                onChange={onPwHandler}
                                value={pw}
                                helperText={pwMsg}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={!(isId && isPw && isName && isNickName)}
                    >
                        회원가입
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SignUp;