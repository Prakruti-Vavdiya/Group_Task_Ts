import React, { useState,FC } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import CustomInput from "../Components/customInput";
import { checkValidation } from "../helper";

const initailValue = {
  email: "",
  password: "",
};
const Login:FC = () => {
  const history=useHistory();
  const [formData, setFormData] = useState(initailValue);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = (): void => {
    const { email, password } = formData;
    const validationError = checkValidation(errors, {
      email,
      password,
    });
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
        window.localStorage.setItem('userId',email);
        history.push('/dashboard');
    }
  };

  const onChange = (name: string, value: string | boolean): void => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name: string, error: string): void => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const { email, password } = formData;
  return (
    <Container>
      <Row className='h-100vh align-items-center'>
        <Col xs={12} sm={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle tag='h4' className='text-primary'>
                Login
              </CardTitle>
              <CustomInput
                type={"email"}
                name='email'
                value={email}
                label='Email'
                placeholder={"Enter email"}
                isRequired={true}
                reqType={"email"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.email}
              />

              <CustomInput
                type={"password"}
                name='password'
                value={password}
                label='Password'
                placeholder={"Enter password"}
                isRequired={true}
                reqType={"password"}
                onChange={onChange}
                validationHandler={validationHandler}
                error={errors.password}
                helperText='Password must contain one capital latter, number and specical character with at least 8 character long.'
              />

              <Button color='primary' onClick={onSubmit}>
                Submit
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
