import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../actions';

class AddProduct extends Component {
  constructor(props) {
    super(props)

    this.state = { files: [] }
  }

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

  renderDropField(field) {
		return (
     <div>
        {/* Dropzone will create an array of files with various props on and send as value to the backend,
        to avoid this we select only the first item in the array we also put
        the uploaded files to our comp state in order to show a preview of the added photo before submiting */}
				<Dropzone name={field.name} onDrop={(filesToUpload, e) => {
          this.setState({ files: filesToUpload });
          return field.input.onChange(filesToUpload[0]); 
          }}>
					<div>
            {/* If a file is uploaded show the preview  */}
						{field.input.value ? 
            <img width="195" height="195" src={this.state.files.map(file => file.preview)} alt="" /> :
             'Add an image'}
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
    console.log(values.photo);
    // File {preview: "blob:http://localhost:8002/15be367f-e0ce-469a-a970-b4a7ad84ef47", 
    // name: "13.jpeg", 
    // lastModified: 1496566125805, 
    // lastModifiedDate: Sun Jun 04 2017 10:48:45 GMT+0200 (Västeuropa, sommartid), 
    // size: 211739;
		// type: 'image/jpeg';
    // webkitRelativePath: ""…}
    this.props.addProduct(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
     <form onSubmit={handleSubmit(this.handleProductForm.bind(this))} encType="multipart/form-data">
				<Field label="Title:" name="title" type="text" component={this.renderField} />
				<Field label="Description:" name="description" type="text" component={this.renderField} />
				<Field label="Type:" name="type" type="text" component={this.renderField} />
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
  form: 'productForm'
})(
  connect(mapStateToProps, actions)(AddProduct)
);