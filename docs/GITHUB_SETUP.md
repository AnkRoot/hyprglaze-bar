# 🚀 GitHub 仓库设置指南

本指南将帮助您将 HyprGlaze Bar 项目发布到 GitHub。

## 📋 发布前检查清单

### ✅ 必要文件检查

- [ ] **README.md** - 项目介绍和使用说明
- [ ] **LICENSE** - MIT 许可证文件
- [ ] **CHANGELOG.md** - 版本更新记录
- [ ] **CONTRIBUTING.md** - 贡献指南
- [ ] **.gitignore** - Git 忽略文件配置
- [ ] **.github/** - GitHub 配置目录
  - [ ] **ISSUE_TEMPLATE/** - Issue 模板
  - [ ] **PULL_REQUEST_TEMPLATE.md** - PR 模板
  - [ ] **workflows/** - GitHub Actions 工作流

### 🔒 敏感信息检查

- [ ] 确认没有 API 密钥或令牌
- [ ] 确认没有个人敏感信息
- [ ] 确认没有内部路径或配置
- [ ] 清理所有日志文件

## 🏗️ GitHub 仓库创建步骤

### 1. 创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `hyprglaze-bar`
   - **Description**: `现代化状态栏 - 将 Hyprland 的优雅体验通过 GlazeWM 带到 Windows`
   - **Visibility**: Public (开源项目)
   - **不要**勾选 "Add a README file"（我们已经有了）
   - **不要**勾选 "Add .gitignore"（我们已经有了）
   - **不要**选择 License（我们已经有了）

### 2. 推送本地代码

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/AnkRoot/hyprglaze-bar.git

# 添加所有文件
git add .

# 提交初始版本
git commit -m "🎉 Initial release: HyprGlaze Bar v1.0.0

✨ Features:
- Modern Windows status bar with Hyprland-inspired design
- Tiling window management integration with GlazeWM
- Real-time system monitoring (CPU, Memory, Network)
- Smart volume control with mute toggle
- Weather information with geolocation
- System tray integration
- Smooth animations and glass effects

🛠️ Tech Stack:
- React 19 + TypeScript 5.8
- Zebar 3.1 + GlazeWM integration
- TailwindCSS 4.1 + Framer Motion"

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 配置仓库设置

#### 📝 仓库描述和标签

在仓库主页点击 "⚙️ Settings"，然后：

1. **Description**: `现代化状态栏 - 将 Hyprland 的优雅体验通过 GlazeWM 带到 Windows`
2. **Website**: 可以留空或添加演示链接
3. **Topics** (标签):
   ```
   windows, statusbar, glazewm, hyprland, tiling-window-manager,
   react, typescript, zebar, modern-ui, desktop-customization
   ```

#### 🔧 功能设置

在 "General" 设置中：

- [ ] ✅ **Issues** - 启用问题追踪
- [ ] ✅ **Projects** - 启用项目管理（可选）
- [ ] ✅ **Wiki** - 启用 Wiki（可选）
- [ ] ✅ **Discussions** - 启用讨论功能
- [ ] ❌ **Packages** - 暂时不需要

#### 🛡️ 分支保护

在 "Branches" 设置中为 `main` 分支添加保护规则：

- [ ] **Require a pull request before merging**
- [ ] **Require status checks to pass before merging**
- [ ] **Require branches to be up to date before merging**

## 📦 创建首个 Release

### 1. 准备发布

简单的手动准备步骤：

```bash
# 1. 清理构建产物（可选）
cd zebar/hyprglaze-bar
rm -rf dist/

# 2. 构建项目
pnpm install
pnpm build

# 3. 返回项目根目录
cd ../..
```

### 2. 创建 GitHub Release

1. 在仓库主页点击 "Releases"
2. 点击 "Create a new release"
3. 填写 Release 信息：

   **Tag version**: `v1.0.0`

   **Release title**: `🎉 HyprGlaze Bar v1.0.0 - 首次发布`

   **Description**:

   ```markdown
   ## 🌟 首次发布

   现代化的 Windows 状态栏，将 Hyprland 的优雅体验带到 Windows！

   ### ✨ 主要功能

   - 🏗️ **平铺窗口管理** - 与 GlazeWM 深度集成
   - 📊 **系统监控** - CPU、内存、网络实时显示
   - 🔊 **智能音量控制** - 支持滚轮调节和一键静音
   - 🌤️ **天气信息** - 基于地理位置的实时天气
   - 🎨 **现代界面** - 毛玻璃效果和流畅动画
   - ⚙️ **系统托盘** - 完整的系统托盘集成

   ### 🛠️ 技术栈

   - React 19 + TypeScript 5.8 + Vite 6.3
   - TailwindCSS 4.1 + Framer Motion 12.16
   - Zebar 3.1 + GlazeWM 集成

   ### 📦 安装方法

   1. 下载 `hyprglaze-bar-v1.0.0.zip`
   2. 解压到任意目录
   3. 运行 `install.bat` 自动安装
   4. 重启 GlazeWM 即可使用

   ### ⚠️ 系统要求

   - Windows 10/11
   - GlazeWM 3.0.0+
   - Zebar 3.0.0+ (需手动升级)

   ---

   🙏 **感谢使用！** 如有问题请提交 Issue，欢迎 Star ⭐ 支持项目发展！
   ```

4. 上传发布包：

   - 将 `release/hyprglaze-bar-v1.0.0.zip` 拖拽到 "Attach binaries" 区域

5. 点击 "Publish release"

## 🎯 发布后优化

### 1. 添加项目徽章

在 README.md 顶部添加徽章：

```markdown
[![GitHub release](https://img.shields.io/github/release/YOUR_USERNAME/hyprglaze-bar.svg)](https://github.com/YOUR_USERNAME/hyprglaze-bar/releases)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/hyprglaze-bar.svg)](https://github.com/YOUR_USERNAME/hyprglaze-bar/stargazers)
[![GitHub license](https://img.shields.io/github/license/YOUR_USERNAME/hyprglaze-bar.svg)](https://github.com/YOUR_USERNAME/hyprglaze-bar/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/hyprglaze-bar.svg)](https://github.com/YOUR_USERNAME/hyprglaze-bar/issues)
```

### 2. 社区推广

- [ ] 在相关 Reddit 社区分享（r/Windows、r/unixporn）
- [ ] 在 Discord 社区分享（GlazeWM、Zebar 官方群）
- [ ] 考虑写技术博客介绍项目

### 3. 持续维护

- [ ] 定期更新依赖
- [ ] 及时回复 Issues 和 PR
- [ ] 根据用户反馈改进功能
- [ ] 保持文档更新

## 🔧 .github 配置说明

### 📁 配置文件结构

```
.github/
├── workflows/          # GitHub Actions 工作流
│   ├── ci.yml         # 构建检查（PR 和推送时触发）
│   └── release.yml    # 自动发布（标签推送时触发）
├── ISSUE_TEMPLATE/    # Issue 模板
│   ├── bug_report.yml # Bug 报告模板
│   └── feature_request.yml # 功能请求模板
└── PULL_REQUEST_TEMPLATE.md # PR 模板
```

### ⚙️ 工作流说明

**构建检查 (ci.yml)**：

- 触发条件：推送到 main 分支或创建 PR
- 执行步骤：安装依赖 → 构建项目
- 运行环境：Windows Latest

**自动发布 (release.yml)**：

- 触发条件：推送版本标签（如 v1.0.0）
- 执行步骤：构建 → 打包 → 创建 Release
- 自动生成发布说明

### 🏷️ 标签管理

项目使用以下标签分类 Issues：

- `bug` - Bug 报告
- `enhancement` - 功能请求
- `documentation` - 文档相关
- `good first issue` - 适合新手的问题

## 🆘 常见问题

### Q: 如何更新 GitHub 上的 README 链接？

A: 发布后需要将 README.md 中的 `YOUR_USERNAME` 替换为实际的 GitHub 用户名。

### Q: 如何设置自动化发布？

A: 项目已包含 GitHub Actions 工作流，推送标签时会自动创建 Release：

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Q: 如何处理用户反馈？

A: 通过 GitHub Issues 收集反馈，使用 Labels 进行分类管理。
