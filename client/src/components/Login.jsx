import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';

class Login extends Component {
  renderField(field) {
    const { label, type, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? 'has-danger' : ''} `;
    return (
      <div className={classname}>
        <label>{label}</label>
        <input className="form-control" type={type} {...input} />
        <div>{touched ? error : ''}</div>
      </div>
    );
  }

  handleLoginForm(values) {
    this.props.loginUser(values, () => {
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
      <div>
        <form onSubmit={handleSubmit(this.handleLoginForm.bind(this))}>
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
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Must provide an email';
  }
  if (!values.password) {
    errors.password = 'Must provide a password';
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
  form: 'loginForm'
})(connect(mapStateToProps, actions)(Login));
