const diveReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FETCHED_DIVES':
      return {
        ...state,
        fetchedDives: action.payload,
      }

    case 'ADD_DIVE':
      return {
        ...state,
        dives: [...state.dives, action.payload],
      }
    case 'DELETE_DIVE':
      return {
        ...state,
        dives: state.dives.filter(dive => dive.id !== action.payload),
      }
    case 'EDIT_DIVE':
      return {
        ...state,
        current: state.dives.filter(dive => dive.id === action.payload),
        editing: true,
      }
    case 'EDIT_FETCHED_DIVE':
      return {
        ...state,
        current: [action.payload],
        editing: true,
      }
    case 'UPDATE_DIVE':
      return {
        ...state,
        dives: [
          ...state.dives.filter(dive => dive.id !== state.current[0].id),
          action.payload,
        ],
        current: [],
        editing: false,
      }
    case 'UPDATE_FETCHED_DIVE':
      return {
        ...state,
        current: [],
        editing: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export default diveReducer
