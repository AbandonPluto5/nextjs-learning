Next.js 学习记录...

## update: 2024-01-24

#### 初始

1. 创建: `npx create-next-app@latest`或`pnpm create next-app`或`yarn create next-app`
2. 运行: `npm run dev`
3. 构建: `npx next build`
4. 获取系统相关信息: `npx next info`

#### App Router

1. 定义路由: 一个文件夹对应一个路由片段 如`app/dashboard/settings`对应路由为`/dashboard/settings`
2. 定义页面: 文件名为 page 后缀支持 jsx/js/tsx/ts
3. 定义布局: 文件名为 layout
   app 目录必须包含 layout 文件 且根部剧必须包含 html 和 body 标签
4. 定义模板: 文件名为 template
5. 布局和模板的区别
   用法一样 最大的区别就是 template 不会保留状态 如: template 可用于记录页面访问次数 如果依赖 useEffect 和 useState 的功能 使用 layout 就会保留状态
6. 定义加载中页面: 文件名为 loading 实现是基于 React 的 Suspense
7. 定义错误处理: 文件名为 error 如果是捕获根布局和根模板中的错误则为 global-error 实现是基于 React 的 ErrorBoundary
8. 定义 404 页面: 文件名为 not-found
9. 层级关系 从外层到内层
   layout > template > error > loading > not-found > page

#### 链接和导航

两种方式

1. `<Link>` 一个拓展了 a 标签的内置组件
   1.1 基础使用: `<Link href="/dashboard#settings">Dashboard</Link>` 支持 hash 值用于实现跳转到页面的某个位置
   1.2 支持动态渲染
   1.3 获取当前路径名: `const pathname = usePathname()`
2. useRouter Hook
   2.1 和 React 中保持一致 `const router = useRouter()`

#### 动态路由

无法确保路由地址时使用 路由名称会作为 param prop 传给 layout、page、route

1. [folderName] 如: [id]、[name]
   匹配一层 如: 访问`/blog/a`时 params 的值为`{id: 'a'}`
2. [...folderName]
   匹配后面所有 如: 访问`/blog/a/js/ts`时 params 的值为`{id: ['a','js','ts']}`
3. [[...folderName]]
   与 2 的区别是不带参数的路由也会被匹配 如: [[...folderName]]上一级文件夹为 blog 访问`/blog`时 params 的值为`{}`

#### 路由组

用()标记文件夹为路由组 组织文件夹被映射到 URL 中 可用于: 按站点、意图、团队等将路由分组或在同一级中创建多个布局及根布局
如: `(marketing)/about/page.js`会被解析为`/about`

#### 平行路由

1. 场景: 可以在同一个布局中同时或者条件渲染一个或多个页面 如弹窗的展示(详: app-ParallelRoutes-demo)
2. 使用方式: 以@作为开头进行文件夹的命名 这个文件夹下的 page.js 会自动注入文件夹同级 layout 的 props 中
3. 可以为每个路由定义独立的错误处理和 loading 界面
4. 不会影响 URL
5. default.js 文件: 用于展示默认界面 防止访问其它路由时 无法匹配到平行路由时报 404

#### 拦截路由

1. 允许在当前布局内加载应用其它部分的路由
2. 场景: 信息流的展示 通过指定页面访问路由和直接访问该路由时的展示效果不同时可以使用
3. 使用方式: 以(.)/(..)/(..)(..)/(...)作为文件夹的开头 匹配路由层级 而路由组、平行路由这种不会影响 URL 的文件夹不会被计算层级
   - `/feed/(..)photo`对应的路由是`/feed/photo` 要拦截的是路由是`/photo` 只差了一个层级 所以使用`(..)`
   - (.) 匹配同一层级
   - (..) 匹配上一层级
   - (..)(..) 匹配上上层级
   - (...) 表示匹配根目录

#### 路由处理程序

1. 简介: 使用 Web Request 和 Response API 对给定的路由自定义处理逻辑 写接口 用于实现前后端交互
2. 定义路由处理程序: route.js 文件 只要在 app 下的文件夹中就可以 不能和 page.js 在同一级
3. 支持的请求方法: GET、POST、PUT、PATCH、DELETE、HEAD、OPTIONS
4. 请求方法的参数
   - request: NextRequest 对象 可以读取 cookies 和处理 URL
     - 获取路径名 `request.nextUrl.pathname`
     - 获取 URL 参数 `request.nextUrl.searchParams`
   - context 包含动态路由参数 params 的对象
5. 缓存
   - 使用 Response 对象的 GET 请求的返回结果默认会被缓存
   - 退出缓存的情况
     - 使用 Request 对象的 GET 请求
     - 使用除开 GET 方法以外的其它 HTTP 方法
     - 使用 cookies、headers 等动态函数
     - 使用`request.cookies.get('***')`这种底层方式也会退出缓存
     - 路由段配置项中声明了动态模式 `export const dynamic = 'force-dynamic'`
   - 重新验证缓存
     - 使用`next.revalidate`选项设置时效
     - 使用路由段配置选项 `export const revalidate = 60`
