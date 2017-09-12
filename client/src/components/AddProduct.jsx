import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { withRouter } from 'react-router-dom';

import { PRODUCT_TYPES } from '../helpers';
import * as actions from '../actions';
import { ROOT_URL } from '../actions/index.js';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = { files: [] };
    this.handleAddForm = this.handleAddForm.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  renderField(field) {
    const { label, type, placeholder, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={classname}>
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          placeholder={placeholder}
          {...input}
        />
        <div className="error">{touched ? error : ''}</div>
      </div>
    );
  }

  renderSelectField(field) {
    const { label, type, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={classname}>
        <label>{label}</label>
        <select className="form-control" {...input}>
          <option />
          {PRODUCT_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="error">{touched ? error : ''}</div>
      </div>
    );
  }

  renderDropField(field) {
    return (
      <div>
        {/* Dropzone will create an array of files with various props on and send as value to the backend,
        to avoid this we select only the first item in the array we also put
        the uploaded files to our comp state in order to show a preview of the added photo before submiting */}
        <Dropzone
          name={field.name}
          onDrop={(filesToUpload, e) => {
            this.setState({ files: filesToUpload });
            return field.input.onChange(filesToUpload[0]);
          }}
        >
          <div>
            {/* If in edit mode we have access to this.props.photo and we'll display the current photo. Else we
            check if the user have chosen a photo for the new product and display preview, else just text */}
            {this.props.photo ? (
              <img
                width="195"
                height="195"
                src={`${ROOT_URL}/uploads/${this.props.photo}`}
                alt=""
              />
            ) : field.input.value ? (
              <img
                width="195"
                height="195"
                src={this.state.files.map(file => file.preview)}
                alt=""
              />
            ) : (
              'Add an image'
            )}
          </div>
        </Dropzone>
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

  handleAddForm(values) {
    this.props.addProduct(values, () => this.props.history.push('/'));
  }

  handleEditForm(values) {
    this.props.editProduct(values, this.props.id, () =>
      this.props.history.push(`/product/${this.props.id}`)
    );
  }

  renderDeleteButton() {
    return (
      <button
        className="btn btn-danger"
        onClick={() =>
          this.props.deleteProduct(this.props.id, () =>
            this.props.history.push('/')
          )}
      >
        Remove product
      </button>
    );
  }

  render() {
    const { handleSubmit, edit } = this.props;
    return (
      <form
        onSubmit={
          edit ? (
            handleSubmit(this.handleEditForm)
          ) : (
            handleSubmit(this.handleAddForm)
          )
        }
        encType="multipart/form-data"
      >
        <Field
          name="title"
          type="text"
          placeholder="Title"
          component={this.renderField}
        />
        <Field
          name="description"
          placeholder="Description"
          type="text"
          component={this.renderField}
        />
        <Field name="type" component={this.renderSelectField} />
        <Field
          name="price"
          placeholder="Price"
          type="number"
          component={this.renderField}
        />
        <Field
          name="photo"
          type="file"
          component={this.renderDropField.bind(this)}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          {edit ? 'Update' : 'Add product'}
        </button>
        {edit && this.renderDeleteButton()}
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  !values.title ? (errors.title = 'Must provide a product title') : '';
  !values.description
    ? (errors.description = 'Must provide a product description')
    : '';
  !values.type ? (errors.type = 'Must provide a product type') : '';
  !values.price ? (errors.price = 'Must provide a product price') : '';
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'productForm'
  })(connect(mapStateToProps, actions)(AddProduct))
);
