import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { PRODUCT_TYPES } from "../helpers";
import * as actions from "../actions";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = { files: [] };
    this.handleAddForm = this.handleAddForm.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
  }

  renderField(field) {
    const { label, type, placeholder, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={classname}>
        <label>
          {label}
        </label>
        <input className="form-control" type={type} placeholder={placeholder} {...input} />
        <div className="error">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderSelectField(field) {
    const { label, type, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={classname}>
        <label>
          {label}
        </label>
        <select className="form-control" {...input}>
          <option />
          {PRODUCT_TYPES.map(type =>
            <option key={type} value={type}>
              {type}
            </option>
          )}
        </select>
      </div>
    );
  }

  renderDropField(field) {
    return (
      <div>
        {/* Dropzone will create an array of files with various props on and send as value to the backend,
        to avoid this we select only the first item in the array we also put
        the uploaded files to our comp state in order to show a preview of the added photo before submiting */}
        <Dropzone name={field.name}
          onDrop={(filesToUpload, e) => {
            this.setState({ files: filesToUpload });
            return field.input.onChange(filesToUpload[0]);
          }}>
          <div>
            {/* If a file is uploaded show the preview  */}
            {field.input.value ?
              <img width="195" height="195" src={this.state.files.map(file => file.preview)} alt="" />
              : "Add an image"}
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
    this.props.addProduct(values, () => this.props.history.push("/"));
  }

  handleEditForm(values) {
    this.props.editProduct(values, this.props.id);
  }

  render() {
    const { handleSubmit, ifEdit } = this.props;
    return (
      <form
        onSubmit={ifEdit ?
          handleSubmit(this.handleEditForm) :
          handleSubmit(this.handleAddForm)}
        encType="multipart/form-data"
      >
        <Field name="title" type="text" placeholder="Title" component={this.renderField} />
        <Field name="description" placeholder="Description" type="text" component={this.renderField} />
        <Field name="type" component={this.renderSelectField} />
        <Field name="price" placeholder="Price" type="number" component={this.renderField} />
        <Field name="photo" type="file" component={this.renderDropField.bind(this)} />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          {ifEdit ? 'Update' : 'Add product'}
        </button>
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
  form: "productForm"
})(connect(mapStateToProps, actions)(AddProduct));
