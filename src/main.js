import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import BaseCard from './components/UI/BaseCard'
import BaseButton from './components/UI/BaseButton'
import BaseBadge from './components/UI/BaseBadge'
import BaseSpinner from './components/UI/BaseSpinner'

// Only download the code for this component if it's needed
const BaseDialog = defineAsyncComponent(() => import('./components/UI/BaseDialog'))

const app = createApp(App)
app.use(router);
app.use(store);
app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)
app.mount('#app')