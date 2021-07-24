import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import Auth from './pages/auth/UserAuth.vue';

import store from './store/index';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/auth' },
		{ path: '/auth', component: Auth, meta: { requiresUnAuth: true } },
		{ path: '/coaches', component: CoachesList },
		{
			path: '/coaches/:id', component: CoachDetails, props: true, children: [
				{ path: 'contact', component: ContactCoach } // /coaches/c1/contact
			]
		},
		{ path: '/registration', component: CoachRegistration, meta: { requiresAuth: true } },
		{ path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
		{ path: '/:notFound(.*)', component: NotFound },
	],
});

router.beforeEach((to, _, next) => {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth');
	} else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
		next('/coaches');
	} else {
		next();
	}
})

export default router;