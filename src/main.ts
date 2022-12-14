import { createApp } from "vue"
import App from "./App.vue"
import layoutInstall from "./components/index"

let app = createApp(App)
app.use(layoutInstall)
app.mount("#app")
