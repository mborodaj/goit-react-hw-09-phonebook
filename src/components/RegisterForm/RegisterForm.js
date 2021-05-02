import React from 'react';
import s from './RegisterForm.module.css';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import { authOperations } from '../../redux/auth';

const validationSchema = yup.object({
  name: yup
    .string('Please enter your name')
    .min(1, 'Name should be of minimum 1 characters length')
    .required('Please enter your name'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Enter your email'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Enter your password'),
});

function RegisterForm({ addUserToDb }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onFormSubmit(values, resetForm);
    },
  });

  function onFormSubmit(values, resetForm) {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    addUserToDb(newUser);
    resetForm();
  }

  return (
    <div className={s.main}>
      <h2 className={s.register__title}>New user</h2>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          style={{ marginBottom: 10 }}
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          style={{ marginBottom: 10 }}
          name="email"
          label="Email"
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
          className={s.button}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Registration
        </Button>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  addUserToDb: authOperations.registerNewUser,
};

export default connect(null, mapDispatchToProps)(RegisterForm);
