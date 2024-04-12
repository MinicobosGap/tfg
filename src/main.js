// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Importar funciones específicas de Vue Router
import routes from './routes';

const app = createApp(App);

// Configuración global para desactivar el mensaje de producción
app.config.productionTip = false;

// Crear una instancia de Vue Router con las funciones de creación específicas
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.mount('#app');
