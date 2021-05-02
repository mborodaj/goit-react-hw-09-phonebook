import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import s from './LoginForm.module.css';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';

const validation = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(7, 'Password should be of minimum 7 characters length')
    .required('Password is required'),
});

const LoginForm = ({ onLoginUser }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: values => {
      onLoginUser(values);
    },
  });

  return (
    <div className={s.form__container}>
      <h2 className={s.form__title}>Login</h2>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <TextField
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          style={{ marginBottom: 20 }}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          disableRipple
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  onLoginUser: authOperations.loginUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
