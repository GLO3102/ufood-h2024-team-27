import { createApp } from "vue";
import { router } from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "../src/assets/scss/custom.css";
import "leaflet/dist/leaflet.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  zIndex: {
    overlay: 1200,
  },
});
app.use(bootstrap);
app.use(router);
app.use(pinia);
app.mount("#app");
