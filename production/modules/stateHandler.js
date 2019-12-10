const actions = {
    FETCH: (state, action) => ({
      ...state,
      status: 'fetching',
    }),
    RESOLVE: (state, action) => ({
      ...state,
      status: 'success',
      button: action.button,
      pony: action.data,
    }),
    ERROR: (state, action) => ({
      ...state,
      status: 'failure',
      error: action.error
    }),
    default: state => state,
}

export default (state, action) => {
    const handler = actions[action.type] || actions.default
    return handler(state, action)
}
