<template>
  <div class="App">
    <div class="header-wrapper">
      <div class="bt-wrapper">
        <template v-if="editMode">
          <button @click="editMode = false">关闭编辑状态</button>
        </template>
        <template v-else>
          <button @click="editMode = true">开启编辑状态</button>
        </template>
      </div>

      <div class="item-wrapper">
        <div class="item-card" :key="item.i" v-for="item in currentLayout">
          序号:{{item.id}}，x:{{item.x}}，y:{{item.y}}，h:{{item.h}}
        </div>
      </div>
    </div>
    <vue-grid-layout-split @changeLayout="changeLayout" :editMode="editMode" class="layout-wrapper" :defaultLayout="defaultLayout"></vue-grid-layout-split>
  </div>
</template>

<script>
import vueGridLayoutSplit, { GridItemType } from "./components/index"
export default {
  components: {
    vueGridLayoutSplit
  },
  data() {
    return {
      editMode: true,
      defaultLayout: [
        {id: 0, 'x': 0, 'y': 0, 'height': 100, type: GridItemType.SMALL},
        {id: 1, 'x': 0, 'y': 0, 'height': 200, type: GridItemType.BIG},
        {id: 2, 'x': 0, 'y': 0, 'height': 150, type: GridItemType.SMALL},

        {id: 3, 'x': 1, 'y': 0, 'height': 400, type: GridItemType.SMALL},
        {id: 4, 'x': 1, 'y': 0, 'height': 130, type: GridItemType.SMALL},
        {id: 5, 'x': 1, 'y': 0, 'height': 100, type: GridItemType.SMALL},

        {id: 6, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL},
        {id: 7, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL},
        {id: 8, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL}
      ],
      currentLayout: []
    }
  },
  methods: {
    changeLayout (v) {
      this.currentLayout = v
    }
  }
}
</script>
<style lang="less">
body{
}
</style>
<style lang="less" scoped>

.App {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-wrapper{
    padding: 10px;
    .bt-wrapper{
      display: flex;
    }
    .item-wrapper{
      display: flex;
      margin-top: 6px;
      .item-card{
        padding: 2px 4px;
        border: 1px gray solid;
        margin-right: 6px;
      }
    }
  }
  .layout-wrapper{
    height: 0;
    flex: 1;
  }
}
</style>
