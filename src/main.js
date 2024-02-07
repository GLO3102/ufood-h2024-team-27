import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "../src/assets/scss/custom.css";

const app = createApp(App);

app.use(bootstrap);
app.use(router);
app.mount("#app");
