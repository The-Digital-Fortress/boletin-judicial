export const actionTypes = {
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
}

export const initialState = {
  modalOpen: false,
}

export function adminTableReducer(state, action) {
  switch (action.type) {
    case 'SET_MODAL_OPEN':
      return { ...state, modalOpen: action.payload }
    default:
      return state
  }
}
