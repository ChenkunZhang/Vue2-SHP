# Vue2 开发环境的搭建

Vue CLI 是 Vue.js 官方的命令行工具，用于快速生成和管理 Vue 项目。以下是使用 Vue CLI 搭建 Vue 2 开发环境的详细步骤：

## 安装 Vue CLI

### 全局安装 Vue CLI
1. **全局安装 Vue CLI**：
   首先，确保已安装 Node.js 环境。然后通过 npm 或 yarn 全局安装 Vue CLI。

   使用 npm:
   ```bash
   npm install -g @vue/cli
   ```

   或者使用 yarn:
   ```bash
   yarn global add @vue/cli
   ```

2. **检查 Vue CLI 版本**：
   安装完成后，可以通过运行以下命令检查 Vue CLI 是否安装成功以及其版本：
   ```bash
   vue --version
   ```

## 创建 Vue 2 项目

### 创建新项目
1. **创建新项目**：
   使用 Vue CLI 创建一个新的 Vue 2 项目。

   ```bash
   vue create my-vue2-project
   ```

   在提示选择 Vue 版本时，选择 Vue 2。

2. **项目结构**：
   创建的项目将包含以下基本结构：

   ```
   my-vue2-project
   ├── node_modules
   ├── public
   ├── src
   ├── .gitignore
   ├── babel.config.js
   ├── jsconfig.json
   ├── package-lock.json
   ├── package.json
   ├── README.md
   ├── vue.config.js
   ```

3. **开发服务器**：
   运行以下命令启动开发服务器，并在浏览器中查看应用。

   ```bash
   npm run serve
   ```

   或者如果你使用 yarn:

   ```bash
   yarn serve
   ```

## 配置项目

1. **修改配置**：
   根据项目需求修改 `vue.config.js` 文件，可以配置别名、代理、插件等。

2. **安装依赖**：
   如果需要额外的依赖，可以通过 npm 或 yarn 安装。

   ```bash
   npm install <package-name> --save
   ```

   或者

   ```bash
   yarn add <package-name>
   ```

   Less-loader
   ```bash
   npm install --save less less-loader@5
   ``` 
3. **开发插件**：
   安装 Vue 插件，如 Vuex、Vue Router 等。

   ```bash
   npm install vuex vue-router@3 --save
   ```


## 构建与部署

1. **构建生产版本**：
   运行以下命令构建生产环境的优化版本。

   ```bash
   npm run build
   ```

   或者

   ```bash
   yarn build
   ```

2. **部署**：
   将构建好的生产版本部署到服务器或使用静态网站托管服务。

## 附加配置

- **自动打开浏览器**：
  在 `package.json` 中的 `"serve"` 脚本添加 `--open` 参数。

  ```json
  {
    "scripts": {
      "serve": "vue-cli-service serve --open",
      ...
    }
  }
  ```

- **关闭 ESLint**：
  在 `vue.config.js` 中设置 `lintOnSave` 为 `false`。

  ```javascript
  module.exports = {
    lintOnSave: false
    ...
  };
  ```

- **设置 src 别名**：
  在 `jsconfig.json` 或 `tsconfig.json` 中配置别名。

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```

- **清除默认样式**： 
在`public/index.html`里引入reset文件

```HTML
    <!--清除默认样式-->
    <link rel="stylesheet" href="<%= BASE_URL %>reset.css">
```