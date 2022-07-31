<template>
  <div style="width: 100%; height: 100%">
    <grid-layout
      ref="gridLayout"
      v-model:layout="layout"
      :col-num="3"
      :margin="[gridMargin, gridMargin]"
      :row-height="rowHeight"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="responsive"
      :vertical-compact="true"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
      @layout-ready="layoutReadyEvent"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        drag-ignore-from=".delete-options"
        :class="`sk-grid-item-${item.i}`"
        @move="startMoveEvent"
        @moved="movedEvent"
      >
        <slot :value="item">
          <div class="default-show-text">{{ item.i }}</div>
        </slot>
        <template v-if="editMode">
          <div v-if="editMode" class="edit-mask" @click.stop=""></div>
          <div class="delete-options" @click="deleteCard(item.i)">
            delete
          </div>
        </template>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import { GridLayout } from "vue-grid-layout"
import { GridItem } from "vue-grid-layout"
import { GridItemType, fixCardHeight } from "./help"
export default {
  name: "vueGridLayoutSplit",
  components: {
    GridLayout,
    GridItem
  },
  props: {
    // let layout = [
    //   {id: 0, 'x': 0, 'y': 0, 'height': 100, type: GridItemType.SMALL},
    //   {id: 1, 'x': 0, 'y': 0, 'height': 200, type: GridItemType.BIG},
    //   {id: 2, 'x': 0, 'y': 0, 'height': 150, type: GridItemType.SMALL},
    //
    //   {id: 3, 'x': 1, 'y': 0, 'height': 400, type: GridItemType.SMALL},
    //   {id: 4, 'x': 1, 'y': 0, 'height': 130, type: GridItemType.SMALL},
    //   {id: 5, 'x': 1, 'y': 0, 'height': 100, type: GridItemType.SMALL},
    //
    //   {id: 6, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL},
    //   {id: 7, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL},
    //   {id: 8, 'x': 2, 'y': 0, 'height': 100, type: GridItemType.SMALL}
    // ]
    defaultLayout: {
      type: Array,
      default: () => []
    },
    editMode: {
      type: Boolean,
      default: false
    },
    gridMargin: {
      type: Number,
      default: 20
    }
  },
  emits: ["changeLayout", "addCardEvent"],
  data() {
    return {
      layout: [],
      draggable: true,
      resizable: false,
      responsive: false,
      moving: false,
      index: 0,
      cashLayout: [],
      gridPlaceholder: null,
      rowHeight: 10
    }
  },
  watch: {
    editMode: {
      handler(v) {
        if (v) {
          this.draggable = true
        } else {
          this.draggable = false
        }
      },
      immediate: true
    }
  },
  created() {
    this.layout = this.transformLayoutToLocal(this.defaultLayout)
  },
  methods: {
    transformLayoutToLocal(sourceLayout) {
      let res = JSON.parse(JSON.stringify(sourceLayout))
      let transH = height => {
        if (height < this.rowHeight) return 1
        else {
          return +((height - this.rowHeight) / (this.rowHeight + this.gridMargin) + 1).toFixed(2)
        }
      }
      res.forEach(e => {
        e.h = transH(e.height)
        e.resetH = e.h
        e.i = e.id
        e.w = e.type === GridItemType.BIG ? 2 : 1
      })
      return res
    },
    getLayout() {
      return JSON.parse(JSON.stringify(this.layout))
    },
    addCard(i, h, gridItemType, options) {
      let maxY = 0
      this.layout.forEach(e => {
        maxY = Math.max(maxY, e.y + e.h)
      })
      let dist = { ...options, w: 1, x: 2, y: maxY, h, resetH: h, i: i, type: gridItemType }
      if (gridItemType === GridItemType.BIG) {
        dist.w = 2
        dist.x = 0
      }
      this.layout.push(...this.transformLayoutToLocal([dist]))
      this.$nextTick(() => {
        this.checkHeight()
        this.$nextTick(() => {
          this.changeLayoutEvent()
          this.$emit("addCardEvent")
        })
      })
    },
    deleteCard(i) {
      let findIndex = this.layout.findIndex(e => e.i === i)
      if (findIndex !== -1) {
        this.layout.splice(findIndex, 1)
        this.$nextTick(() => {
          this.changeLayoutEvent()
          this.$refs.gridLayout.layoutUpdate()
        })
      }
    },
    removeCard(i) {
      this.layout.splice(i, 1)
    },
    movedEvent(i) {
      let dist = this.findDistById(i)
      if (!this.checkCanMove(dist)) {
        let cashLayout = JSON.parse(JSON.stringify(this.cashLayout))
        this.$nextTick(() => {
          this.layout = cashLayout
        })
      }
    },
    layoutUpdatedEvent() {
      this.moving = false
      this.cashLayout = null
      this.checkHeight()
      let distDom = this.$refs.gridLayout.$el.getElementsByClassName(".moving")
      if (distDom.length > 0) {
        distDom.forEach(e => {
          e.classList.remove("moving")
        })
      }
      this.changeLayoutEvent()
    },
    findDistById(i) {
      return this.layout.find(e => e.i === i)
    },
    startMoveEvent(i, x) {
      let distCard = this.findDistById(i)
      if (!this.moving) {
        this.moving = true
        this.cashLayout = JSON.parse(JSON.stringify(this.layout))
        this.layout.forEach(e => {
          e.h = e.resetH
        })
      }
      let distDom = this.getGridItem(this.$refs.gridLayout.$el, i)
      distDom.classList.add("moving")
      let gridPlaceholder = this.getGridPlaceholder(this.$refs.gridLayout.$el)
      if (distCard.type === GridItemType.BIG && x !== 0) {
        gridPlaceholder.classList.add("not-allowed")
      } else {
        gridPlaceholder.classList.remove("not-allowed")
      }
    },
    getGridPlaceholder(gridLayoutDom) {
      return gridLayoutDom.getElementsByClassName("vue-grid-placeholder")[0]
    },
    getGridItem(gridLayoutDom, i) {
      return gridLayoutDom.getElementsByClassName(`sk-grid-item-${i}`)[0]
    },
    layoutReadyEvent() {
      this.checkHeight()
    },
    checkHeight() {
      let sourceLayout = JSON.stringify(this.layout)
      fixCardHeight(this.layout)
      if (JSON.stringify(this.layout) !== sourceLayout) {
        this.$nextTick(() => {
          // this.$refs.gridLayout.layoutUpdate()
        })
      }
    },
    clearLayout() {
      this.layout.splice(0, this.layout.length)
      this.$nextTick(() => {
        this.changeLayoutEvent()
      })
    },
    changeLayoutEvent() {
      this.$emit("changeLayout", this.getLayout())
    },
    checkCanMove(dist) {
      return !(dist.type === GridItemType.BIG && (dist.x === 1 || dist.x === 2))
    },
    setLayout(sourceLayout) {
      this.layout = this.transformLayoutToLocal(sourceLayout)
      this.checkHeight()
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.vue-grid-layout) {
  height: 100%;
  width: 100%;
  background: #eee;
  .vue-grid-item {
    &.vue-grid-placeholder {
      background-color: black;
      &.not-allowed {
        background-color: red;
      }
    }
    &:not(.vue-grid-placeholder) {
      background: #ccc;
      border: 1px solid black;
    }
    .resizing {
      opacity: 0.9;
    }
    .static {
      background: #cce;
    }
    &.moving {
      border-radius: 4px;
      border: 2px solid #538dff;
    }
    .edit-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .delete-options {
      position: absolute;
      font-size: 16px;
      color: #4e5969;
      top: 0;
      right: 0;
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: #538dff;
      }
    }
    .default-show-text {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .no-drag {
      height: 100%;
      width: 100%;
    }
    .minMax {
      font-size: 12px;
    }
    .add {
      cursor: pointer;
    }
  }
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  padding: 0 8px 8px 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat bottom right;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>
