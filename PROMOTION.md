# HyprGlaze Bar - 将 Hyprland 体验带到 Windows

<div align="center">

**🚀 Linux 平铺窗口管理 + Windows 原生体验 = 完美工作流**

_5 分钟安装，立即享受 i3/Hyprland 级别的高效桌面管理_

</div>

---

## ✨ 核心优势

### 🎯 **真正的平铺窗口管理**

- ✅ 自动平铺布局，告别手动调整窗口大小
- ✅ 10+ 个独立工作区，项目分离管理
- ✅ 键盘驱动操作，保持 Linux 用户习惯
- ✅ YAML 配置文件，就像 dotfiles 一样优雅

### 📊 **丰富的状态栏信息**

- ✅ CPU/内存/网络实时监控
- ✅ 智能音量控制，支持滚轮调节
- ✅ 地理位置天气信息
- ✅ 优化的系统托盘显示

### 🎨 **现代化视觉体验**

- ✅ 毛玻璃效果，融入 Windows 11 设计语言
- ✅ 流畅动画过渡，工作区切换丝滑
- ✅ 响应式设计，适配各种分辨率
- ✅ React 19 构建，高性能低占用

---

## 🚀 快速开始

### 系统要求

- Windows 10/11
- [GlazeWM](https://github.com/glzr-io/glazewm) v3.0+
- [Zebar](https://github.com/glzr-io/zebar) v3.0+ ⚠️ **重要：必须手动升级到 3.0+版本**

### 一键安装

```bash
git clone https://github.com/AnkRoot/hyprglaze-bar.git
cd hyprglaze-bar
# 复制配置文件
copy "glazewm\config.yaml" "%USERPROFILE%\.glzr\glazewm\config.yaml"
copy "zebar\settings.json" "%USERPROFILE%\.glzr\zebar\settings.json"
xcopy /E /I "zebar\hyprglaze-bar" "%USERPROFILE%\.glzr\zebar\hyprglaze-bar"
```

重启 GlazeWM (`Win + Ctrl + R`) 即可生效！

---

## 🎁 立即体验

**项目地址**: [github.com/AnkRoot/hyprglaze-bar](https://github.com/AnkRoot/hyprglaze-bar)

- 🌟 给项目点 Star 支持开发
- 🐛 遇到问题提 Issue，快速响应
- 💡 功能建议欢迎讨论

**适合人群**: Linux 用户(i3/Hyprland/sway) • Windows 开发者 • 效率控 • 多任务处理者

---

_让每一次窗口切换都成为享受，让每一个工作日都充满效率。_ **🚀**
