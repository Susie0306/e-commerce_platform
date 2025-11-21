电商平台 (E-Commerce Platform)

这是一个基于 React、TypeScript 和 Vite 构建的现代化响应式电商平台前端项目。项目集成了商品展示、多维度筛选、动态规格选择、购物车管理等核心功能，旨在提供流畅的 PC 端和移动端购物体验。

🛠 技术栈

    核心框架: React 19

    构建工具: Vite

    语言: TypeScript

    UI 组件库: Ant Design 5

    状态管理: Zustand

    路由管理: React Router 7

    数据源: DummyJSON (用于模拟后端 API)

✨ 核心功能

1.  商品列表页 (Product List)

    响应式布局:

        PC 端: 左侧固定筛选栏，右侧展示商品网格。

        移动端: 侧边栏隐藏，提供“筛选商品”按钮，点击唤起左侧抽屉进行筛选。

    多维度筛选: 支持按分类（男装、数码等）和价格区间进行筛选。

    排序功能: 支持按“价格”和“销量”进行升序或降序排列。

    分页系统: 自适应分页，PC 端每页展示 14 个商品，移动端每页展示 4 个商品。

    加载状态: 商品加载时展示骨架屏 (Skeleton)。

2.  商品详情页 (Product Detail)

    动态规格展示: 根据商品分类（如数码、美妆、鞋靴）自动展示不同的规格选项（如版本、鞋码、重量等）。

    智能交互:

        自动选中默认规格（当该维度只有一个选项时）。

        库存实时显示，无货时禁用“加入购物车”按钮。

    图片预览: 支持商品图片轮播，PC/移动端自适应高度和显示模式 (Contain)。

    推荐商品: 底部展示 4 个同类推荐商品，布局在各端均经过优化。

3.  购物车 (Shopping Cart)

    全局抽屉: 随时通过顶部导航栏唤起右侧购物车抽屉。

    商品管理: 展示已选商品的规格详情（颜色/尺码等）、价格及数量，支持从购物车中删除商品。

    自动计算: 实时计算购物车商品总价。

🚀 快速开始

1. 克隆项目

Bash

git clone <your-repo-url>
cd e-commerce_platform

2. 安装依赖

推荐使用 npm 或 yarn。
Bash

npm install

# 或者

yarn

3. 启动开发服务器

Bash

npm run dev

# 或者

yarn dev

启动后，访问控制台输出的本地地址（通常是 http://localhost:5173）即可查看项目。

4. 构建生产版本

Bash

npm run build

📦 数据模拟说明

项目使用了 src/mock/products.ts 来模拟后端逻辑。它通过 fetch 请求 dummyjson.com 的数据，并根据预设的映射规则（categoryCNMap）将英文分类转换为中文分类（如 "smartphones" -> "数码"），同时为不同分类生成对应的模拟库存和规格数据。

注意: 本项目为演示用途，部分商品图片来自随机图源 (picsum.photos)，可能会在刷新后变化。
