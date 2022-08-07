<h1 align="center">vue-grid-layout-split</h1>

<p align="center">
<a href="https://www.npmjs.com/package/vue-grid-layout">
<img src="https://img.shields.io/npm/v/vue-grid-layout.svg"/> 
<img src="https://img.shields.io/npm/dm/vue-grid-layout.svg"/></a> 
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.2.x-brightgreen.svg"/></a>
</p>

`vue-grid-layout-split`是模仿阿里云控制台布局方式的栅格布局系统, 适用于Vue.js。 
**灵感源自于 [vue-grid-layout](https://www.npmjs.com/package/vue-grid-layout)**

### **当前版本:** 1.0.0 (支持 Vue 2.2+)

### **Vue 2.1.10 及以下请使用 [2.1.3](https://github.com/jbaysolutions/vue-grid-layout/tree/2.1.3)**
### **Vue 1 请使用 [1.0.3](https://github.com/jbaysolutions/vue-grid-layout/tree/1.0.3)**

<br/>

[在线演示](https://paobai.github.io/vue-grid-layout-split/)

## 特性

* 1比1模仿阿里云控制台模块布局方式
* 可拖拽
* 可自定义栅格元素高度
* 固定左右布局
* 可自定义栅格元素间隙
* 可序列化和还原的布局


## 入门指南

### 安装

#### npm

    # 使用 npm
	npm install vue-grid-layout-split --save

    # 使用 yarn
    yarn add vue-grid-layout-split


引入

再main.js中使用组件
```javascript
import vueGridLayoutSplit from "vue-grid-layout-split";
app.use(vueGridLayoutSplit);
```

### 使用

```javascript
import { GridItemType } from "vue-grid-layout-split";
// ······
var defaultLayout = [
  {id: 0, x: 0, y: 0, height: 100, type: GridItemType.SMALL},
  {id: 1, x: 0, y: 0, height: 200, type: GridItemType.BIG},
  {id: 2, x: 0, y: 0, height: 150, type: GridItemType.SMALL},

  {id: 3, x: 1, y: 0, height: 250, type: GridItemType.SMALL},
  {id: 4, x: 2, y: 0, height: 130, type: GridItemType.SMALL},
  {id: 5, x: 1, y: 0, height: 100, type: GridItemType.SMALL},

  {id: 6, x: 2, y: 0, height: 100, type: GridItemType.SMALL},
  {id: 7, x: 2, y: 0, height: 180, type: GridItemType.SMALL},
  {id: 8, x: 2, y: 0, height: 100, type: GridItemType.SMALL}
];

new Vue({
    el: '#app',
    data: {
        defaultLayout: defaultLayout,
    },
});
```


```html
  <vue-grid-layout-split ref="gridLayoutSplit"
                         :gridMargin="[20, 20]"
                         :editMode="true"
                         :defaultLayout="defaultLayout">
    <template #default="{value}">
      <div class="content-wrapper">
            <span style="margin-left: 16px">
              序号：{{value.id}}
            </span>
      </div>
    </template>
  </vue-grid-layout-split>
```


### 文档

#### 属性

##### vueGridLayoutSplit

* **defaultLayout**

    * type: `Array<GridItem>`
    * required: `true`

    数据源。值必须为 `Array`，其数据项为 `Object`。 每条数据项有 `id`, `x`, `y`, `height` 和 `type(GridItemType)` 属性。 
其中 `id`, `height`为必填项。请参考下面的 `GridItem`。

* **editMode**

    * type: `Boolean`
    * required: `false`
    * default: `false`

    组件是否为编辑状态，为编辑状态可以进行拖动和删除操作。

* **gridMargin**

    * type: `Number | Array`
    * required: `false`
    * default: `20`

    定义栅格之间的间距,为列表时第一个参数为行间距，第二个参数为列间距。

* **editMask**

    * type: `Boolean`
    * required: `false`
    * default: `true`

    是否需要编辑状态的mask蒙版

##### GridItem

* **id**

    * type: `String | Number`
    * required: `true`

    栅格中元素的ID。

* **x**

    * type: `Number`
    * required: `false`
    * default: `0`

    标识栅格元素位于第几列。一共三列，其中左边布局为0，1列。右边布局为2列，其中的当`type`为`GridItemType.BIG`时候，自动调整为`0`。需为自然数。

* **y**

    * type: `Number`
    * required: `false`
    * default: `0`

    标识栅格元素位于第几行，需为自然数。

* **height**

    * type: `Number`
    * required: `true`

    标识栅格元素的高度，单位为px。

* **type**

  * type: `GridItemType`
  * required: `false`
  * default: `GridItemType.SMALL`

  标识栅格元素的类型。

* **其他参数**
  * 其他参数自动保存到属性中，改变布局时一并返回

##### GridItemType

  * SMALL: 小号元素
  * BIG: 大号元素

#### 事件

* **changeLayout**

    组件布局改变时的回调方法， 返回为当前layout

* **addCardEvent**

    调用新增方法`addCard`成功时的回调
#### 方法

* **getLayout**
  获取当前layout布局
  * 参数: 无
  * 返回
    *  `Array<GridItem>`

* **setLayout**
  重新设置layout布局
  * 参数
    * `Array<GridItem>`
  * 返回
    *  无

* **clearLayout**
  清空当前layout
  * 参数: 无
  * 返回: 无

* **deleteCard**
  删除某个栅格
  * 参数 
    * id（元素的id）
  * 返回：无

* **addCard**
  添加某个栅格
  * 参数
    * obj
      * type: `GridItemType`
      * required: `true`
    * toTop（是否从头加入栅格元素， false从尾部）
      * type: `Boolean`
      * required: `false`
      * default: `true`
  * 返回: 无


## 如何贡献

请提交issue或PR。

