import conf from "../../../utils/conf";

const { url } = conf.api;

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }
    const response = await fetch(`${url}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const resData = await response.json();
    // Below, infos that are not sent to the server, but needed locally
    newRequest.id = resData.name; // id generated by firebase under the 'name' key
    newRequest.coachId = payload.coachId;

    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to send request');
      throw error;
    }
    context.commit('addRequest', newRequest)
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const { token } = context.rootGetters
    const response = await fetch(`${url}/requests/${coachId}.json?auth=${token}`);
    const resData = await response.json();
    if (!response.ok) {
      const error = new Error(resData.message || 'Failed to fetch requests.');
      throw error;
    }
    const requests = [];
    for (const key in resData) {
      const request = {
        id: key,
        coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message
      }
      requests.push(request);
    }
    context.commit('setRequests', requests);
  }
}