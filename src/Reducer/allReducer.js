import { combineReducers } from 'redux'

const { default: tokenReducer } = require("./tokenReducer");
const { default: userReducer } = require("./userReducer");
const { default: siteReducer } = require("./siteReducer");

const allreducers = combineReducers({
    user: userReducer,
    token: tokenReducer,
    site: siteReducer
})
export default allreducers