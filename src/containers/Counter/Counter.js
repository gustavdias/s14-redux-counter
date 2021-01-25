import React, { Component } from "react";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

//!Connecting the Store to React - use react-redux to create the subscription
import { connect } from "react-redux";
//? connect is not really a higher order component, it's a function which returns a higher order component that we use on the export,

class Counter extends Component {
  //*no need after redux
  //   state = {
  //     counter: 0,
  //   };

  //*no need after redux
  //   counterChangedHandler = (action, value) => {
  //     switch (action) {
  //       case "inc":
  //         this.setState((prevState) => {
  //           return { counter: prevState.counter + 1 };
  //         });
  //         break;
  //       case "dec":
  //         this.setState((prevState) => {
  //           return { counter: prevState.counter - 1 };
  //         });
  //         break;
  //       case "add":
  //         this.setState((prevState) => {
  //           return { counter: prevState.counter + value };
  //         });
  //         break;
  //       case "sub":
  //         this.setState((prevState) => {
  //           return { counter: prevState.counter - value };
  //         });
  //         break;
  //       default:
  //         console.log(`default: ${action}`);
  //     }
  //   };

  render() {
    return (
      <div>
        {/* <CounterOutput value={this.state.counter} /> */}
        {/* Version with redux */}
        <CounterOutput value={this.props.ctr} />

        <CounterControl
          label="Increment"
          //? Redux Dispatch action
          clicked={this.props.onIncrementCounter}
          // clicked={() => this.counterChangedHandler("inc")}
        />
        <CounterControl
          label="Decrement"
          //? Redux Dispatch action
          clicked={this.props.onDecrementCounter}
          //   clicked={() => this.counterChangedHandler("dec")}
        />
        <CounterControl
          label="Add 10"
          //? Redux Dispatch action
          clicked={this.props.onAddCounter}
          //   clicked={() => this.counterChangedHandler("add", 5)}
        />
        <CounterControl
          label="Subtract 5"
          //? Redux Dispatch action
          clicked={this.props.onSubtractCounter}
          //   clicked={() => this.counterChangedHandler("sub", 5)}
        />

        {/* //updating state immutably */}
        <hr />
        {/*            // ! Updating State Immutably
 When you click on Store Result - add the current counter value to my result array in the reducer 
 you can dispatch actions which you actually don't handle in the reducer - you don't get a error because of it*/}
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {/* //! Updating State Immutably */}
          {this.props.storedResults.map((strResult) => (
            <li
              key={strResult.id}
              //   ! Updating State Immutably
              onClick={() => this.props.onDeleteResult(strResult.id)}
            >
              {strResult.value}
            </li>

            // ! Updating State Immutably
            // if I click one of these results, so one of these list items, I want to remove it from the array,
          ))}
        </ul>
      </div>
    );
  }
}

//to this first function execution, we can pass some configuration for this given container.
//2 pieces of info:
//? 1st: Witch state I want to set - Which part of the whole application state is interesting to us - define which slice of the state do I want to get in this container
//? 2nd: the actions I want to dispatch - which actions do I want to dispatch -

//the state managed redux is not received as state here because state is the thing you change internally from within a component.
//we don't want to get anything which we can't change internally and props aren't changed internally,
//* You store instructions about how the state managed by redux should be mapped to props
const mapStateToProps = (state) => {
  //! volta -  (state) will be given to you by react-redux
  //!  react-redux will reach out to your redux state, each it is the state I set on store/reducer.js
  //function which expects the state stored in redux as the input and returns a javascript object which is a map of prop names and slices of the state stored in redux.
  return {
    //ctr for counter
    ctr: state.counter, //give me the value of the counter in our global state managed by redux
    // ! Updating State Immutably
    storedResults: state.results,
  };
};
//this function will eventually be executed by the react-redux package because we will pass it to it,

//! dispatch actions from within our components.
//*the react-redux package gives us a helper function which will call dispatch on the store behind the scenes.
// equivalent to store.dispatch() on redux stand alone
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    //return a javascript object where we can define some prop names which will hold a reference to a function which should eventually get executed to dispatch an action.
    //onIncrementCounter - this property now holds a value of course and that value should be an anonymous function
    //*this function dispatch() will be available through this property onIncrementCounter, and therefore, whenever this property is executed as a function, the dispatch method wil be executed.
    //dispatch({ type: "INCREMENT" }), You pass a JS Object where you need to set up a type/

    onDecrementCounter: () => dispatch({ type: "DECREMENT" }),
    //! Passing and Retrieving Data with Action
    onAddCounter: () => dispatch({ type: "ADD", payload: 10 }),
    onSubtractCounter: () => dispatch({ type: "SUBTRACT", payload: 5 }),

    //! Updating State Immutably
    // if I click one of these results, so one of these list items, I want to remove it from the array,
    onStoreResult: (result) =>
      dispatch({ type: "STORE_RESULT", result: result }),
    onDeleteResult: (id) => dispatch({ type: "DELETE_RESULT", resultElId: id }),
  };
};

//?connect itself is a function which returns a function which takes then a component as input,
//connect is not really a higher order component, it's a function which returns a higher order component.
//! so this doesn't work export default connect(Counter);
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

//*if you have a container which only needs to dispatch actions but doesn't need a slice of the state
// export default connect(null, mapDispatchToProps)(Counter);

//*case where you don't have any actions in your container, you just leave it out
// export default connect(mapStateToProps)(Counter);
