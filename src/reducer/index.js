export const itemsInitState = { items:[], fetching: true }

export const itemReducer = (state = itemsInitState, action) => {
    switch (action.type) {
        case 'STACK_ITEMS':
            return { ...state, items: state.items.concat(action.items) }
        case 'FETCHING_ITEMS':
            return { ...state, fetching: action.fetching }
        default:
            return state;
    }
}

export const pagerInitState = { page: 0 }

export const pageReducer = (state = pagerInitState, action) => {
    switch (action.type) {
        case 'ADVANCE_PAGE':
            return { ...state, page: state.page + 20 }
        default:
            return state;
    }
}

