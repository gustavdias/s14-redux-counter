import React, { Component } from "react";
//You need to inform the component about the constants / to connect our component to our state
import { connect } from "react-redux";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actionTypes from "../store/actions";

class Persons extends Component {
  // state = {
  //     persons: []
  // }

  //   personAddedHandler = () => {
  //*It went into the reducer
  // const newPerson = {
  //     id: Math.random(), // not really unique but good enough here!
  //     name: 'Max',
  //     age: Math.floor( Math.random() * 40 )
  // }
  // this.setState( ( prevState ) => {
  //     return { persons: prevState.persons.concat(newPerson)}
  // } );
  //   };

  //   personDeletedHandler = (personId) => {
  //*It went into the reducer
  /*  this.setState( ( prevState ) => {
            return { persons: prevState.persons.filter(person => person.id !== personId)}
        } ); */
  //   };

  render() {
    return (
      <div>
        {/* <AddPerson personAdded={this.personAddedHandler} /> */}
        <AddPerson personAdded={this.props.onAddedPerson} />
        {/* //!TypeError: Cannot read property 'persons' of null because persons
        still refers to this.state persons */}
        {/* {this.state.persons.map((person) => ( */}
        {this.props.prs.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onRemovedPerson(person.id)}
            //? Dispatch action when there is a click
          />
        ))}
      </div>
    );
  }
}

//action to get access to the state
const mapStateToProps = (state) => {
  return {
    prs: state.persons,
  };
};
//action to dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    onAddedPerson: (name, age) =>
      dispatch({
        type: actionTypes.ADD_PERSON,
        personData: { name: name, age: age },
      }),
    onRemovedPerson: (id) =>
      dispatch({ type: actionTypes.REMOVE_PERSON, personId: id }),
  };
};

//You need to inform the component about the constants / to connect our component to our state
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
