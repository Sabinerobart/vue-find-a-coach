import conf from "../../../utils/conf";
let timer;

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
  const expiresIn = +resData.expiresIn * 1000;
  const expirationDate = new Date().getTime() + expiresIn;

  localStorage.setItem('token', resData.idToken);
  localStorage.setItem('userId', resData.localId);
  localStorage.setItem('expirationDate', expirationDate);

  timer = setTimeout(() => {
    context.dispatch('autoLogout');
  }, expiresIn);

  context.commit('setUser', {
    token: resData.idToken,
    userId: resData.localId,
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
    const tokenExpiration = localStorage.getItem('expirationDate');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 10000) { // if token expires in < 10sec
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn)
    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
}