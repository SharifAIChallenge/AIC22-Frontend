export const signup = (axios, data) => {
  return axios.$post('/accounts/signup', data, {
    headers: {
      Authorization: false,
    },
  });
};

export const resetPassword = (axios, email) => {
  return axios.$post(
    '/accounts/password/reset',
    { email },
    {
      headers: {
        Authorization: false,
      },
    }
  );
};



export const resetPasswordConfirm = (axios, data) => {
  return axios.$post('/accounts/password/reset/confirm', data);
};

export const changePassword = (axios, data) => {
  return axios.$post('/accounts/password/change', data);
};

export const editProfile = (axios, data) => {
  return axios.$put('/accounts/profile', data, { headers: { 'content-type': 'multipart/form-data' } });
};

export const createTeam = axios => {
  return axios.$post('/participation/team', data);
};

export const leaveTeam = axios => {
  return axios.$delete('/participation/team');
};

export const editTeam = (axios, data) => {
  return axios.$put('/participation/team', data);
};

export const getTeamDetail = axios => {
  return axios.$get('/participation/team');
};

export const getTeamDetailWithParams = (axios, params) => {
  return axios.$get('/participation/team', params);
};

export const invite = (axios, data) => {
  return axios.$post('/participation/invitation/invite', data);
};

export const receivedInvitations = axios => {
  return axios.$get('/participation/invitation/invitations-to-me');
};

export const sentInvitations = axios => {
  return axios.$get('/participation/invitation/invitations-to-others');
};


export const answerInvitation = (axios, data) => {
  return axios.$post('/participation/invitation', data);
};

export const toggleMultiFriendly = (axios, data) => {
  return axios.$post('/participation/team/multi-friendly', data);
};

//challenge
export const SUBMIT_CODE = {
  name: 'SUBMIT_CODE',
  method: 'post',
  payload: 'data',
  url: '/challenge/submission/submit',
};


export const submitLargeCode = (axios, data) => {
  return axios.$post('/team/submission', data, {
    headers: {
      'content-type': 'multipart/form-data'
    },
  });
};
//end

export const viewSubmissions = axios => {
  return axios.$get('/team/submissions');
};

export const CHANGE_FINAL_SUBMISSION = {
  name: 'CHANGE_FINAL_SUBMISSION',
  method: 'put',
  slug: 'id',
  url: '/team/submission',
};

//games
export const REQUEST_FRIENDLY_MATCH = {
  name: 'REQUEST_FRIENDLY_MATCH',
  method: 'post',
  url: '/challenge/game/friendly',
  payload: 'data',
};

export const VIEW_MATCHES = {
  name: 'VIEW_MATCHES',
  method: 'get',
  url: '/challenge/games',
  params: ['offset', 'count'],
};

export const VIEW_LOBBY = {
  name: 'VIEW_LOBBY',
  method: 'get',
  url: '/challenge/game/lobby',
};

export const getScoreBoard = (axios, tab) => {
  const config = {
    friendly: {
      url: '/scoreboard/friendly',
      name: 'GET_FRIENDLY_SCOREBOARD',
      method: 'get',
    },
    seeding: {
      url: '/scoreboard/challenge',
      name: 'GET_CHALLENGE_SCOREBOARD',
      method: 'get',
    },
    groups: {
      url: '/scoreboard/league',
      name: 'GET_GROUPS_SCOREBOARD',
      method: 'get',
    },
  };
  return axios.$get(config[tab].url);
};

export const getChallenge = (axios, challenge) => {
  const config = {
    name: 'PRIMARY_CHALLENGE',
    method: 'get',
    url: '/challenge/challenges',
    slug: 'id',
  };
  return axios.$get(`${config.url}/${challenge}`);
};

export const gameStats = axios => {
  const config = {
    name: 'GAME_STATS',
    method: 'get',
    url: '/challenge/game/stats',
  };
  return axios.$get(config.url);
};

export const FAQ = axios => {
  return axios.$get('/faq/questions');
};

export const PastAi = axios => {
  return axios.$get('/past/');
};
