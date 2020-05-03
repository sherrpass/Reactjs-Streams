import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (error && touched) {
            // touched is true and will stay that way after a field element that has been focused becomes unfocused/ when the form containing the field is submitted
            return <div className="ui error message">{error}</div>;
        }
        return null;
    }
    renderInput = ({ input, label, meta }) => {
        const fieldClassName = `field ${
            meta.error && meta.touched ? "error" : "" //cause the field to be red if there is an error and user has done interacting w the input element
        }`;

        return (
            <div className={fieldClassName}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };
    render() {
        return (
            <form
                className="ui form error" //the error class will unhide the error messages
                onSubmit={this.props.handleSubmit(this.onSubmit)} //will auto run e.prevent.default. Instead of the event variable, the onsubmit function will be passed an object containing the form values.
            >
                <Field
                    component={this.renderInput}
                    name="title"
                    label="Enter a title:"
                />
                <Field
                    component={this.renderInput}
                    name="description"
                    label="Enter a description:"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = ({ title, description }) => {
    //will be passed in form Values
    //this is called by redux form every change or interaction w the form or when the form is initially rendered
    const error = {};
    if (!title) {
        error.title = "Please enter a title.";
    }
    if (!description) {
        error.description = "Please enter a description.";
    }
    return error;
    //if error is not an empty object, this component is rerendered.
    //Also, all the field components with a name prop found as a key value in the error object will be passed the value of the key as formProps.meta.error.
    //NOTE: regardless whether there is an error of not all formProps have a meta property.
};

export default reduxForm({ form: "StreamForm", validate })(StreamForm);
