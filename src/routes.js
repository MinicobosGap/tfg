// routes.js
import HashSaltPsswd from './components/HashSaltPsswd.vue';
import EncryptCreditNum from './components/EncryptCreditNum.vue';
import EncryptPersonalData from './components/EncryptPersonalData.vue';
import HomePage from './components/HomePage.vue';
import safeDNI from './components/safeDNI.vue';
import EncryptDocs from './components/EncryptDocs.vue';
import ConclusionDetallada from './components/ConclusionDetallada.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/dni', component: safeDNI },
  { path: '/password', component: HashSaltPsswd },
  { path: '/creditcard', component: EncryptCreditNum },
  { path: '/personaldata', component: EncryptPersonalData },
  { path: '/docs', component: EncryptDocs },
  { path: '/conclusion', component: ConclusionDetallada },

];

export default routes;
