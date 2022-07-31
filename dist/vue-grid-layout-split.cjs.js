(function(){ try {var elementStyle = document.createElement('style'); elementStyle.appendChild(document.createTextNode("[data-v-0890e584] .vue-grid-layout {\n  height: 100%;\n  width: 100%;\n  background: #eee;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item.vue-grid-placeholder {\n  background-color: black;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item.vue-grid-placeholder.not-allowed {\n  background-color: red;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item:not(.vue-grid-placeholder) {\n  background: #ccc;\n  border: 1px solid black;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .resizing {\n  opacity: 0.9;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .static {\n  background: #cce;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item.moving {\n  border-radius: 4px;\n  border: 2px solid #538dff;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .edit-mask {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .delete-options {\n  position: absolute;\n  font-size: 16px;\n  color: #4e5969;\n  top: 0;\n  right: 0;\n  padding: 10px;\n  cursor: pointer;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .delete-options:hover {\n  color: #538dff;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .default-show-text {\n  font-size: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .no-drag {\n  height: 100%;\n  width: 100%;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .minMax {\n  font-size: 12px;\n}\n[data-v-0890e584] .vue-grid-layout .vue-grid-item .add {\n  cursor: pointer;\n}\n.vue-draggable-handle[data-v-0890e584] {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: 0;\n  left: 0;\n  padding: 0 8px 8px 0;\n  background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>\") no-repeat bottom right;\n  background-origin: content-box;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.layoutJSON[data-v-0890e584] {\n  background: #ddd;\n  border: 1px solid black;\n  margin-top: 10px;\n  padding: 10px;\n}\n.columns[data-v-0890e584] {\n  -moz-columns: 120px;\n  -webkit-columns: 120px;\n  columns: 120px;\n}")); document.head.appendChild(elementStyle);} catch(e) {console.error('vite-plugin-css-injected-by-js', e);} })();"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vueGridLayout = require("vue-grid-layout");
var vue = require("vue");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var vueGridLayout__default = /* @__PURE__ */ _interopDefaultLegacy(vueGridLayout);
var GridItemType = /* @__PURE__ */ ((GridItemType2) => {
  GridItemType2[GridItemType2["SMALL"] = 0] = "SMALL";
  GridItemType2[GridItemType2["BIG"] = 1] = "BIG";
  return GridItemType2;
})(GridItemType || {});
var GridPosition = /* @__PURE__ */ ((GridPosition2) => {
  GridPosition2[GridPosition2["LEFT"] = 0] = "LEFT";
  GridPosition2[GridPosition2["RIGHT"] = 1] = "RIGHT";
  return GridPosition2;
})(GridPosition || {});
function fixCardHeight(layout) {
  checkLessThanZeroY(layout);
  fixCardSameHeight(layout);
}
function fixCardSameHeight(layout) {
  const findLeftBigList = getLeftBigList(layout);
  findLeftBigList.forEach((e, index) => {
    const lessThanY = e.y + e.h;
    let moreThanY = 0;
    if (index > 0)
      moreThanY = findLeftBigList[index - 1].y + findLeftBigList[index - 1].h;
    const { sumH: x0SumH, lastDist: x0LastDist } = findMaxY(layout, 0, lessThanY, moreThanY);
    const { sumH: x1SumH, lastDist: x1LastDist } = findMaxY(layout, 1, lessThanY, moreThanY);
    if (x0LastDist && x1LastDist) {
      const maxYAddH = Math.max(x0SumH, x1SumH);
      x0LastDist.h = x0LastDist.h + maxYAddH - x0SumH;
      x1LastDist.h = x1LastDist.h + maxYAddH - x1SumH;
    }
  });
}
function findMaxY(layout, x, lessThanY, moreThanY) {
  const findInRangeList = layout.filter((e) => e.x === x && e.y + e.h < lessThanY && e.y >= moreThanY).sort((a, b) => a.y - b.y);
  findInRangeList.forEach((e) => {
    e.h = e.resetH;
  });
  let sumH = 0;
  findInRangeList.forEach((e) => {
    sumH += e.h;
  });
  return { sumH, lastDist: findInRangeList[findInRangeList.length - 1], findInRangeList };
}
function getLeftBigList(layout) {
  return layout.filter((e) => {
    return e.type === 1 && e.x === 0;
  }).sort((a, b) => a.y - b.y);
}
function checkLessThanZeroY(layout) {
  const findLeftBigList = getLeftBigList(layout);
  const fixLeft = () => {
    if (findLeftBigList.length > 0 && findLeftBigList[0].y <= 0) {
      const leftList = layout.filter((e) => {
        return e.x === 0 || e.x === 1;
      }).sort((a, b) => a.y - b.y);
      const diffY = Math.abs(findLeftBigList[0].y);
      leftList.forEach((e) => {
        e.y += diffY;
      });
    } else {
      let lessThanY = Number.MAX_SAFE_INTEGER;
      let moreThanY = Number.MAX_SAFE_INTEGER;
      if (findLeftBigList.length > 0) {
        lessThanY = findLeftBigList[0].y + findLeftBigList[0].h;
        moreThanY = findLeftBigList[0].y;
      }
      const { sumH: x0SumH, findInRangeList: x0FindInRangeList } = findMaxY(layout, 0, lessThanY, Number.MIN_SAFE_INTEGER);
      const { sumH: x1SumH, findInRangeList: x1FindInRangeList } = findMaxY(layout, 1, lessThanY, Number.MIN_SAFE_INTEGER);
      let startX0Y = 0;
      let startX1Y = 0;
      if (x0FindInRangeList.length !== 0)
        startX0Y = x0FindInRangeList[0].y;
      if (x1FindInRangeList.length !== 0)
        startX1Y = x1FindInRangeList[0].y;
      const maxYAddHBefore = Math.max(x0SumH, x1SumH);
      const maxYAddHAfter = Math.max(x0SumH + Math.abs(startX0Y), x1SumH + Math.abs(startX1Y));
      const diffY = maxYAddHAfter - maxYAddHBefore;
      x0FindInRangeList.forEach((e) => {
        e.y += Math.abs(startX0Y);
      });
      x1FindInRangeList.forEach((e) => {
        e.y += Math.abs(startX1Y);
      });
      layout.filter((e) => {
        return e.y >= moreThanY && (e.x === 0 || e.x === 1);
      }).forEach((e) => {
        e.y += diffY;
      });
    }
  };
  const fixRight = () => {
    const rightList = layout.filter((e) => {
      return e.x === 2;
    }).sort((a, b) => a.y - b.y);
    if (rightList.length === 0)
      return;
    const diffY = Math.abs(rightList[0].y);
    rightList.forEach((e) => {
      e.y += diffY;
    });
  };
  fixLeft();
  fixRight();
}
var vueGridLayoutSplit_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  name: "vueGridLayoutSplit",
  components: {
    GridLayout: vueGridLayout.GridLayout,
    GridItem: vueGridLayout.GridItem
  },
  props: {
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
    };
  },
  watch: {
    editMode: {
      handler(v) {
        if (v) {
          this.draggable = true;
        } else {
          this.draggable = false;
        }
      },
      immediate: true
    }
  },
  created() {
    this.layout = this.transformLayoutToLocal(this.defaultLayout);
  },
  methods: {
    transformLayoutToLocal(sourceLayout) {
      let res = JSON.parse(JSON.stringify(sourceLayout));
      let transH = (height) => {
        if (height < this.rowHeight)
          return 1;
        else {
          return +((height - this.rowHeight) / (this.rowHeight + this.gridMargin) + 1).toFixed(2);
        }
      };
      res.forEach((e) => {
        e.h = transH(e.height);
        e.resetH = e.h;
        e.i = e.id;
        e.w = e.type === GridItemType.BIG ? 2 : 1;
      });
      return res;
    },
    getLayout() {
      return JSON.parse(JSON.stringify(this.layout));
    },
    addCard(i, h, gridItemType, options) {
      let maxY = 0;
      this.layout.forEach((e) => {
        maxY = Math.max(maxY, e.y + e.h);
      });
      let dist = { ...options, w: 1, x: 2, y: maxY, h, resetH: h, i, type: gridItemType };
      if (gridItemType === GridItemType.BIG) {
        dist.w = 2;
        dist.x = 0;
      }
      this.layout.push(...this.transformLayoutToLocal([dist]));
      this.$nextTick(() => {
        this.checkHeight();
        this.$nextTick(() => {
          this.changeLayoutEvent();
          this.$emit("addCardEvent");
        });
      });
    },
    deleteCard(i) {
      let findIndex = this.layout.findIndex((e) => e.i === i);
      if (findIndex !== -1) {
        this.layout.splice(findIndex, 1);
        this.$nextTick(() => {
          this.changeLayoutEvent();
          this.$refs.gridLayout.layoutUpdate();
        });
      }
    },
    removeCard(i) {
      this.layout.splice(i, 1);
    },
    movedEvent(i) {
      let dist = this.findDistById(i);
      if (!this.checkCanMove(dist)) {
        let cashLayout = JSON.parse(JSON.stringify(this.cashLayout));
        this.$nextTick(() => {
          this.layout = cashLayout;
        });
      }
    },
    layoutUpdatedEvent() {
      this.moving = false;
      this.cashLayout = null;
      this.checkHeight();
      let distDom = this.$refs.gridLayout.$el.getElementsByClassName(".moving");
      if (distDom.length > 0) {
        distDom.forEach((e) => {
          e.classList.remove("moving");
        });
      }
      this.changeLayoutEvent();
    },
    findDistById(i) {
      return this.layout.find((e) => e.i === i);
    },
    startMoveEvent(i, x) {
      let distCard = this.findDistById(i);
      if (!this.moving) {
        this.moving = true;
        this.cashLayout = JSON.parse(JSON.stringify(this.layout));
        this.layout.forEach((e) => {
          e.h = e.resetH;
        });
      }
      let distDom = this.getGridItem(this.$refs.gridLayout.$el, i);
      distDom.classList.add("moving");
      let gridPlaceholder = this.getGridPlaceholder(this.$refs.gridLayout.$el);
      if (distCard.type === GridItemType.BIG && x !== 0) {
        gridPlaceholder.classList.add("not-allowed");
      } else {
        gridPlaceholder.classList.remove("not-allowed");
      }
    },
    getGridPlaceholder(gridLayoutDom) {
      return gridLayoutDom.getElementsByClassName("vue-grid-placeholder")[0];
    },
    getGridItem(gridLayoutDom, i) {
      return gridLayoutDom.getElementsByClassName(`sk-grid-item-${i}`)[0];
    },
    layoutReadyEvent() {
      this.checkHeight();
    },
    checkHeight() {
      let sourceLayout = JSON.stringify(this.layout);
      fixCardHeight(this.layout);
      if (JSON.stringify(this.layout) !== sourceLayout) {
        this.$nextTick(() => {
        });
      }
    },
    clearLayout() {
      this.layout.splice(0, this.layout.length);
      this.$nextTick(() => {
        this.changeLayoutEvent();
      });
    },
    changeLayoutEvent() {
      this.$emit("changeLayout", this.getLayout());
    },
    checkCanMove(dist) {
      return !(dist.type === GridItemType.BIG && (dist.x === 1 || dist.x === 2));
    },
    setLayout(sourceLayout) {
      this.layout = this.transformLayoutToLocal(sourceLayout);
      this.checkHeight();
    }
  }
};
const _hoisted_1 = { style: { "width": "100%", "height": "100%" } };
const _hoisted_2 = { class: "default-show-text" };
const _hoisted_3 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_grid_item = vue.resolveComponent("grid-item");
  const _component_grid_layout = vue.resolveComponent("grid-layout");
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_grid_layout, {
      ref: "gridLayout",
      layout: $data.layout,
      "onUpdate:layout": _cache[1] || (_cache[1] = ($event) => $data.layout = $event),
      "col-num": 3,
      margin: [$props.gridMargin, $props.gridMargin],
      "row-height": $data.rowHeight,
      "is-draggable": $data.draggable,
      "is-resizable": $data.resizable,
      responsive: $data.responsive,
      "vertical-compact": true,
      "use-css-transforms": true,
      onLayoutUpdated: $options.layoutUpdatedEvent,
      onLayoutReady: $options.layoutReadyEvent
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.layout, (item) => {
          return vue.openBlock(), vue.createBlock(_component_grid_item, {
            key: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            i: item.i,
            "drag-ignore-from": ".delete-options",
            class: vue.normalizeClass(`sk-grid-item-${item.i}`),
            onMove: $options.startMoveEvent,
            onMoved: $options.movedEvent
          }, {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "default", { value: item }, () => [
                vue.createElementVNode("div", _hoisted_2, vue.toDisplayString(item.i), 1)
              ], true),
              $props.editMode ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                $props.editMode ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "edit-mask",
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["stop"]))
                })) : vue.createCommentVNode("", true),
                vue.createElementVNode("div", {
                  class: "delete-options",
                  onClick: ($event) => $options.deleteCard(item.i)
                }, " delete ", 8, _hoisted_3)
              ], 64)) : vue.createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["x", "y", "w", "h", "i", "class", "onMove", "onMoved"]);
        }), 128))
      ]),
      _: 3
    }, 8, ["layout", "margin", "row-height", "is-draggable", "is-resizable", "responsive", "onLayoutUpdated", "onLayoutReady"])
  ]);
}
var vueGridLayoutSplit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0890e584"]]);
Object.defineProperty(exports, "layoutInstall", {
  enumerable: true,
  get: function() {
    return vueGridLayout__default["default"];
  }
});
exports.GridItemType = GridItemType;
exports.GridPosition = GridPosition;
exports["default"] = vueGridLayoutSplit;
