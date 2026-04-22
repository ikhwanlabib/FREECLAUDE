# Technical Documentation - Claude AI Chatbox

## Architecture Overview

```
┌─────────────────────────────────────────┐
│        Browser (Vanilla JavaScript)     │
│  ├─ index.html (Structure)              │
│  ├─ style.css (Styling)                 │
│  └─ script.js (ChatApp Class Logic)     │
└──────────────┬──────────────────────────┘
               │
      ┌────────▼────────────────┐
      │   Puter.js Client SDK   │
      │   (JavaScript Library)  │
      └────────┬────────────────┘
               │
      ┌────────▼──────────────────┐
      │  Claude AI API (Cloud)    │
      │  via Puter.js Bridge      │
      └───────────────────────────┘
```

## Technology Stack

- **Frontend**: Vanilla JavaScript (no frameworks, no build step)
- **Styling**: CSS with CSS custom properties
- **API Integration**: Puter.js SDK
- **Storage**: Browser localStorage API
- **Code Highlighting**: Highlight.js library
- **Icons**: Font Awesome 6 CDN

## File Structure

### index.html
**Purpose**: DOM structure and layout

**Key Sections**:
- `.app-container` - Main flex wrapper
- `.sidebar` - Chat history sidebar (left)
- `.chat-container` - Main chat area (right)
  - `.chat-header` - Top bar with model selector
  - `.messages-container` - Chat messages display
  - `.input-section` - Message input area
- Modals for settings and help

**Main Components**:
```html
<div class="app-container">
  <aside class="sidebar">
    <button class="new-chat-btn">New Chat</button>
    <div class="chats-list"></div>
  </aside>
  
  <main class="chat-container">
    <div class="chat-header"></div>
    <div class="messages-container"></div>
    <div class="input-section"></div>
  </main>
</div>
```

### style.css
**Purpose**: All styling and theming

**Key Features**:
- CSS custom properties (variables) for theming
- Flexbox layout for responsive design
- Dark GitHub-themed color scheme
- Mobile responsive with breakpoints
- Smooth animations and transitions

**Color Palette**:
```css
:root {
  --primary-color: #1f6feb;      /* GitHub Blue */
  --bg-primary: #0d1117;         /* Very Dark Background */
  --bg-secondary: #161b22;       /* Dark Background */
  --text-primary: #c9d1d9;       /* Light Gray Text */
  --text-secondary: #8b949e;     /* Medium Gray Text */
  --accent-color: #58a6ff;       /* Bright Blue */
  --border-color: #30363d;       /* Border Color */
  --user-msg-bg: #238636;        /* Green for user messages */
}
```

### script.js
**Purpose**: Core chat application logic

**Main Component**: `ChatApp Class`
- Manages all chat functionality
- Handles Puter.js API calls
- Manages localStorage
- Processes file uploads
- Formats messages with markdown

## Core Class: ChatApp

### Constructor
```javascript
constructor() {
  this.chats = [];              // Array of chat objects
  this.currentChatId = null;    // Active chat ID
  this.selectedModel = 'claude-sonnet-4-6'; // Selected model
  this.systemPrompt = '...';    // Custom system prompt
  this.isLoading = false;       // Loading state
  this.attachedFiles = [];      // Uploaded files
}
```

### Key Methods

#### `createNewChat()`
- Creates new chat object
- Generates unique ID (timestamp)
- Sets as current chat
- Updates UI
- Clears input/files

#### `sendMessage()`
- Gets user input text
- Adds user message to chat
- Shows typing indicator
- Calls `puter.ai.chat()`
- Displays assistant response
- Saves chat to storage

#### `handleFileUpload(event)`
- Reads uploaded files
- Converts to text content
- Stores in `attachedFiles` array
- Includes in message context
- Updates file display

#### `formatMessage(text)`
- Converts markdown to HTML
- Handles code blocks (```)
- Formats bold (**), italic (*)
- Supports lists (-)
- Enables code highlighting

#### `displayMessage(message)`
- Creates message element
- Adds user/assistant styling
- Renders formatted HTML
- Applies syntax highlighting
- Scrolls to bottom

#### `displayChat()`
- Shows welcome screen if empty
- Renders all messages
- Updates chat title
- Scrolls to latest message

## Data Structures

### Chat Object
```javascript
{
  id: "1713897123456",           // Unique timestamp-based ID
  title: "First user message...", // Preview title
  messages: [                     // Message history
    { role: "user", content: "..." },
    { role: "assistant", content: "..." }
  ],
  createdAt: "2026-04-23T..."     // ISO timestamp
}
```

### Message Object
```javascript
{
  role: "user" | "assistant",
  content: "Message text here"
}
```

### Attached File Object
```javascript
{
  name: "document.txt",
  type: "text/plain",
  content: "File content (limited to 10k chars)"
}
```

## Puter.js Integration

### Making Chat Requests

```javascript
const response = await puter.ai.chat(fullPrompt, {
  model: this.selectedModel,   // e.g., "claude-sonnet-4-6"
  stream: false                 // Non-streaming by default
});

// Response structure:
response.message.content[0].text // Get response text
```

### Available Models
- `claude-opus-4-7` - Most capable for complex reasoning
- `claude-sonnet-4-6` - Balanced, recommended
- `claude-haiku-4-5` - Fast for simple tasks
- `claude-opus-4.6-fast` - Speed optimized

### Prompt Building
System prompt → Message history → Current message context

```javascript
// Example full prompt:
`You are a helpful AI assistant...

User: What is machine learning?