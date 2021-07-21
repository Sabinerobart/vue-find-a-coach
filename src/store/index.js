import { createStore } from 'vuex';
import coachesModules from './modules/coaches';
import requestsModules from './modules/requests';
import authModules from './modules/auth';

const store = createStore({
	modules: {
		coaches: coachesModules,
		requests: requestsModules,
		auth: authModules
	},
});

export default store;