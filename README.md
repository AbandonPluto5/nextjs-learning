Next.js 学习记录...

### update: 2024-01-24

##### 初始

1. 创建: `npx create-next-app@latest`或`pnpm create next-app`或`yarn create next-app`
2. 运行: `npm run dev`
3. 构建: `npx next build`
4. 获取系统相关信息: `npx next info`

##### App Router

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

##### 链接和导航

两种方式

1. `<Link>` 一个拓展了 a 标签的内置组件
   1.1 基础使用: `<Link href="/dashboard#settings">Dashboard</Link>` 支持 hash 值用于实现跳转到页面的某个位置
   1.2 支持动态渲染
   1.3 获取当前路径名: `const pathname = usePathname()`
2. useRouter Hook
   2.1 和 React 中保持一致 `const router = useRouter()`

##### 动态路由

无法确保路由地址时使用 路由名称会作为 param prop 传给 layout、page、route

1. [folderName] 如: [id]、[name]
   匹配一层 如: 访问`/blog/a`时 params 的值为`{id: 'a'}`
2. [...folderName]
   匹配后面所有 如: 访问`/blog/a/js/ts`时 params 的值为`{id: ['a','js','ts']}`
3. [[...folderName]]
   与 2 的区别是不带参数的路由也会被匹配 如: [[...folderName]]上一级文件夹为 blog 访问`/blog`时 params 的值为`{}`

##### 路由组

用()标记文件夹为路由组 组织文件夹被映射到 URL 中 可用于: 按站点、意图、团队等将路由分组或在同一级中创建多个布局及根布局
如: `(marketing)/about/page.js`会被解析为`/about`
