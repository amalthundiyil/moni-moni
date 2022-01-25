import { Button } from "../../common/Button/index";
import { LoginSection } from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import {
  FormGroup,
  Span,
  ButtonContainer,
} from "../../components/ContactForm/styles";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .max(100, "Email too long")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password is too short")
    .matches(/[a-zA-Z]/, "Password can contain English letters only."),
});

const Login = () => {
  return (
    <>
      <LoginSection>
        <Formik
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            setTimeout(() => {
              JSON.stringify(values, null, 2);
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
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
      </LoginSection>
    </>
  );
};

export default Login;
