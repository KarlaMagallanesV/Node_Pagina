import { GoogleGenerativeAI } from "@google/generative-ai";
    
            let model;
            let modelReady = false;
            let chatMessages;
            let chatContainer;
            let chatBubble;
    
            // Inicializar el modelo
            async function initModel() {
                try {
                    // Fetch your API_KEY
                    const API_KEY = "AIzaSyC6YZbNzqh5dGlXadOii4ELL4dTFErL4UE";
                    // Reminder: This should only be for local testing
    
                    // Access your API key
                    const genAI = new GoogleGenerativeAI(API_KEY);
    
                    model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
                    console.log('Modelo cargado exitosamente');
                    modelReady = true;
                } catch (error) {
                    console.error('Error al cargar el modelo:', error);
                    handleModelLoadError(error);
                }
            }
    
            function handleModelLoadError(error) {
                modelReady = false;
                let errorMessage = 'Lo siento, ha ocurrido un error al cargar el modelo. Por favor, recarga la página e intenta de nuevo.';
                
                if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'No se pudo cargar el modelo. Por favor, verifica tu conexión a internet y recarga la página.';
                }
                
                appendMessage('bot', errorMessage);
            }
    
            function loadChatMessages() {
                const savedMessages = localStorage.getItem('chatMessages');
                if (savedMessages) {
                    chatMessages.innerHTML = savedMessages;
                }
            }
    
            function saveChatMessages() {
                localStorage.setItem('chatMessages', chatMessages.innerHTML);
            }
    
            document.addEventListener('DOMContentLoaded', () => {
                chatMessages = document.getElementById('chat-messages');
                chatContainer = document.getElementById('chat-container');
                chatBubble = document.getElementById('chat-bubble');
                loadChatMessages();
                initModel();
    
                chatBubble.addEventListener('click', toggleChat);
    
                const clearChatButton = document.getElementById('clear-chat');
                clearChatButton.addEventListener('click', clearChat);
            });
    
            function toggleChat() {
                if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
                    chatContainer.style.display = 'block';
                } else {
                    chatContainer.style.display = 'none';
                }
            }
    
            function clearChat() {
                chatMessages.innerHTML = '';
                localStorage.removeItem('chatMessages');
                appendMessage('bot', '¡Hola! Soy Tu mascota sumaq. ¿En qué puedo asistirte hoy?');
            }
    
            const chatForm = document.getElementById('chat-form');
            const userInput = document.getElementById('user-input');
    
    
            chatForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const message = userInput.value.trim();
                if (!message) return;
    
                appendMessage('user', message);
                userInput.value = '';
                if (modelReady) {
                    try {
                        const result = await model.generateContent(message);
                        const response = await result.response;
                        const text = response.text();
                        appendMessage('bot', text);
                    } catch (error) {
                        console.error('Error al procesar la pregunta:', error);
                        appendMessage('bot', 'Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta de nuevo.');
                    }
                } else {
                    appendMessage('bot', `¡Hola! Soy Tu mascota sumaq. ¿En qué puedo asistirte hoy?`);
                    await waitForModel();
                    if (modelReady) {
                        appendMessage('bot', '¡El modelo está listo ahora! Puedes hacer tu pregunta nuevamente.');
                    } else {
                        appendMessage('bot', 'Lo siento, no se pudo inicializar el modelo. Por favor, recarga la página e intenta de nuevo.');
                    }
                }
                saveChatMessages();
            });
    
            function waitForModel() {
                return new Promise(resolve => {
                    const checkModel = setInterval(() => {
                        if (modelReady) {
                            clearInterval(checkModel);
                            resolve();
                        }
                    }, 1000);
                });
            }
    
            function appendMessage(sender, text, className = '') {
                if (!chatMessages) {
                    chatMessages = document.getElementById('chat-messages');
                }
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender} ${className}`;
                const avatar = document.createElement('img');
                avatar.className = 'avatar';
                avatar.src = sender === 'user' 
                    ? 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/user.svg'
                    : 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/robot.svg';
                avatar.alt = sender === 'user' ? 'Usuario' : 'Bot';
                const content = document.createElement('div');
                content.className = 'message-content';
                content.innerHTML = `<p>${text}</p>`;
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(content);
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                saveChatMessages();
            }
