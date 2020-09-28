const reducer = (state = '', action) => {
    switch (action.type) {
      case 'FILTER':
        return action.data
      default:
        return state
    }
  }
  
  export const addFilter = (text) => {
    return {
      type: 'FILTER',
      data: text
    }
  }
  
  export default reducer