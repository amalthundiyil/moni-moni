import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "../../common/Button/index";
import { SignupSection as LoginSection } from "../Signup/styles";
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from "./validator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
    };
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData,
    });
  };

  validateLoginForm = (e) => {
    let errors = {};
    const { formData } = this.state;

    if (isEmpty(formData.email)) {
      errors.email = "Email can't be blank";
    } else if (!isEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (isEmpty(formData.password)) {
      errors.password = "Password can't be blank";
    } else if (isContainWhiteSpace(formData.password)) {
      errors.password = "Password should not contain white spaces";
    } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
      errors.password = "Password's length must between 6 to 16";
    }

    if (isEmpty(errors)) {
      return true;
    } else {
      return errors;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let errors = this.validateLoginForm(e);

    if (errors === true) {
      alert("You are successfully signed in...");
      window.location.reload();
    } else {
      this.setState({
        errors: errors,
        formSubmitted: true,
      });
    }
  };

  render() {
    const { errors, formSubmitted } = this.state;
    return (
      <>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <LoginSection>
            <Form.Group
              controlId="email"
              validationState={
                formSubmitted ? (errors.email ? "error" : "success") : null
              }
            >
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={this.handleChange}
              />
              {errors.email && <Alert>{errors.email}</Alert>}
            </Form.Group>
            <Form.Group
              controlId="password"
              validationState={
                formSubmitted ? (errors.password ? "error" : "success") : null
              }
            >
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
              />
              {errors.password && <Alert>{errors.password}</Alert>}
            </Form.Group>
            <Button type="submit">Login</Button>
          </LoginSection>
        </Form>
      </>
    );
  }
}

export default Login;
