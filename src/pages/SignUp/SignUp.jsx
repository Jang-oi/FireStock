import {useNavigate} from "react-router-dom";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import './SignUp.scss'

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="main-Container">
            <div className="inner-Container">
                <Form className={"form-Container"}>
                    <FloatingLabel controlId="registerId" label="아이디를 입력해주세요." className="mb-3">
                        <Form.Control type="text" placeholder="id"/>
                        <Form.Text>a</Form.Text>
                    </FloatingLabel>
                    <FloatingLabel controlId="registerPassword" label="비밀번호를 입력해주세요." className="mb-3">
                        <Form.Control type="password" placeholder="password"/>
                        <Form.Text>a</Form.Text>
                    </FloatingLabel>
                    <FloatingLabel controlId="registerPassword2" label="비밀번호를 동일하게 입력해주세요." className="mb-3">
                        <Form.Control type="password" placeholder="password2"/>
                        <Form.Text>a</Form.Text>
                    </FloatingLabel>
                    <Button className="signUp-Form-Btn" variant="primary" type="submit" >
                        회원가입
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignUp;