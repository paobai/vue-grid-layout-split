import { createApp } from "vue"
import App from "./App.vue"
import { layoutInstall } from "./components/index"

let app = createApp(App)
app.use(layoutInstall as any)
app.mount("#app")
