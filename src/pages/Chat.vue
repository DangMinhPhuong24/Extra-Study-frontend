<template>
    <LoadingSpinner v-if="isLoading" :text="loadingText" class="centered-loading" />
    <div class="col-12 d-flex chat-container">
        <div class="list-user-chat col-3">
            <div >
                Đoạn chat
            </div>

            <div>
                <input type="text">
            </div>
            
            <div 
                class="user-chat" 
                v-for="user in users" 
                :key="user.id" 
                :value="user.id"
                @click="selectUser(user)">
                {{ user.name }}
            </div>
        </div>

        <div class="chat-box col-9">  
            <div class="top">
                <a-avatar shape="circle" :size="50">
                    <template #icon>
                        <img :src=" 
                            'https://s3.ap-southeast-1.amazonaws.com/bucketupload.dangminhphuong/' + selectedUser?.avatar 
                            || '../assets/avatar.jpg'" alt="Avatar">
                    </template>
                </a-avatar>
                {{ selectedUser?.name || 'Chọn một người để bắt đầu chat' }}
            </div>
            
            <div class="mid">
                <div class="chat-message" v-for="message in chatHistory" :key="message.id">
                    <div :class="
                        {'message-sent': message.sender.id !== selectedUser?.id, 
                        'message-received': message.sender.id === selectedUser?.id}">

                        <div class="message-content">
                            {{ message.content }}
                        </div>
                        <div class="message-time">
                            {{ message.created_at }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="bot">
                <input 
                    type="text" 
                    v-model="newMessage" 
                    placeholder="Nhắn tin..." 
                    @keyup.enter="sendMessage()"
                />
                <button @click="sendMessage()"><i class="fa-regular fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
    
</template>

<script setup>

import { onMounted } from 'vue';
import { useMenu } from '../stores/use-menu';
import { useChat } from '../composables/useChat';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

const store = useMenu();
const {
    users,
    selectedUser,
    chatHistory,
    newMessage,
    fetchData,
    selectUser,
    sendMessage,
    isLoading,
    loadingText
} = useChat();

onMounted(() => {
  store.onSelectedKeys(["chat"]);
  fetchData();
});
</script>

<style scoped>
.chat-container {
    height: 600px;
}

.list-user-chat {
    height: 100%;
    background-color: whitesmoke;
    border-radius: 8px;
    border: 1px solid transparent;
    overflow-y: auto;
    padding: 10px;
}

.user-chat {
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background-color 0.3s;
    text-align: center;
    padding: 5px;
}

.user-chat:hover {
    color: #ccc;
    background-color: #313131;
}

.centered-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.chat-box {
    height: 100%;
}

.top {
    height: 10%;
    background-color: #333334;
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
    height: 80%;
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