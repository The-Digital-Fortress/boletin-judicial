export const actionTypes = {
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_CONFIRMATION_WINDOW_OPEN: 'SET_CONFIRMATION_WINDOW_OPEN',
  SET_SELECTED_FILES: 'SET_SELECTED_FILES',
  SET_INDETERMINATE: 'SET_INDETERMINATE',
}

export const initialState = {
  modalOpen: false,
  confirmationWindowOpen: false,
  selectedFiles: [],
  indeterminate: false,
}

export function adminTableReducer(state, action) {
  switch (action.type) {
    case 'SET_MODAL_OPEN':
      return { ...state, modalOpen: action.payload }
    case 'SET_CONFIRMATION_WINDOW_OPEN':
      return { ...state, confirmationWindowOpen: action.payload }
    case 'SET_SELECTED_FILES':
      return { ...state, selectedFiles: action.payload }
    case 'SET_INDETERMINATE':
      return { ...state, indeterminate: action.payload }
    default:
      return state
  }
}
