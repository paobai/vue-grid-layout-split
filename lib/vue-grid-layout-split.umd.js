(function(){ try {var elementStyle = document.createElement('style'); elementStyle.appendChild(document.createTextNode(".vue-grid-layout[data-v-776597f4] {\n  height: 100%;\n  width: 100%;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item.vue-grid-placeholder {\n  background-color: black;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item.vue-grid-placeholder.not-allowed {\n  background-color: red;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item:not(.vue-grid-placeholder) {\n  border: 1px solid black;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .resizing {\n  opacity: 0.9;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .static {\n  background: #cce;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item.moving {\n  border-radius: 4px;\n  border: 2px solid #538dff;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .edit-mask {\n  background-color: rgba(94, 115, 159, 0.2);\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .delete-options {\n  position: absolute;\n  font-size: 16px;\n  color: #4e5969;\n  top: 0;\n  right: 0;\n  padding: 10px;\n  cursor: pointer;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .default-show-text {\n  font-size: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .no-drag {\n  height: 100%;\n  width: 100%;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .minMax {\n  font-size: 12px;\n}\n.vue-grid-layout[data-v-776597f4] .vue-grid-item .add {\n  cursor: pointer;\n}\n.vue-draggable-handle[data-v-776597f4] {\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  top: 0;\n  left: 0;\n  padding: 0 8px 8px 0;\n  background: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>\") no-repeat bottom right;\n  background-origin: content-box;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.layoutJSON[data-v-776597f4] {\n  background: #ddd;\n  border: 1px solid black;\n  margin-top: 10px;\n  padding: 10px;\n}\n.columns[data-v-776597f4] {\n  -moz-columns: 120px;\n  -webkit-columns: 120px;\n  columns: 120px;\n}")); document.head.appendChild(elementStyle);} catch(e) {console.error('vite-plugin-css-injected-by-js', e);} })();(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue-grid-layout"), require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue-grid-layout", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["vue-grid-layout-split"] = {}, global.vueGridLayout, global.vue));
})(this, function(exports2, vueGridLayout, vue) {
  "use strict";
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
        const { sumH: x0SumH, findInRangeList: x0FindInRangeList } = findMaxY(
          layout,
          0,
          lessThanY,
          Number.MIN_SAFE_INTEGER
        );
        const { sumH: x1SumH, findInRangeList: x1FindInRangeList } = findMaxY(
          layout,
          1,
          lessThanY,
          Number.MIN_SAFE_INTEGER
        );
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
      },
      editMask: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      realGridMargin() {
        if (this.gridMargin instanceof Array)
          return this.gridMargin;
        else
          return [this.gridMargin, this.gridMargin];
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
      this.setLayout(this.defaultLayout);
    },
    methods: {
      transformLayoutToLocal(sourceLayout) {
        let res = JSON.parse(JSON.stringify(sourceLayout));
        res.forEach((e) => {
          e.h = this.transH(e.height);
          e.resetH = e.h;
          e.i = e.id;
          e.w = e.type === GridItemType.BIG ? 2 : 1;
        });
        return res;
      },
      transH(height) {
        if (height < this.rowHeight)
          return 1;
        else {
          return +((height - this.rowHeight) / (this.rowHeight + this.realGridMargin[1]) + 1).toFixed(2);
        }
      },
      getLayout() {
        return JSON.parse(JSON.stringify(this.layout));
      },
      addCard(id, height, gridItemType, toTop = false, options) {
        let y = -1;
        if (!toTop) {
          this.layout.forEach((e) => {
            y = Math.max(y, e.y + e.h);
          });
        }
        let dist = { ...options, w: 1, x: 2, y, id, type: gridItemType, height };
        if (gridItemType === GridItemType.BIG)
          dist.x = 0;
        this.layout.push(...this.transformLayoutToLocal([dist]));
        this.$nextTick(() => {
          this.$refs.gridLayout.layoutUpdate();
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
            this.$refs.gridLayout.layoutUpdate();
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
      }
    }
  };
  const _withScopeId = (n) => (vue.pushScopeId("data-v-776597f4"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { class: "default-show-text" };
  const _hoisted_2 = ["onClick"];
  const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    t: "1659345568198",
    class: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "13132",
    width: "16",
    height: "16"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M972.8 204.8c28.16 0 51.2 23.04 51.2 51.2 0 28.16-23.04 51.2-51.2 51.2h-51.2v563.2c0 84.65-68.95 153.6-153.6 153.6H256c-84.65 0-153.6-68.95-153.6-153.6V307.2H51.2C23.04 307.2 0 284.16 0 256c0-28.16 23.04-51.2 51.2-51.2h256v-85.59C307.2 53.505 364.63 0 435.2 0h153.6c70.57 0 128 53.419 128 119.21v85.59h256z m-563.2-85.59v85.59h204.8v-85.59c0-7.935-10.923-16.81-25.6-16.81H435.2c-14.677 0-25.6 8.875-25.6 16.81zM819.2 870.4V307.2H204.8v563.2c0 28.16 22.955 51.2 51.2 51.2h512a51.2 51.2 0 0 0 51.2-51.2zM358.4 768c-28.16 0-51.2-23.04-51.2-51.2V512c0-28.16 23.04-51.2 51.2-51.2 28.16 0 51.2 23.04 51.2 51.2v204.8c0 28.16-23.04 51.2-51.2 51.2z m307.2 0c-28.16 0-51.2-23.04-51.2-51.2V512c0-28.16 23.04-51.2 51.2-51.2 28.16 0 51.2 23.04 51.2 51.2v204.8c0 28.16-23.04 51.2-51.2 51.2z",
      "p-id": "13133"
    })
  ], -1));
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_grid_item = vue.resolveComponent("grid-item");
    const _component_grid_layout = vue.resolveComponent("grid-layout");
    return vue.openBlock(), vue.createBlock(_component_grid_layout, {
      ref: "gridLayout",
      layout: $data.layout,
      "onUpdate:layout": _cache[1] || (_cache[1] = ($event) => $data.layout = $event),
      "col-num": 3,
      margin: $options.realGridMargin,
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
                vue.createElementVNode("div", _hoisted_1, vue.toDisplayString(item.i), 1)
              ], true),
              $props.editMode ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                $props.editMode && $props.editMask ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "edit-mask",
                  onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
                  }, ["stop"]))
                })) : vue.createCommentVNode("", true),
                vue.createElementVNode("div", {
                  class: "delete-options",
                  onClick: ($event) => $options.deleteCard(item.i)
                }, [
                  vue.renderSlot(_ctx.$slots, "delete-tip", { value: item }, () => [
                    _hoisted_3
                  ], true)
                ], 8, _hoisted_2)
              ], 64)) : vue.createCommentVNode("", true)
            ]),
            _: 2
          }, 1032, ["x", "y", "w", "h", "i", "class", "onMove", "onMoved"]);
        }), 128))
      ]),
      _: 3
    }, 8, ["layout", "margin", "row-height", "is-draggable", "is-resizable", "responsive", "onLayoutUpdated", "onLayoutReady"]);
  }
  var vueGridLayoutSplit = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-776597f4"]]);
  Object.defineProperty(exports2, "layoutInstall", {
    enumerable: true,
    get: function() {
      return vueGridLayout__default["default"];
    }
  });
  exports2.GridItemType = GridItemType;
  exports2.GridPosition = GridPosition;
  exports2["default"] = vueGridLayoutSplit;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
