import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import 'styles/Sign.scss'

const SignIn = () => {
    return (
        <div className="main-Container">
            <div className="inner-Container">
                <Form className="form-Container">
                    <FloatingLabel controlId="signInId" label="아이디를 입력해주세요." className="mb-3">
                        <Form.Control type="text" placeholder="ID"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="signInPw" label="비밀번호를 입력해주세요." className="mb-3">
                        <Form.Control type="password" placeholder="password"/>
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="아이디 저장하기"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button className="signIn-Form-Btn" variant="primary" type="submit">
                        로그인
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn;