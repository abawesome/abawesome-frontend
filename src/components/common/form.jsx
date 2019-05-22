import { Component } from "react";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    //TODO input validation
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = e => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };
}

export default Form;
