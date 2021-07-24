import conf from "../../../utils/conf";

const { url } = conf.api;

export default {
	async registerCoach(context, data) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: data.first,
			lastName: data.last,
			description: data.desc,
			hourlyRate: data.rate,
			areas: data.areas
		};

		const res = await fetch(`${url}/coaches/${userId}.json`, {
			method: 'PUT', // !POST because the id will already exist when we add authentication
			body: JSON.stringify(coachData)
		})
		// const resData = await res.json();
		if (!res.ok) {
			const error = new Error(res.message || 'Failed to post !')
			throw error;
		}
		context.commit('registerCoach', { ...coachData, id: userId })
	},
	async loadCoaches(context, payload) {
		if (!payload.forceRefresh && !context.getters.shouldUpdate) {
			return;
		}
		const res = await fetch(`${url}/coaches.json`);
		const data = await res.json();
		if (!res.ok) {
			const error = new Error(res.message || 'Failed to fetch !')
			throw error;
		}
		const coaches = [];
		for (const key in data) {
			const coach = {
				firstName: data[key].firstName,
				lastName: data[key].lastName,
				description: data[key].description,
				hourlyRate: data[key].hourlyRate,
				areas: data[key].areas,
				id: key
			}
			coaches.push(coach)
		}
		context.commit('setCoaches', coaches);
		context.commit('setFetchTimestamp');
	}
}