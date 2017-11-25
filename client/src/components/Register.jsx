import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Register extends Component {
  renderField(field) {
    const { label, type, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={classname}>
        <label>{label}</label>
        <input className="form-control" type={type} {...input} />
        <div className="error">{touched ? error : ''}</div>
      </div>
    );
  }

  handleRegisterForm(values) {
    this.props.registerUser(values, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleRegisterForm.bind(this))}>
        <Field
          label="Name:"
          name="name"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Email:"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password:"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm password:"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Must provide a name';
  }

  if (!values.email) {
    errors.email = 'Must provide an email';
  }

  if (!values.password && !values.passwordConfirm) {
    errors.password = 'Must provide a password';
    errors.passwordConfirm = 'Must provide a confirmation password';
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match!';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  validate,
  form: 'registerForm'
})(connect(mapStateToProps, actions)(Register));
