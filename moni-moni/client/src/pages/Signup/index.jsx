import { Button } from "../../common/Button/index";
import { SignupSection } from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "../../common/Input";
import { FormGroup } from "../../components/ContactForm/styles";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name too short.")
    .max(100, "Name too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .max(100, "Email too long")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .min(5, "Password is too short"),
});

const Signup = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(true);
    try {
      const data = values;
      data.user_name = data.name;
      delete data.name;
      const response = await axios.post(
        `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/v1/auth/register/`,
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
    <SignupSection>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
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
            <SignupSection>
              <Input
                type="text"
                name="name"
                placeholder="Enter your User Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "error" : null}
              />
              {touched.name && errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
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
                className={touched.password && errors.password ? "error" : null}
              />
              {touched.password && errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ margin: "1em" }}
              >
                Submit
              </Button>
            </SignupSection>
          </FormGroup>
        )}
      </Formik>
      <Link to="/login" style={{ fontSize: "0.8rem" }}>
        Already have an account? Login here.
      </Link>
    </SignupSection>
  );
};

export default Signup;
