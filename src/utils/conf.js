export default {
  api: {
    url: process.env.VUE_APP_API_URL,
    key: process.env.VUE_APP_API_KEY
  },
  auth: {
    signIn: process.env.VUE_APP_FIREBASE_SIGN_IN,
    signUp: process.env.VUE_APP_FIREBASE_SIGN_UP,
  }
}