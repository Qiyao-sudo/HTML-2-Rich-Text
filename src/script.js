class HtmlToRichTextEditor {
    constructor() {
        this.htmlInput = document.getElementById('htmlInput');
        this.preview = document.getElementById('preview');
        this.clearBtn = document.getElementById('clearBtn');
        this.exampleBtn = document.getElementById('exampleBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.toast = document.getElementById('toast');
        
        this.dangerousTags = ['script', 'iframe', 'embed', 'object', 'applet', 'form', 'input', 'button', 'select', 'textarea'];
        this.dangerousAttributes = ['onclick', 'onload', 'onerror', 'onmouseover', 'onkeydown', 'onchange', 'javascript:', 'vbscript:', 'data:'];
        
        this.initEventListeners();
        this.loadDefaultContent();
    }
    
    initEventListeners() {
        this.htmlInput.addEventListener('input', this.debounce(this.updatePreview.bind(this), 100));
        this.clearBtn.addEventListener('click', this.clearInput.bind(this));
        this.exampleBtn.addEventListener('click', this.loadExampleCode.bind(this));
        this.copyBtn.addEventListener('click', this.copyRichText.bind(this));
    }
    
    debounce(func, delay) {
        let timer = null;
        return function(...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    sanitizeHtml(html) {
        let sanitized = html;
        
        this.dangerousTags.forEach(tag => {
            const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
            sanitized = sanitized.replace(regex, '');
            const selfClosingRegex = new RegExp(`<${tag}[^>]*/?>`, 'gi');
            sanitized = sanitized.replace(selfClosingRegex, '');
        });
        
        this.dangerousAttributes.forEach(attr => {
            const regex = new RegExp(`\\s${attr.replace(':', '\\:')}\\s*=\\s*["'][^"']*["']`, 'gi');
            sanitized = sanitized.replace(regex, '');
        });
        
        return sanitized;
    }
    
    updatePreview() {
        const html = this.htmlInput.value;
        const sanitized = this.sanitizeHtml(html);
        this.preview.innerHTML = sanitized || '';
    }
    
    clearInput() {
        this.htmlInput.value = '';
        this.preview.innerHTML = '';
        this.htmlInput.focus();
    }
    
    loadExampleCode() {
        const example = `<!DOCTYPE html>
<html>
<head>
    <title>示例内容</title>
</head>
<body>
    <h1 style="color: #6366f1;">欢迎使用 HTML 转富文本编辑器</h1>
    
    <p>这是一个 <strong>功能强大</strong> 的在线工具，可以帮助您将 HTML 代码转换为可复制的富文本格式。</p>
    
    <h2>主要特点</h2>
    <ul>
        <li>实时预览 HTML 渲染效果</li>
        <li>支持复制富文本到剪贴板</li>
        <li>安全过滤危险代码</li>
        <li>响应式设计，支持移动端</li>
    </ul>
    
    <blockquote style="background: #f8fafc; padding: 12px; border-radius: 8px;">
        "优秀的工具可以极大地提升工作效率。"
    </blockquote>
    
    <p>您可以访问我们的 <a href="https://example.com" style="color: #6366f1; text-decoration: none;">官方网站</a> 获取更多信息。</p>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background: #f1f5f9;">
            <th style="border: 1px solid #e2e8f0; padding: 12px;">功能</th>
            <th style="border: 1px solid #e2e8f0; padding: 12px;">状态</th>
        </tr>
        <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">HTML 预览</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px; color: #22c55e;">✓ 已完成</td>
        </tr>
        <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">富文本复制</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px; color: #22c55e;">✓ 已完成</td>
        </tr>
    </table>
    
    <p style="color: #64748b; font-size: 0.9rem; margin-top: 20px;">
        <code style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px;">提示：</code> 
        编辑左侧的 HTML 代码，右侧实时显示渲染效果。点击「复制富文本」按钮即可复制带样式的内容。
    </p>
</body>
</html>`;
        
        this.htmlInput.value = example;
        this.updatePreview();
    }
    
    async copyRichText() {
        if (!this.preview.innerHTML.trim()) {
            this.showToast('请先输入 HTML 代码');
            return;
        }
        
        try {
            const range = document.createRange();
            range.selectNodeContents(this.preview);
            
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            document.execCommand('copy');
            
            selection.removeAllRanges();
            
            this.showToast('复制成功！');
        } catch (err) {
            await this.fallbackCopy();
        }
    }
    
    async fallbackCopy() {
        try {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = this.preview.innerHTML;
            tempDiv.style.position = 'fixed';
            tempDiv.style.left = '-9999px';
            document.body.appendChild(tempDiv);
            
            const range = document.createRange();
            range.selectNodeContents(tempDiv);
            
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            document.execCommand('copy');
            
            selection.removeAllRanges();
            document.body.removeChild(tempDiv);
            
            this.showToast('复制成功！');
        } catch (err) {
            this.showToast('复制失败，请手动复制');
            console.error('Copy error:', err);
        }
    }
    
    showToast(message) {
        const toastText = this.toast.querySelector('span');
        toastText.textContent = message;
        
        this.toast.classList.remove('show');
        void this.toast.offsetWidth;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2500);
    }
    
    loadDefaultContent() {
        const defaultContent = `<h1 style="color: #6366f1;">HTML 转富文本编辑器</h1>
<p>在此输入 HTML 代码，右侧将实时显示渲染效果。</p>
<p>点击 <strong>「示例代码」</strong> 按钮查看演示效果。</p>`;
        
        this.htmlInput.value = defaultContent;
        this.updatePreview();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HtmlToRichTextEditor();
});