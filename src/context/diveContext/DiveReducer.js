
// !!!! I DON'T KNOW WHY - but you always need to return ...state
const diveReducer = (state, action) => {
  switch (action.type) {
    // case 'ADD_LOCATION':
    //   return {
    //     ...state,
    //     locations: [...state.locations, action.payload.diveLocation],
    //     time: [...state.time, action.payload.diveTime]
    //   }
    // case 'ADD_DIVE':
    //   return {
    //     ...state,
    //     dives: [...state.dives, {
    //       log: action.payload.log, 
    //       diveLocation: action.payload.diveLocation, 
    //       diveTime: action.payload.diveTime, 
    //       depth: action.payload.depth, 
    //       date: action.payload.date,
    //       timeIn: action.payload.timeIn,
    //       timeOut: action.payload.timeOut,
    //       startBar: action.payload.startBar,
    //       endBar: action.payload.endBar,
    //       visibility: action.payload.visibility,
    //       airTemp: action.payload.airTemp,
    //       surfaceTemp: action.payload.surfaceTemp,
    //       bottomTemp: action.payload.bottomTemp,
    //       conditions: action.payload.conditions,
    //       notes: action.payload.notes,
    //       id: uuidv4()
    //     }]
    //   }

    case 'SET_FETCHED_DIVES':
      return {
        ...state,
        fetchedDives: action.payload
      }

    case 'ADD_DIVE':
      return {
        ...state,
        dives: [...state.dives, action.payload]
      }
    case 'DELETE_DIVE':
      // console.log(state.dives)
      return {
        ...state,
        dives: state.dives.filter(dive => dive.id !== action.payload)
      }
    case 'EDIT_DIVE':
      // console.log(state.current)
      return {
        ...state,
        current: state.dives.filter(dive => dive.id === action.payload),
        editing: true
      }
    case 'EDIT_FETCHED_DIVE':
      return {
        ...state,
        current: [action.payload],
        editing: true
      }
    case 'UPDATE_DIVE':
      return {
        ...state,
        dives: [...state.dives.filter(dive => dive.id !== state.current[0].id), action.payload],
        current: [],
        editing: false
      }
    case 'UPDATE_FETCHED_DIVE':
      return {
        ...state,
        current: [],
        editing: false
      }

    // case 'UPDATE_DIVE':
    //   return {
    //     ...state,
    //     dives: [...state.dives.filter(dive => dive.id !== state.current[0].id), {
    //       log: action.payload.log, 
    //       diveLocation: action.payload.diveLocation, 
    //       diveTime: action.payload.diveTime, 
    //       depth: action.payload.depth, 
    //       date: action.payload.date,
    //       timeIn: action.payload.timeIn,
    //       timeOut: action.payload.timeOut,
    //       startBar: action.payload.startBar,
    //       endBar: action.payload.endBar,
    //       visibility: action.payload.visibility,
    //       airTemp: action.payload.airTemp,
    //       surfaceTemp: action.payload.surfaceTemp,
    //       bottomTemp: action.payload.bottomTemp,
    //       conditions: action.payload.conditions,
    //       notes: action.payload.notes,
    //       id: uuidv4()
    //     }],
    //     current: [],
    //     editing: false
    //   }
    default:
      return {
        ...state
      }
  }
}

export default diveReducer