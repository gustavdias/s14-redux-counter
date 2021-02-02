import React, { Component } from "react";

import "./AddPerson.css";

class AddPerson extends Component {
  //? typical use case of local UI state
  //there is no need to store this in the global Redux store, you can absolutely store it in the state of that component because it only matters to that component
  state = {
    name: "",
    age: " ",
  };
  nameChangedHandler = (event) => {
    this.setState({ name: event.target.value });
  };
  ageChangedHandler = (event) => {
    this.setState({ age: event.target.value });
  };
  render() {
    return (
      <div className="AddPerson">
        <input
          type="text"
          placeholder="Name"
          onChange={this.nameChangedHandler}
          value={this.state.name}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={this.ageChangedHandler}
          value={this.state.age}
        />
        {/* //anonymous function so that we can pass some data along to the props */}
        <button
          onClick={() =>
            this.props.personAdded(this.state.name, this.state.age)
          }
        >
          Add Person
        </button>
      </div>
    );
  }
}
// const addPerson = (props) => (

// );

export default AddPerson;
