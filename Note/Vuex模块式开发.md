# Vuex模块式开发
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式和库。它提供了一个集中式存储管理应用所有组件的状态，并以一种可预测的方式进行状态更新。Vuex 非常适合用于大型单页应用程序（SPA），它可以帮助开发者更好地维护和管理应用的状态。

以下是 Vuex 的一些关键概念和特点：

##### 1. State（状态）
- 它是应用层面的各种数据的集合，如用户信息、认证状态等。

##### 2. Getters（获取器）
- 类似于组件的计算属性，允许你从 store 中获取数据。

##### 3. Mutations（变更）
- 是同步函数，用于修改 state。Vuex 规定只能通过提交 mutation 来改变状态。

##### 4. Actions（动作）
- 类似于 mutation，但可以包含异步操作。在异步操作完成后，可以提交 mutation。

##### 5. Modules（模块）
- 允许你将 store 分割成模块，每个模块拥有自己的 state、getters、mutations、actions。

##### 6. Store（存储）
- Vuex 的核心，包含了应用的所有状态和允许状态改变的方法。

##### 7. Strict Mode（严格模式）
- 在开发模式下，Vuex 会开启严格模式，确保所有状态的改变都是可追踪的。

### 基本用法

#### 安装 Vuex

```bash
npm install vuex --save
```

#### 创建 Store

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }
});
```

#### 在 Vue 组件中使用

```javascript
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapActions(['incrementAsync'])
  }
};
```

#### 模板中使用

```html
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ doubleCount }}</p>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>
```

### 注意事项

- 确保在应用启动时只创建一次 store 实例。
- 使用 `mapState`、`mapGetters`、`mapMutations` 和 `mapActions` 辅助函数简化在组件中的状态和方法的绑定。
- Vuex 不是解决所有问题的银弹，对于小型项目或状态不复杂的项目，直接使用组件的 `data` 和 `props` 可能更简单。

Vuex 通过集中管理状态和提供响应式数据流，使得状态管理变得更加可预测和易于维护。对于需要处理复杂状态逻辑的 Vue.js 应用，Vuex 是一个非常有用的工具。

# Vuex实现模块化
在 Vuex 中实现模块化并导出模块，可以让你的状态管理结构更加清晰和可维护。以下是如何实现 Vuex 模块的导出和组合的步骤：

### 步骤 1: 定义模块并导出

对于每个模块，你需要定义其状态、获取器、变异和动作，然后导出该模块。

```javascript
// user.js
export default {
  namespaced: true, // 启用命名空间
  state: () => ({
    currentUser: null,
  }),
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    fetchCurrentUser({ commit }) {
      // 模拟异步操作
      setTimeout(() => {
        const user = { name: 'John Doe' };
        commit('setCurrentUser', user);
      }, 1000);
    },
  },
};
```

### 步骤 2: 在主 Store 中导入和组合模块

在主 `store.js` 文件中，导入所有模块并使用 `Vuex.Store` 的 `modules` 选项来组合它们。

```javascript
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user'; // 导入 user 模块
// import product from './product'; // 如果有 product 模块，也导入它

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user, // 使用模块名称作为键，模块对象作为值
    // product, // 如果有 product 模块，也添加到 modules 对象中
  },
});
```

### 步骤 3: 在 Vue 组件中使用模块

在 Vue 组件中，使用 Vuex 提供的辅助函数来映射模块的状态、获取器、动作和变异。

```javascript
// MyComponent.vue
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['currentUser']), // 使用模块名和状态名称进行映射
  },
  methods: {
    ...mapActions('user', ['fetchCurrentUser']), // 使用模块名和动作名称进行映射
  },
};
```

### 步骤 4: 使用命名空间

如果你的模块启用了命名空间，那么在组件中访问模块的状态和方法时，需要确保使用正确的命名空间。

```javascript
// MyComponent.vue
computed: {
  // 映射命名空间模块的状态
  currentUser() {
    return this.$store.state.user.currentUser;
  },
},
methods: {
  // 调用命名空间模块的动作
  fetchCurrentUser() {
    this.$store.dispatch('user/fetchCurrentUser');
  },
},
```

### 注意事项：

- 使用 `export default` 来导出模块，这样你可以在主 store 文件中导入它们。
- 在 `store.js` 中，通过 `import` 语句导入每个模块，然后在 `modules` 对象中以模块名为键来引用它们。
- 在组件中，确保使用 `mapState`、`mapGetters`、`mapActions` 和 `mapMutations` 辅助函数时，指定正确的模块名和命名空间。
- 启用命名空间的模块可以在组件中通过 `this.$store.state.moduleName` 的方式访问状态，以及使用 `this.$store.dispatch('moduleName/actionName')` 的方式分发动作。

通过这种方式，你的 Vuex store 可以被组织成多个模块，每个模块负责管理应用的一部分状态，使得整个状态管理更加模块化和可维护。