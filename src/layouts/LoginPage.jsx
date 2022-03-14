import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import logo from "assets/img/logo.png";

export function LoginPage(props) {

    var [loading, setLoading] = React.useState(false);

    let login = () => {
        setLoading(true);
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        fetch(process.env.REACT_APP_SERVER + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res =>{
                if(res.status === 200){
                    return res.json();
                }else{
                    throw new Error("Login failed");
                }
            })
            .then(res => {
                if (res.success) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("username", email);
                    window.location.href = "/";
                } else {
                    alert(res.message);
                }
            })
            .catch(err => {
                alert(err.message);
            })
            .finally(() => {
                setLoading(false);
            });

    }

    return (
        <div style={{ padding: 20, display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Row style={{width: '100%'}}>
                <Col md={0} lg={4} />
                <Col md={12} lg={4}>
            <Card >
                <CardHeader style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img src={logo} alt="logo" style={{ width: '100px' }} />
                    <h1 className='mb-1 bold'>Eko Akcija</h1>
                    <p>Prijavite se pomoću Vašeg korisničkog naloga</p>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="email">
                                Korisničko ime
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Korisničko ime"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Lozinka
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Lozinka"
                                type="password"
                            />
                        </FormGroup>
                    </Form>
                </CardBody>
                <CardFooter>
                    <Button disabled={loading} color="success" block onClick={login}>Prijava</Button>
                </CardFooter>
            </Card>
                </Col>
                <Col md={0} lg={4} />

            </Row>
        </div>
    )

}