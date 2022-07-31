import prodConfig from "./config/prod.config"
import devConfig from "./config/dev.config"
import { ConfigEnv, UserConfigExport } from "vite"


//vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  if (command === "serve") return devConfig
  else return prodConfig
}
