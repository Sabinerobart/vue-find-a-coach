export default {
  login() {

  },
  async signup(context, payload) {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true

      })
    })
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate');
      throw error
    }
    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn
    });
  }
}