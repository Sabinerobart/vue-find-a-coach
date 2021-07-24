import conf from "../../../utils/conf";

const authenticate = async (context, payload, type) => {
  const { key } = conf.api;
  const { signIn, signUp } = conf.auth;

  let apiUrl = `${signIn}${key}`;
  if (type === 'signup') {
    apiUrl = `${signUp}${key}`
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    })
  })
  const resData = await res.json();

  if (!res.ok) {
    const error = new Error(resData.message || 'Failed to authenticate. Check your credentials');
    throw error
  }

  localStorage.setItem('token', resData.idToken);
  localStorage.setItem('userId', resData.localId);

  context.commit('setUser', {
    token: resData.idToken,
    userId: resData.localId,
    tokenExpiration: resData.expiresIn
  });
}

export default {
  async login(context, payload) {
    authenticate(context, payload, 'login')
  },
  async signup(context, payload) {
    authenticate(context, payload, 'signup')
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null
      })
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    })
  }
}