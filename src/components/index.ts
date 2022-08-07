import _VueGridLayoutSplit from "./vue-grid-layout-split.vue"
import type { App } from 'vue';
export { GridItemType, GridPosition } from "./help"
export type { LayoutType } from "./help"
import vueGridLayoutInstall from "vue-grid-layout"


const vueGridLayoutSplit = Object.assign(_VueGridLayoutSplit, {
    install: (app: App) => {
        app.component(_VueGridLayoutSplit.name, _VueGridLayoutSplit);
        // @ts-ignore
        app.use(vueGridLayoutInstall)
        console.log("had install3")
    },
})

export default vueGridLayoutSplit