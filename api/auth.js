export const login = (axios, data) => {
  return axios.$post('/account/login', data);
};

export const getUser = axios => {
  return axios.$get('/account/profile');
};

export const logout = axios => {
  return axios.$post('/account/logout');
};

export const sendGoogleAuthCode = (axios, data) => {
  return axios.$post('/account/social-login', data);
};

export const activeAccount = (axios, eid, token) => {
  return axios.$get(`/account/activate/${eid}/${token}`);
};

export const isAccountActivated = (axios, email) => {
  return axios.$post('/account/is-active', { email });
};
