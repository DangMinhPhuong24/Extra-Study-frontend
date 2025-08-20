<template>
    <div class="col-12 d-flex chat-container">
        <div class="list-user-chat col-3">
            <LoadingSpinner v-if="isLoading" :text="loadingText" class="centered-loading" />
            <div 
                class="user-chat" 
                v-for="user in users" 
                :key="user.id" 
                :value="user.id"
                @click="selectUser(user)"
            >
                {{ user.name }}
            </div>
        </div>

        <div class="chat-box col-9">  
            <div class="top">
                {{ selectedUser?.name || 'Chọn một người để bắt đầu chat' }}
            </div>
            
            <div class="mid" v-if="chatHistory.length">
                <div 
                    class="chat-message" 
                    v-for="message in chatHistory" 
                    :key="message.id"
                >
                    <div 
                        :class="{'message-sent': message.sender === selectedUser?.name, 'message-received': message.sender !== selectedUser?.name}"
                    >
                        <div class="message-content">
                            {{ message.content }}
                        </div>
                        <div class="message-time">
                            {{ message.created_at }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mid" v-else>
                Không có tin nhắn nào.
            </div>

            <div class="bot">
                <input 
                    type="text" 
                    v-model="newMessage" 
                    placeholder="Nhắn tin..." 
                    @keyup.enter="sendMessage"
                />
                <button @click="sendMessage">Gửi</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMenu } from '../stores/use-menu';
import { useChat } from '../composables/useChat';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

const store = useMenu();
const {
    users,
    fetchData,
    isLoading,
    loadingText
} = useChat();

const selectedUser = ref(null);
const chatHistory = ref([]);
const newMessage = ref('');

const selectUser = async (user) => {
    selectedUser.value = user;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/chat_box?user_id=${user.id}`);
        if (response.data.status_code === 200) {
            chatHistory.value = response.data.data;
        }
    } catch (error) {
        console.error("Error fetching chat history:", error);
    }
};

const sendMessage = async () => {
    if (!newMessage.value.trim() || !selectedUser.value) return;

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/send_chat?user_id=${selectedUser.value.id}&content=${encodeURIComponent(newMessage.value)}`);
        if (response.data.status_code === 200) {
            chatHistory.value.push({
                id: Date.now(), // Temporary ID
                sender: "You",
                receiver: selectedUser.value.name,
                content: newMessage.value,
                sending_time: new Date().toLocaleTimeString()
            });
            newMessage.value = ''; // Clear input
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

onMounted(() => {
    store.onSelectedKeys(["chat"]);
    fetchData();
});
</script>

<style scoped>
.chat-container {
    display: flex;
    height: 100vh;
    background-color: #f0f2f5;
}

.list-user-chat {
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #ccc;
    overflow-y: auto;
    padding: 10px;
}

.user-chat {
    font-size: 16px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.user-chat:hover {
    background-color: #f0f0f0;
}

.chat-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
}

.top {
    height: 10%;
    background-color: #0078ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mid {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background-color: #e5ddd5;
}

.chat-message {
    margin-bottom: 10px;
}

.message-sent {
    text-align: right;
}

.message-received {
    text-align: left;
}

.message-content {
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    background-color: #dcf8c6;
    max-width: 70%;
    word-wrap: break-word;
}

.message-sent .message-content {
    background-color: #0078ff;
    color: #fff;
}

.message-time {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

.bot {
    height: 10%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;
    background-color: #f9f9f9;
}

.bot input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
}

.bot button {
    background-color: #0078ff;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.bot button:hover {
    background-color: #0056cc;
}
</style>