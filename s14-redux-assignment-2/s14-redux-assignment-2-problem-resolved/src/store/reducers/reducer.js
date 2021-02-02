import * as actionTypes from "../actions";
const initialState = {
  persons: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        // name: "Max",
        name: action.personData.name,
        // age: Math.floor(Math.random() * 40),
        age: action.personData.age,
      };

      //transform this...
      // this.setState((prevState) => {
      //   return { persons: prevState.persons.concat(newPerson) };
      // });
      //into this:
      return {
        ...state,
        persons: state.persons.concat(newPerson),
      };
    case actionTypes.REMOVE_PERSON:
      //transform this...

      // this.setState((prevState) => {
      //   return {
      //     persons: prevState.persons.filter((person) => person.id !== personId),
      //   };
      // });
      //into this:

      return {
        ...state,
        persons: state.persons.filter(
          (person) => person.id !== action.personId
        ),
      };
    default:
      return state;
  }
};
export default reducer;
