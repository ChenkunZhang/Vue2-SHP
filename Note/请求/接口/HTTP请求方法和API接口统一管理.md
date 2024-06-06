# 目录
- 浏览器中的 HTTP 请求方法
- API接口统一管理
- 跨域问题

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
### Axios：[Axios文档](https://www.axios-http.cn/)
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

### 创建 Axios 实例
Axios 提供了一个创建实例（instance）的功能，这样你可以设置特定的配置并在整个应用中复用这个实例。创建实例可以带来以下好处：

1. **共享配置**：多个请求可以共用同一个实例的配置，例如 baseURL、timeout、headers 等。
2. **拦截器**：可以为实例添加请求和响应拦截器。
3. **取消令牌**：可以更容易地管理取消令牌。

以下是如何使用 `axios.create()` 方法创建一个新的 Axios 实例：

```javascript
// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// 使用新创建的实例进行请求
instance.get('/get_endpoint')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  });

// 对外暴露service
export default service
```

### 设置默认配置

你可以使用 `axios.defaults` 来设置全局默认配置，这将影响所有使用 Axios 的请求：

```javascript
// 设置全局默认的 baseURL
axios.defaults.baseURL = 'https://api.example.com';

// 设置全局默认的 headers
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### 添加拦截器

你可以给 Axios 实例添加请求拦截器和响应拦截器：

```javascript
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

### 取消请求

使用 Axios 实例，你可以很容易地取消请求：

```javascript
const source = axios.CancelToken.source();

instance.get('/get_endpoint', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  }
});

// 取消请求
source.cancel('Operation canceled by the user.');
```

创建 Axios 实例提供了一种强大的方式来管理和复用请求配置，使得代码更加模块化和易于维护。

# 接口统一管理

API 接口的统一管理是后端服务和前端应用开发中的一个关键实践，它有助于维护、测试、监控和使用 API。以下是一些实现 API 接口统一管理的策略和方法：

### 1. API 网关
使用 API 网关作为所有 API 请求的入口点。API 网关可以处理请求路由、负载均衡、认证、限流、监控和日志记录等。

### 2. 版本控制
为 API 维护不同的版本，确保向后兼容性，并允许用户平滑过渡到新版本。

### 3. RESTful 原则
遵循 RESTful 架构原则设计 API，使用统一的资源标识符（URIs）、HTTP 方法和状态码。

### 4. 文档化
使用工具如 Swagger (OpenAPI) 或 Postman 来创建和维护 API 文档。确保文档是最新的，并且提供足够的信息以供开发者理解和使用 API。

### 5. 命名空间
为 API 接口使用命名空间，以区分不同的服务或模块。

### 6. 统一认证
实现统一的认证机制，如 OAuth2 或 JWT，确保安全性和一致性。

### 7. 中间件
在后端框架中使用中间件来处理跨请求的功能，如日志记录、错误处理、请求验证等。

### 8. 服务注册与发现
在微服务架构中，使用服务注册与发现机制来管理服务实例的地址和状态。

### 9. 监控与日志
集成监控系统来追踪 API 的性能和使用情况，使用日志记录来帮助调试和审计。

### 10. 统一错误处理
设计统一的错误响应格式，使得客户端能够一致地处理来自不同 API 的错误。

### 11. 请求限制
设置统一的请求限制策略，如速率限制，以防止滥用。

### 12. 接口测试
编写自动化测试来验证 API 的功能和性能。

### 13. 代码生成
使用代码生成工具根据 API 规范自动生成客户端代码或服务端接口。

### 14. 团队协作
确保团队成员遵循统一的开发和部署流程，使用 Git 等版本控制系统来管理代码变更。

### 15. API 管理工具
使用 API 管理平台，如 Apigee、AWS API Gateway 或 Azure API Management，来集中管理 API 生命周期。

```javascript
//api.js
import request from "./request"

// API接口统一管理

// TypeNav 三级菜单接口
    // /api/product/getBaseCategoryList GET
export function reqBaseCategoryList(){
    return request({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}
```




### 跨域问题

跨域问题（Cross-Origin Resource Sharing, CORS）是浏览器中的一个安全特性，它阻止了来自一个域名的网页请求另一个域名的资源。这是为了防止恶意网站对其他网站的数据进行未经授权的访问。然而，这也可能限制了开发者在构建需要与第三方服务交互的应用程序时的能力。

#### 跨域问题的原因：
- **同源策略**：浏览器的同源策略要求协议、域名和端口都相同，否则就认为是跨域，从而禁止了请求。

#### 跨域问题的表现：
- 当尝试从你的网站向另一个域名发起 AJAX 请求时，浏览器会拦截请求并返回错误。

#### 处理跨域问题的方法：

##### 1. CORS 策略
服务器可以通过在响应头中添加 `Access-Control-Allow-Origin` 来启用 CORS。例如：

```http
Access-Control-Allow-Origin: *
```
这允许所有域名访问资源，或者你可以指定特定的域名来代替 `*`。

##### 2. JSONP（已废弃）
JSONP（JSON with Padding）是早期用于解决跨域问题的一种技术，通过 `<script>` 标签来获取数据。但由于安全性和现代 CORS 的存在，JSONP 已逐渐被淘汰。

##### 3. 代理服务器
使用代理服务器是处理跨域请求的一种常见方法，尤其是在开发过程中。代理服务器可以让你的前端应用通过它来转发请求到不同的后端服务，从而绕过浏览器的同源策略限制。

#### 如何使用代理处理跨域问题：

- **开发环境代理**
在开发过程中，你可以配置一个本地代理服务器，将前端应用的请求转发到后端服务。

  - **Webpack Dev Server**：如果你使用 Webpack，可以通过 `devServer.proxy` 配置代理。
  ```javascript
  // webpack.config.js
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://backend.server.com',
          changeOrigin: true,
          pathRewrite: {'^/api' : ''}
        }
      }
    }
  };
  ```

  - **Vue CLI**：如果你使用 Vue CLI，可以在 `vue.config.js` 中配置代理。
  ```javascript
  // vue.config.js
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://backend.server.com',
          changeOrigin: true,
          pathRewrite: {'^/api' : ''}
        }
      }
    }
  };
  ```

- **Nginx 代理**
如果你有一个运行 Nginx 的服务器，可以设置 Nginx 作为代理服务器来转发请求。
  ```nginx
    location /api/ {
      proxy_pass http://backend.server.com/api/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  ```

- **Node.js 代理服务器**
你可以使用 Node.js 创建一个简单的代理服务器，例如使用 `http-proxy-middleware`。

  ```javascript
    const express = require('express');
    const { createProxyMiddleware } = require('http-proxy-middleware');
    
    const app = express();
    
    app.use('/api', createProxyMiddleware({
      target: 'http://backend.server.com',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    }));
    
    app.listen(3000, () => console.log('Proxy server running on port 3000'));
  ```

- **设置环境变量**
在部署时，你可能希望根据环境变量来决定是否启用代理。这可以通过条件语句在配置文件中实现。

- **代理的注意事项**
  - **安全性**：代理服务器可能会引入安全风险，确保你的代理配置是安全的。
  - **性能**：代理服务器可能会增加请求的延迟，特别是在网络条件不佳的情况下。
  - **维护**：使用代理可能会增加系统的复杂性，需要额外的维护工作。

通过使用代理，你可以在开发过程中轻松地解决跨域问题，而无需更改后端服务的 CORS 设置。这使得前端应用能够无缝地与不同的后端服务进行交互。

##### 4. Postman 测试
如果你使用 Postman 进行 API 测试，可以在 Postman 的设置中禁用 CORS 校验，但这仅适用于测试目的。

##### 5. 开启浏览器的 CORS 支持
某些浏览器允许你临时或永久地开启 CORS 支持，但这通常不推荐，因为它会降低安全性。

##### 6. 使用 CORS 任何策略（CORS Anywhere）
CORS Anywhere 是一个 Node.js 代理服务器，可以添加 CORS 头到任何请求中。你可以部署自己的 CORS Anywhere 服务或使用在线服务。

##### 7. 服务端配置
如果你控制服务端，确保服务器配置了适当的 CORS 头，以允许来自你的前端应用域名的请求。

##### 示例：Node.js 服务器设置 CORS

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// 使用 CORS 中间件
app.use(cors());

// 或者只允许特定域名
app.use(cors({
  origin: 'https://allowed-domain.com'
}));

// 你的路由和逻辑
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is CORS-enabled for a specific domain.' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

##### 注意事项：
- **安全性**：在允许跨域请求时，要特别注意不要暴露敏感数据。
- **测试**：在开发和测试阶段，确保正确处理跨域问题，避免在生产环境中出现问题。
