// app configuration detail object
export const appConfig = {
  // base api url that can be used to construct specific urls
  apiUrl: 'http://localhost:3000/api',

  local_keys: {
    // key used to save access token of logged in user
    token: 'access_token',

    // key used to save logged in user account
    account: 'account',
  },

  // possible state values for clearance and request models
  // N.B. these state values have to be the same with server side state values variable
  states: {
    APPROVED: 'approved',
    PENDING: 'pending',
    NEED_REVIEW: 'need_review',
  }
}
