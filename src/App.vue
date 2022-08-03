<template>
  <div class="App">
    <div class="top-wrapper">
      <img class="logo" src="/logo.png">
      <span class="title">Vue-Grid-Layout-Split</span>
    </div>
    <div class="header-wrapper">
      <div class="control-wrapper">
        <div class="left-wrapper">
          <template v-if="editMode">
            <div class="bt-class" @click="editMode = false">保存布局</div>
          </template>
          <template v-else>
            <div class="bt-class edit"  @click="editMode = true">编辑布局</div>
          </template>
          <div class="bt-class" @click="resetLayout">重置</div>
          <span>水平间距：</span><input class="input-class" v-model="gridMarginRow">
          <span style="margin-left: 30px">垂直间距：</span><input class="input-class" v-model.number="gridMarginCol">
        </div>
        <div class="right-wrapper">
          <div class="bt-class" @click="addCard">增加卡片</div>
          <span>高度：</span><input class="input-class" v-model.number="addHeight">
          <span style="margin-left: 38px">大小：</span>
          <input type="radio" name="size" :value="0" v-model="addSize"/>小的卡片
          <input type="radio" name="size" :value="1" v-model="addSize"/>大的卡片
          <span style="margin-left: 38px">方向：</span>
          <input type="radio" name="gender" :value="true" v-model="addDirect"/>从上增加
          <input type="radio" name="gender" :value="false" v-model="addDirect"/>从下增加
        </div>
      </div>

      <div class="item-wrapper">
        <div class="item-card" :key="item.i" v-for="item in currentLayout">
          序号:{{item.id}}，x:{{item.x}}，y:{{item.y.toFixed(2)}}，w:{{item.w}}，h:{{item.h}}
        </div>
      </div>
    </div>
    <div class="layout-wrapper">
      <vue-grid-layout-split ref="gridLayoutSplit"
                             :gridMargin="[gridMarginRow, gridMarginCol]"
                             @changeLayout="changeLayout"
                             :editMode="editMode"
                             :defaultLayout="defaultLayout">
        <template #default="{value}">
          <div class="content-wrapper">
          <span style="margin-left: 16px">
            序号：{{value.id}}
          </span>
          </div>
        </template>
      </vue-grid-layout-split>
    </div>
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
      gridMarginRow: 20,
      gridMarginCol: 20,
      addHeight: 100,
      addSize: 0,
      addDirect: true,
      defaultLayout: [
        {id: 0, 'x': 0, 'y': 0, 'height': 100, type: GridItemType.SMALL},
        {id: 1, 'x': 0, 'y': 0, 'height': 200, type: GridItemType.BIG},
        {id: 2, 'x': 0, 'y': 0, 'height': 150, type: GridItemType.SMALL},

        {id: 3, 'x': 1, 'y': 0, 'height': 250, type: GridItemType.SMALL},
        {id: 4, 'x': 2, 'y': 0, 'height': 130, type: GridItemType.SMALL},
        {id: 5, 'x': 1, 'y': 0, 'height': 100, type: GridItemType.SMALL},

        {id: 6, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL},
        {id: 7, 'x': 2, 'y': 0, 'height': 180, type: GridItemType.SMALL},
        {id: 8, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL}
      ],
      currentLayout: []
    }
  },
  methods: {
    changeLayout (v) {
      this.currentLayout = v
    },
    resetLayout () {
      this.$refs.gridLayoutSplit.setLayout(this.defaultLayout)
    },
    addCard () {
      let index = this.currentLayout.length + 1
      this.$refs.gridLayoutSplit.addCard(index, this.addHeight, this.addSize, this.addDirect, {})
    }
  }
}
</script>
<style lang="less">
#app,body, html{
  height: 100%;
  width: 100%;
  margin: 0;
}
*{
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #8f9097 transparent;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::-webkit-scrollbar-thumb {
  background-color: #8f9097;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>
<style lang="less" scoped>

.App {
  padding: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    .logo{
      width: 64px;
      height: 64px;
      margin-right: 26px;
    }
    .title{
      margin-right: 32px;
      font-size: 26px;
      font-weight: bold
    }
  }
  .header-wrapper{
    padding: 10px;
    .control-wrapper{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .left-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 18px;
      }
      .right-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 18px;
      }
      .bt-class{
        cursor: pointer;
        height: 36px;
        color: #ffffff;
        line-height: 36px;
        padding: 0 13px;
        background: #538DFF;
        box-shadow: 0px 0px 12px 0px rgba(83,141,255,0.5000);
        border-radius: 25px;
        margin-right: 16px;
        &.edit{
          background: #ef0a0a;
          box-shadow: 0px 0px 12px 0px rgba(239, 10, 10, 0.5);
        }
        &:hover{
          filter: grayscale(20%);
        }
      }
      .input-class{
        width: 80px;
        padding-left: 8px;
        height: 30px;
      }
    }
    .item-wrapper{
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-gap: 8px;
      .item-card{
        text-align: center;
        padding: 8px 0;
        height: 40px;
        border: 1px gray solid;
        border-radius: 8px;
      }
    }
  }
  .layout-wrapper{
    height: 0;
    flex: 1;
    .content-wrapper{
      width: 100%;
      height: 100%;
      display: flex;
      font-size: 28px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
