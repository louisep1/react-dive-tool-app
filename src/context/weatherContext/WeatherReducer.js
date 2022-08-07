const weatherReducer = (state, action) => {
  switch (action.type) {
    // case 'SEARCH_CITIES': 
    //   return {
    //     ...state
    //   }
    //   // I'm not sure at this point if we just search and show list of options or just add city's forecast directly

    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, action.payload]
      }
    case 'DELETE_CITY':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload)
      }
    case 'HIGHLIGHT_CITY':
      const without = state.cities.filter(city => city.id !== action.payload.id)
      without.forEach(element => element.highlighted = false);
      const toHighlight = state.cities.filter(city => city.id === action.payload.id)
      toHighlight[0].highlighted = true
      // console.log(toHighlight)
      // console.log(state.cities)
      return {
        ...state,
        cities: [toHighlight[0], ...without]
      }
    case 'UNHIGHLIGHT':
      const unHighlight = state.cities.filter(city => city.id === action.payload.id)
      unHighlight[0].highlighted = false
      const theRest = state.cities.filter(city => city.id !== action.payload.id)
      return {
        ...state,
        cities: [...theRest, unHighlight[0]]
      }
    default:
      return {
        ...state
      }
  }
}

export default weatherReducer