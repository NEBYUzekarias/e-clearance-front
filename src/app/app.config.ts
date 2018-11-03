// app configuration detail object
export const appConfig = {
  // base api url that can be used to construct specific urls
  apiUrl: 'https://e-clearance-demo.herokuapp.com/api',

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
  },

  // possible account roles
  roles: {
    STUDENT: 'student',
    OFFICE: 'office',
    ADMIN: 'admin',
  },

  // number of pagination links on a single page
  page_links_num: 5,

  // total items shown per page
  items_per_page: 3,

  searchOptionSetForOffices: [],

  searchOptionSetForStudentUser:[]
}
