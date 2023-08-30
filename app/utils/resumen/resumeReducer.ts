type State = typeof initialState

type Action = {
  type: string
  payload: any
}

export const actionTypes = {
  SET_SORTING_COLUMN: 'SET_SORTING_COLUMN',
  SET_SORTING_ORDER: 'SET_SORTING_ORDER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
}

export const initialState = {
  sortingColumn: 'fecha',
  sortingOrder: '',
  searchTerm: '',
}

export function resumeReducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.SET_SORTING_COLUMN:
      return { ...state, sortingColumn: action.payload }
    case actionTypes.SET_SORTING_ORDER:
      return { ...state, sortingOrder: action.payload }
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload }
    default:
      return state
  }
}
