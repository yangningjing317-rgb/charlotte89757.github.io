# Pathwise Vercel 部署说明

这个版本适合部署到 Vercel。网页是静态页面，右下角 AI 对话框通过 `api/chat.js` 调用硅基流动。

## 环境变量

在 Vercel 的 Environment Variables 里添加：

```text
SILICONFLOW_API_KEY=你的硅基流动密钥
SILICONFLOW_MODEL=Qwen/Qwen2.5-72B-Instruct
SILICONFLOW_API_URL=https://api.siliconflow.cn/v1/chat/completions
```

如果你暂时没有开通 72B 模型，可以把 `SILICONFLOW_MODEL` 换成你硅基流动控制台里已经可用的模型。

## 部署设置

```text
Framework Preset: Other
Build Command: 留空
Output Directory: 留空
Install Command: 留空或默认
Root Directory: ./
```

仓库最外层必须直接包含：

```text
index.html
stage-01.html
stage-10.html
styles.css
app.js
chat-widget.js
holland-data.js
vercel.json
api/
assets/
```

不要把这些文件再套进一个总文件夹。

## 修改环境变量后

每次修改环境变量后，都需要重新部署：

```text
Project → Deployments → Redeploy
```
