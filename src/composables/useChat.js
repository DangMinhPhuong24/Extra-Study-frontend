import { ref } from 'vue';
import axios from 'axios';
import { useLoading } from './useLoading';

export function useChat() {
    const { isLoading, loadingText, startLoading, stopLoading } = useLoading();
    const users = ref([]);
    const selectedUser = ref(null);
    const chatHistory = ref([]);
    const newMessage = ref('');

    const fetchData = async () => {
        try {
            startLoading('Đang tải dữ liệu...');
            const registerRes = await axios.get(`${import.meta.env.VITE_API_URL}/user_all_except_myself`);
            users.value = registerRes.data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            stopLoading();
        }
    };

    const selectUser = async (user) => {
        try {
            startLoading('Đang tải chi tiết chat...');
            selectedUser.value = user;
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/chat_all?receiver_id=${user.id}`);
            if (response.data.status_code === 200) {
                chatHistory.value = response.data.data;
            }
        } catch (error) {
            console.error("Error fetching registration details:", error);
            alert("Có lỗi xảy ra khi lấy chi tiết chat.");
        } finally {
            stopLoading();
        }
    };

    const sendMessage = async () => {
        if (!newMessage.value.trim() || !selectedUser.value) return;
    
        try {
            console.log('chat', newMessage.value)
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send_message?receiver_id=${selectedUser.value.id}&content=${encodeURIComponent(newMessage.value)}`);
            if (response.data.status_code === 201) {
                newMessage.value = '';
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return {
        users,
        selectedUser,
        chatHistory,
        newMessage,
        fetchData,
        selectUser,
        sendMessage,
        isLoading,
        loadingText
    };
} 