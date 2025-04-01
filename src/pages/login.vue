<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Tên tài khoản</label>
                    <input type="username" id="username" v-model="username" placeholder="Enter your username"
                        required />
                </div>

                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" v-model="password" placeholder="Enter your password"
                        required />
                </div>

                <button type="submit" class="login-button">Login</button>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            username: username.value,
            password: password.value
        });

        const token = response.data.data.token;
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        localStorage.setItem('user', JSON.stringify(response.data.data.user));

        if (response.data.data.user.role_name === 'admin') {
            router.push({ name: 'admin-users' });
        } else {
            router.push({ name: 'student-registers' });
        }

    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = error.response?.data?.message || 'An error occurred. Please try again.';
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.login-card {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.login-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}

.error-message {
    margin-top: 10px;
    color: red;
    font-size: 14px;
    text-align: center;
}
</style>