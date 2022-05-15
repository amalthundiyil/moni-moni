import { Button } from "../../common/Button/index";
import { LoginSection } from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import { FormGroup } from "../../components/ContactForm/styles";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .max(100, "Email too long")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .min(5, "Password is too short"),
});

const Login = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/auth/login/`,
        values
      );
      if (response.message === "success") {
        resetForm();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setSubmitting(false);
  };
  return (
    <>
      <LoginSection>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <FormGroup onSubmit={handleSubmit}>
              <LoginSection>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "error" : null}
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                    touched.password && errors.password ? "error" : null
                  }
                />
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </LoginSection>
            </FormGroup>
          )}
        </Formik>
        <Link to="/signup" style={{ fontSize: "0.8rem" }}>
          Don't have an account? Create one here.
        </Link>
      </LoginSection>
    </>
  );
};

export default Login;
