import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddProduct extends Component {

 renderField(field){
    const { label, type, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={classname}>
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...input}
          />
        <div className="error">
          { touched ? error : '' }
        </div>
      </div>
    );
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

  handleProductForm(values) {
    this.props.addProduct(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleProductForm.bind(this))} >
        <Field
          label="Title:"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Description:"
          name="description"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Type:"
          name="type"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Price:"
          name="price"
          type="number"
          component={this.renderField}
        />
        <Field
          label="Photo:"
          name="photo"
          type="text"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Add product</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  validate,
  form: 'productForm'
})(
  connect(mapStateToProps, actions)(AddProduct)
);