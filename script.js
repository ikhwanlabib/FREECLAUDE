// Claude AI Chatbox - Powered by Puter.js
// Full-featured ChatGPT-like interface with document upload

class ChatApp {
    constructor() {
        this.chats = [];
        this.currentChatId = null;
        this.selectedModel = 'claude-sonnet-4-6';
        this.systemPrompt = 'You are a helpful, intelligent AI assistant powered by Claude.';
        this.isLoading = false;
        this.attachedFiles = [];
        
        this.initializeUI();
        this.setupEventListeners();
        this.loadChatsFromStorage();
        this.createNewChat();
    }

    initializeUI() {
        // Create first empty chat
        this.createNewChat();
    }

    setupEventListeners() {
        // Send button
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
        
        // Message input
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
        });

        // File upload
        document.getElementById('attachBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileUpload(e));

        // New chat
        document.getElementById('newChatBtn').addEventListener('click', () => this.createNewChat());

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => {
            document.getElementById('settingsModal').style.display = 'flex';
        });

        // Help
        document.getElementById('helpBtn').addEventListener('click', () => {
            document.getElementById('helpModal').style.display = 'flex';
        });

        // Model selection
        document.getElementById('modelSelect').addEventListener('change', (e) => {
            this.selectedModel = e.target.value;
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Mobile menu
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.toggleSidebar();
        });

        document.getElementById('sidebarOverlay').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'k' && e.shiftKey) {
                    e.preventDefault();
                    this.createNewChat();
                } else if (e.key === 'l') {
                    e.preventDefault();
                    this.clearChat();
                }
            }
        });
    }

    createNewChat() {
        const chatId = Date.now().toString();
        const chat = {
            id: chatId,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString()
        };
        
        this.chats.push(chat);
        this.currentChatId = chatId;
        this.attachedFiles = [];
        
        this.updateChatsList();
        this.displayChat();
        this.saveChatsToStorage();
        
        // Clear input
        document.getElementById('messageInput').value = '';
        document.getElementById('messageInput').style.height = 'auto';
        document.getElementById('attachedFiles').innerHTML = '';
        
        this.closeSidebar();
    }

    loadChatsFromStorage() {
        const stored = localStorage.getItem('chatHistory');
        if (stored) {
            try {
                this.chats = JSON.parse(stored);
                if (this.chats.length > 0) {
                    this.currentChatId = this.chats[0].id;
                    this.displayChat();
                }
            } catch (e) {
                console.error('Error loading chat history:', e);
                this.chats = [];
            }
        }
    }

    saveChatsToStorage() {
        localStorage.setItem('chatHistory', JSON.stringify(this.chats));
    }

    updateChatsList() {
        const chatsList = document.getElementById('chatsList');
        chatsList.innerHTML = '';
        
        this.chats.forEach(chat => {
            const chatItem = document.createElement('button');
            chatItem.className = 'chat-item';
            if (chat.id === this.currentChatId) {
                chatItem.classList.add('active');
            }
            
            const preview = chat.messages.length > 0 
                ? chat.messages[0].content.substring(0, 50) + '...'
                : 'No messages';
            
            chatItem.textContent = preview;
            chatItem.title = preview;
            
            chatItem.addEventListener('click', () => {
                this.currentChatId = chat.id;
                this.displayChat();
                this.updateChatsList();
                this.closeSidebar();
            });
            
            chatsList.appendChild(chatItem);
        });
    }

    displayChat() {
        if (!this.currentChatId) return;
        
        const chat = this.chats.find(c => c.id === this.currentChatId);
        if (!chat) return;

        const container = document.getElementById('messagesContainer');
        
        if (chat.messages.length === 0) {
            // Show welcome screen
            container.innerHTML = `
                <div class="welcome-section">
                    <div class="welcome-icon">
                        <i class="fas fa-sparkles"></i>
                    </div>
                    <h2>Claude AI Assistant</h2>
                    <p>Ask me anything. I can:</p>
                    <ul class="capabilities-list">
                        <li>📝 Answer questions & provide explanations</li>
                        <li>💻 Write and debug code</li>
                        <li>📄 Analyze documents & files</li>
                        <li>✍️ Help with writing & editing</li>
                        <li>🧮 Solve math & logic problems</li>
                        <li>🎓 Explain complex concepts</li>
                    </ul>
                </div>
            `;
        } else {
            // Display messages
            container.innerHTML = '';
            chat.messages.forEach(msg => {
                this.displayMessage(msg);
            });
            
            // Scroll to bottom
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 0);
        }

        // Update title
        document.getElementById('chatTitle').textContent = 
            chat.messages.length > 0 
                ? chat.messages[0].content.substring(0, 30) + '...'
                : 'Claude AI Assistant';
    }

    displayMessage(message) {
        const container = document.getElementById('messagesContainer');
        
        // Remove welcome section if displaying first message
        const welcome = container.querySelector('.welcome-section');
        if (welcome && container.children.length === 1) {
            welcome.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = message.role === 'user' ? 'You' : 'AI';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Parse markdown and code blocks
        content.innerHTML = this.formatMessage(message.content);
        
        // Highlight code blocks
        content.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
        
        messageEl.appendChild(avatar);
        messageEl.appendChild(content);
        
        container.appendChild(messageEl);
        container.scrollTop = container.scrollHeight;
    }

    formatMessage(text) {
        // Escape HTML
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        // Format code blocks
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'plaintext';
            return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
        });
        
        // Format inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Format bold
        html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        
        // Format italic
        html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        
        // Format lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Format line breaks
        html = html.replace(/\n\n/g, '<br><br>');
        
        return html;
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const text = messageInput.value.trim();
        
        if (!text || this.isLoading) return;
        
        // Add user message
        const chat = this.chats.find(c => c.id === this.currentChatId);
        if (!chat) return;

        const userMessage = {
            role: 'user',
            content: text
        };
        
        chat.messages.push(userMessage);
        this.displayMessage(userMessage);
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        document.getElementById('attachedFiles').innerHTML = '';
        this.attachedFiles = [];
        
        // Show loading
        this.showTypingIndicator();
        this.isLoading = true;
        
        try {
            // Get user's system prompt from settings if exists
            const savedPrompt = localStorage.getItem('systemPrompt');
            if (savedPrompt) {
                this.systemPrompt = savedPrompt;
            }

            // Build conversation context
            let conversationContext = this.systemPrompt + '\n\n';
            
            // Add file context if files are attached
            if (this.attachedFiles.length > 0) {
                conversationContext += 'The user has uploaded the following files:\n';
                this.attachedFiles.forEach(file => {
                    conversationContext += `\n[File: ${file.name}]\n${file.content}\n`;
                });
                conversationContext += '\n---\n\n';
            }
            
            // Build message history for context
            const recentMessages = chat.messages.slice(-8).map(msg => {
                return `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`;
            }).join('\n\n');
            
            const fullPrompt = conversationContext + recentMessages;

            // Call Claude via Puter.js
            const response = await puter.ai.chat(fullPrompt, {
                model: this.selectedModel,
                stream: false
            });

            // Remove typing indicator
            this.removeTypingIndicator();

            const assistantMessage = {
                role: 'assistant',
                content: response.message.content[0].text
            };

            chat.messages.push(assistantMessage);
            this.displayMessage(assistantMessage);
            
            // Update title with first user message
            if (chat.messages.length === 2) {
                chat.title = userMessage.content.substring(0, 40);
                this.updateChatsList();
            }

            this.saveChatsToStorage();

        } catch (error) {
            console.error('Error:', error);
            this.removeTypingIndicator();
            
            const errorMessage = {
                role: 'assistant',
                content: `❌ Error: ${error.message || 'Failed to get response from Claude. Please try again.'}`
            };
            
            chat.messages.push(errorMessage);
            this.displayMessage(errorMessage);
            
        } finally {
            this.isLoading = false;
            document.getElementById('sendBtn').disabled = false;
            messageInput.focus();
        }
    }

    showTypingIndicator() {
        const container = document.getElementById('messagesContainer');
        const typingEl = document.createElement('div');
        typingEl.className = 'message assistant';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = `
            <div class="message-avatar">AI</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        container.appendChild(typingEl);
        container.scrollTop = container.scrollHeight;
        document.getElementById('sendBtn').disabled = true;
    }

    removeTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    handleFileUpload(e) {
        const files = e.target.files;
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const content = event.target.result;
                
                this.attachedFiles.push({
                    name: file.name,
                    type: file.type,
                    content: content.substring(0, 10000) // Limit to 10k chars
                });
                
                this.updateAttachedFilesList();
            };
            
            reader.onerror = () => {
                alert(`Error reading file: ${file.name}`);
            };
            
            reader.readAsText(file);
        });
        
        // Reset file input
        e.target.value = '';
    }

    updateAttachedFilesList() {
        const container = document.getElementById('attachedFiles');
        container.innerHTML = '';
        
        this.attachedFiles.forEach((file, index) => {
            const tag = document.createElement('div');
            tag.className = 'file-tag';
            tag.innerHTML = `
                <span>${file.name}</span>
                <button onclick="chatApp.removeFile(${index})">×</button>
            `;
            container.appendChild(tag);
        });
    }

    removeFile(index) {
        this.attachedFiles.splice(index, 1);
        this.updateAttachedFilesList();
    }

    clearChat() {
        if (confirm('Are you sure you want to clear this chat?')) {
            const chat = this.chats.find(c => c.id === this.currentChatId);
            if (chat) {
                chat.messages = [];
                this.displayChat();
                this.saveChatsToStorage();
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Global functions for modal controls
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function saveSettings() {
    const systemPrompt = document.getElementById('systemPrompt').value;
    const streaming = document.getElementById('streamingToggle').checked;
    const codeHighlight = document.getElementById('codeHighlightToggle').checked;
    
    localStorage.setItem('systemPrompt', systemPrompt);
    localStorage.setItem('streaming', streaming);
    localStorage.setItem('codeHighlight', codeHighlight);
    
    closeModal('settingsModal');
    alert('Settings saved!');
}

// Initialize when DOM is ready
let chatApp;
document.addEventListener('DOMContentLoaded', () => {
    chatApp = new ChatApp();
    
    // Load saved settings
    const savedPrompt = localStorage.getItem('systemPrompt');
    if (savedPrompt) {
        document.getElementById('systemPrompt').value = savedPrompt;
    }
});

console.log('Claude AI Chatbox initialized. Powered by Puter.js 🚀');

