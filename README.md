# Claude AI Chatbox

A full-featured ChatGPT-like AI chatbox powered by Claude AI via Puter.js. Ask anything, upload documents, and get intelligent responses - all for free with no API keys required.

## 🌟 Features

- **Free Claude Access**: No API keys needed, powered by Puter.js's "User-Pays" model
- **Full Chat Interface**: Multi-turn conversations with full history
- **Document Upload**: Upload and analyze files (.txt, .pdf, .md, .json, .py, .js, images, etc.)
- **Multiple Claude Models**: Choose from Opus 4.7, Sonnet 4.6, Haiku 4.5, or Opus Fast
- **Chat History**: Auto-save conversations to browser storage
- **Code Syntax Highlighting**: Beautiful code block rendering
- **Keyboard Shortcuts**: Quick commands for common actions
- **Responsive Design**: Works on desktop, tablet, mobile
- **Dark Theme**: GitHub-style dark interface
- **Custom System Prompt**: Customize Claude's behavior

## 🚀 Quick Start

### Open Now (No Installation)
1. Open `index.html` in any modern browser
2. Start chatting with Claude immediately
3. Upload files using the attachment button

### Run Locally
```bash
cd /path/to/bismillah
python -m http.server 8000
# Open: http://localhost:8000
```

## 💬 How to Use

1. **Type a Message**: Ask anything in the input box
2. **Upload Files** (Optional): Click 📎 to attach documents
3. **Press Enter**: Send your message
4. **Get Response**: Claude responds with full context
5. **Continue Chatting**: Build on previous messages
6. **Start New Chat**: Click "New Chat" for a fresh conversation

## 📁 What You Can Ask Claude To Do

- **Writing & Analysis**: Essays, summaries, analysis
- **Coding**: Debug code, write functions, explain algorithms
- **Math & Logic**: Solve problems, explain concepts
- **Document Analysis**: Upload and analyze files
- **Brainstorming**: Ideas, planning, strategy
- **Explanations**: Complex topics simplified
- **Creative Work**: Stories, poems, creative writing
- **Questions**: Anything you're curious about

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in message |
| `Ctrl + K` / `Cmd + K` | New chat |
| `Ctrl + L` / `Cmd + L` | Clear current chat |

## 🎨 Claude Models Available

| Model | Speed | Best For |
|-------|-------|----------|
| **Claude Opus 4.7** | Standard | Complex reasoning, advanced analysis |
| **Claude Sonnet 4.6** | Fast | Balanced (Recommended) |
| **Claude Haiku 4.5** | Very Fast | Quick responses, simple tasks |
| **Claude Opus 4.6 Fast** | 2.5x faster | Time-sensitive tasks |

## 📄 Supported File Formats

- **Documents**: `.txt`, `.md`, `.json`, `.pdf`
- **Code**: `.py`, `.js`, `.java`, `.cpp`, `.html`, `.css`
- **Data**: `.csv`
- **Images**: `.jpg`, `.png`, `.gif`, `.webp`

## 🔧 Customization

### Customize Claude's Behavior
1. Click ⚙️ (Settings) button
2. Edit "System Prompt" to customize how Claude responds
3. Click "Save Settings"

### Change Colors/Theme
Edit CSS variables at top of `style.css`:
```css
:root {
    --primary-color: #1f6feb;
    --accent-color: #58a6ff;
    --bg-primary: #0d1117;
    /* ... etc ... */
}
```

## 💾 Storage & Privacy

- **Chat History**: Saved locally in browser (localStorage)
- **Files**: Processed locally, sent to Claude temporarily
- **No Cloud Storage**: Data doesn't persist on external servers
- **Privacy**: Your conversations are between you and Claude

## 🌐 Deployment

### GitHub Pages (Free)
```bash
# Push to GitHub repo
# Enable Pages in settings
# Live at: https://username.github.io/repo-name
```

### Netlify (Recommended)
```bash
# Go to netlify.com
# Drag & drop folder
# Instant deployment!
```

### Other Options
- Vercel: `vercel deploy`
- Firebase: `firebase deploy`
- Any static hosting works!

See `DEPLOYMENT.md` for detailed instructions.

## 🔐 Security & Privacy

- **No Backend**: Runs entirely in your browser
- **No Sign-ups**: No accounts needed
- **No Tracking**: No analytics or surveillance
- **Puter.js**: Open-source, transparent API
- **HTTPS**: All deployments use SSL/TLS

## 📱 Mobile

The chatbox is fully responsive and works great on:
- Smartphones
- Tablets
- Desktop computers

Sidebar auto-hides on mobile, tap ☰ to toggle.

## 🐛 Troubleshooting

### Messages not sending?
- Check internet connection
- Ensure Puter.js CDN is loaded (check console F12)
- Try a different Claude model

### File upload not working?
- Check file size (keep under 1MB for best results)
- Ensure file format is supported
- Files are read as text - binary files may not work well

### Chat history disappeared?
- Check if browser storage was cleared
- Disable browser storage clearing for this domain
- Consider exporting chat as markdown

### Slow responses?
- Try Claude Haiku for faster responses
- Reduce file size if uploading documents
- Check your internet speed

## 📚 Advanced Features

### Export Chat
Right-click on any message and copy to save locally.

### Multi-Tab Support
Open multiple tabs, each maintains separate chat history.

### System Prompts
Customize how Claude responds by modifying the system prompt in settings.

## 🚀 Tips for Best Results

1. **Be Specific**: Clear questions get better answers
2. **Include Context**: More details = better responses
3. **Use Files**: Upload documents for analysis
4. **Iterate**: Follow up with clarifications
5. **Choose Model**: Pick Opus for complex tasks, Haiku for speed

## 🤝 Contributing

This is open-source! Feel free to:
- Fork and modify
- Add features
- Share improvements
- Report issues

## 📄 License

Free to use and modify for personal and commercial use.

## ⭐ Star & Share

If you find this useful, please star the repository and share with friends!

---

**Built with ❤️ using Claude AI via Puter.js**

Free • Unlimited • No API Keys • Open Source

**Last Updated**: April 2026

