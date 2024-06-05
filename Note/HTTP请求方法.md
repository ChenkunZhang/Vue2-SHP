### 浏览器中的 HTTP 请求方法：

1. **XMLHttpRequest (XHR)**
   - 传统的浏览器 API，用于发起同步或异步 HTTP 请求。
   - 示例：
     ```javascript
     const xhr = new XMLHttpRequest();
     xhr.open('GET', 'https://api.example.com/data');
     xhr.onload = function() {
       if (xhr.status === 200) {
         console.log(xhr.responseText);
       }
     };
     xhr.send();
     ```

2. **Fetch API**
   - 现代的、基于 Promise 的 API，用于发起 HTTP 请求。
   - 示例：
     ```javascript
     fetch('https://api.example.com/data')
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
     ```

### Node.js 中的 HTTP 请求方法：

1. **原生 HTTP 模块**
   - Node.js 内置的 `http` 模块可以用于 Node.js 环境中发起 HTTP 请求。
   - 示例：
     ```javascript
     const http = require('http');
     const options = {
       host: 'api.example.com',
       path: '/data',
       method: 'GET'
     };

     const req = http.request(options, res => {
       res.on('data', chunk => {
         console.log(chunk);
       });
     });

     req.end();
     ```

2. **原生 HTTPS 模块**
   - 类似于 `http` 模块，但是用于 HTTPS 请求。

3. **request 库**
   - 一个流行的第三方库，简化了 HTTP 请求的流程。
   - 安装：
     ```bash
     npm install request
     ```
   - 示例：
     ```javascript
     const request = require('request');
     request('http://api.example.com/data', function(error, response, body) {
       if (!error && response.statusCode == 200) {
         console.log(body);
       }
     });
     ```

4. **node-fetch**
   - Fetch API 的 Node.js 版本，提供了与浏览器相同的 `fetch` 函数。
   - 安装：
     ```bash
     npm install node-fetch
     ```
   - 示例：
     ```javascript
     const fetch = require('node-fetch');
     fetch('https://api.example.com/data')
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
     ```

5. **superagent**
   - 一个轻量级的库，用于发起 HTTP 请求，支持 Promise。
   - 安装：
     ```bash
     npm install superagent
     ```
   - 示例：
     ```javascript
     const superagent = require('superagent');
     superagent.get('https://api.example.com/data')
       .then(response => {
         console.log(response.body);
       })
       .catch(error => {
         console.error('Error:', error);
       });
     ```
### Axios ：
Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js 环境。它提供了一个简单易用的 API，用于发起 HTTP 请求。Axios 支持所有现代浏览器，并且可以被集成到任何基于 Promise 的 JavaScript 框架中，如 React、Vue.js、Angular 等。

以下是 Axios 的一些主要特性：

### 1. 易于使用
Axios 提供了一个简洁的 API，使得发起 HTTP 请求变得非常简单。

### 2. 基于 Promise
Axios 支持 Promises，这意味着你可以使用 `.then()` 和 `.catch()` 方法来处理响应，或者使用 `async/await` 语法。

### 3. 拦截器
Axios 允许你添加请求拦截器和响应拦截器，以便在请求发送前或响应返回前执行一些操作。

### 4. 请求取消
Axios 支持取消请求，这对于处理复杂的异步逻辑非常有用。

### 5. JSON
Axios 会自动将请求和响应数据转换为 JSON 格式。

### 6. CORS
Axios 支持跨源资源共享（CORS），使得客户端可以请求不同域上的资源。

### 7. 传输
Axios 默认使用 XMLHttpRequests 发送请求，但也支持使用其他传输方式，如 fetch API。

### 基本用法

#### 安装 Axios
使用 npm 或 yarn 安装 Axios：
```bash
npm install axios
```
或者
```bash
yarn add axios
```

#### 发起 GET 请求
```javascript
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### 发起 POST 请求
```javascript
axios.post('https://api.example.com/data', {
    firstName: 'John',
    lastName: 'Doe'
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### 使用 async/await
```javascript
async function getData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
```

#### 设置请求头
```javascript
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

#### 取消请求
```javascript
const source = axios.CancelToken.source();

axios.get('https://api.example.com/data', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  }
});

// 取消请求
source.cancel('Operation canceled by the user.');
```

Axios 是一个非常流行的 HTTP 客户端，因为它易于使用，功能强大，并且与现代 JavaScript 框架和库兼容。它使得发起 HTTP 请求和管理响应变得简单而直观。