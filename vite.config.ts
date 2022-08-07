import prodCompConfig from "./config/prod-comp.config"
import prodHtmlConfig from "./config/prod-html.config"
import devConfig from "./config/dev.config"
import { ConfigEnv, UserConfigExport } from "vite"

//vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  if (command === "serve") return devConfig
  else {
    if (process.env["BUILD_DIST"] === "component") return prodCompConfig
    else return prodHtmlConfig
  }
}
