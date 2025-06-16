# 🛠️ 开发指南

## 快速开始

### 环境要求

- Node.js 20+
- pnpm 8+
- Windows 11 (推荐)
- GlazeWM 3.1.0+
- Zebar 3.1.0+

### 安装依赖

```bash
cd zebar/hyprglaze-bar
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 监听模式构建
pnpm build:watch

# 预览构建结果
pnpm preview

# 清理构建产物
pnpm clean
```

## 项目结构

```
zebar/hyprglaze-bar/
├── src/
│   ├── components/     # React 组件
│   ├── hooks/         # 自定义 Hooks
│   ├── services/      # 服务层
│   ├── types/         # TypeScript 类型定义
│   ├── utils/         # 工具函数
│   └── config/        # 配置文件
└── dist/              # 构建产物
```

## 开发流程

1. **创建分支**：从 `main` 分支创建功能分支
2. **开发**：使用 `pnpm dev` 启动开发服务器
3. **构建**：运行 `pnpm build` 确保构建成功
4. **提交**：创建 Pull Request

## 发布流程

1. 更新版本号（`package.json` 和 `zpack.json`）
2. 更新 `CHANGELOG.md`
3. 创建 Git 标签：`git tag v1.x.x`
4. 推送标签：`git push origin v1.x.x`
5. GitHub Actions 自动创建发布

## 注意事项

- 所有代码必须通过 ESLint 和 Prettier 检查
- 遵循 [Conventional Commits](https://conventionalcommits.org/) 规范
- 保持代码简洁，避免过度工程化

## 故障排除

### 常见问题

**依赖安装失败**

```bash
pnpm clean
pnpm install
```

**构建失败**

```bash
pnpm clean
pnpm build
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 创建 Pull Request
5. 等待代码审查

更多信息请参考 [CONTRIBUTING.md](CONTRIBUTING.md)
