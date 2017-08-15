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
  }

  renderField(field) {
    const { label, type, placeholder, input, meta: { touched, error } } = field;
    const classname = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={classname}>
        <label>
          {label}
        </label>
        <input className="form-control" type={type} {...input} />
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

  handleProductForm(values) {
    this.props.addProduct(values, () => this.props.history.push("/"));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.handleProductForm.bind(this))}
        encType="multipart/form-data"
      >
        <Field label="Title:" name="title" type="text" component={this.renderField} />
        <Field label="Description:" name="description" type="text" component={this.renderField} />
        <Field label="Type:" name="type" component={this.renderSelectField} />
        <Field label="Price:" name="price" type="number" component={this.renderField} />
        <Field label="Photo:" name="photo" type="file" component={this.renderDropField.bind(this)} />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Add product
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
  form: "productForm",
  initialValues: {
    title: "hiwd"
  }
})(connect(mapStateToProps, actions)(AddProduct));
