import React, { useState } from "react";
import { connect } from "react-redux";

function Counter(props) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  //! { Dispatch
  const incrementRedux = () => {
    props.dispatch({ type: "INCREMENT" });
  };

  const decrementRedux = () => {
    props.dispatch({ type: "DECREMENT" });
  };
  //! Dispatch }

  return (
    <div className="counter">
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <h2>Counter Redux</h2>
      <div>
        <button onClick={decrementRedux}>-</button>
        <span>{props.count}</span>
        <button onClick={incrementRedux}>+</button>
      </div>
    </div>
  );
}

//? the connect function injects the dispatch function as a prop - Tell what data you need with mapStateToProps
//* it takes the entire Redux state and it is expected to return a object where the keys are prop names and the values are prop values = it does a mapping of the state and passes each element as a prop key and a prop value
//here you'll say which kind of actions I want to dispatch in this container.
const mapStateToProps = (state) => ({
  //pulls out from state - a key is count and the value is state.count
  count: state.count,
});
//*you in the end export an already connected component to the store - you make the connection between the component and the state that it needs during the export process
export default connect(mapStateToProps)(Counter);
