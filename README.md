# HTML to Rich Text Editor

一个简洁高效的在线工具，将 HTML 代码转换为可复制的富文本格式。

[English](README_EN.md) | 简体中文

## 功能特性

- 🎨 **实时预览** - 输入 HTML 代码即可即时查看渲染效果
- 📋 **一键复制** - 快速将富文本复制到剪贴板
- 🔒 **安全过滤** - 自动过滤危险标签，防止 XSS 攻击
- 📱 **响应式设计** - 支持桌面端和移动端
- 🌙 **深色主题** - 现代化的深色界面设计
- ⚡ **零依赖** - 纯原生 HTML/CSS/JavaScript，无需构建工具

## 快速开始

### 直接使用

直接在浏览器中打开 `index.html` 文件即可使用。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/html-to-rich-text.git

# 进入目录
cd html-to-rich-text

# 直接在浏览器中打开 index.html
```

## 使用方法

1. 在左侧文本框中输入或粘贴 HTML 代码
2. 右侧实时显示渲染后的富文本预览
3. 点击「复制富文本」按钮，一键复制到剪贴板
4. 在支持富文本的编辑器（如 Word、Google Docs、微信公众号编辑器）中粘贴

## 项目结构

```
html-to-rich-text/
├── src/
│   ├── index.html      # 主页面
│   ├── styles.css      # 样式文件
│   └── script.js       # 核心逻辑
├── assets/             # 静态资源（可选）
├── .gitignore          # Git 忽略配置
├── LICENSE             # MIT 许可证
├── README.md           # 项目文档
└── README_EN.md        # 英文文档
```

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代样式，包含 CSS 变量和 Flexbox/Grid 布局
- **JavaScript ES6+** - 原生 JavaScript，无框架依赖
- **Font Awesome 6.4** - 图标库（CDN）

## 浏览器兼容性

| 浏览器 | 支持版本 |
|--------|----------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## 安全说明

本工具会自动过滤以下危险标签和属性：
- 危险标签：`script`、`iframe`、`embed`、`object` 等
- 危险属性：所有以 `on` 开头的事件属性和 `javascript:` 伪协议

## License

本项目基于 [MIT License](LICENSE) 开源。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request
