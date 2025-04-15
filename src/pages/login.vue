<template>
    <div class="login-container">
        <div class="login-left">
            <div class="login-logo">
                <img src="../assets/login_logo.png" alt="Logo" />
            </div>
            <div class="login-form">
                <div class="auth-card">
                    <h2 class="auth-title">Đăng nhập</h2>
                    <form @submit.prevent="handleLogin">
                        <FormInput
                            label="Tên tài khoản"
                            id="username"
                            v-model="username"
                            placeholder="Nhập tên tài khoản"
                            :error="errorMessage.username?.[0]"
                        />

                        <FormInput
                            label="Mật khẩu"
                            id="password"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Nhập mật khẩu"
                            :show-icon="true"
                            :icon-class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                            @toggle-visibility="togglePassword"
                            :error="errorMessage.password?.[0]"
                        />

                        <button type="submit" class="auth-button">Đăng nhập</button>
                        
                        <div class="additional-options">
                            <router-link to="/register" class="auth-link">Đăng ký</router-link>
                            <span class="separator">|</span>
                            <router-link to="/forgot-password" class="auth-link">Quên mật khẩu?</router-link>
                        </div>
                    </form>
                </div>
            </div>
            <div class="login-footer">
                <p>© 2024 Extra Study. All rights reserved.</p>
            </div>
        </div>
        <div class="login-right">
            <div class="background-overlay"></div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '../components/common/FormInput.vue';
import '../styles/auth.css';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref({});
const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    try {
        errorMessage.value = {};
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
        if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = {
                general: ['Đã xảy ra lỗi. Xin vui lòng thử lại sau!']
            };
        }
    }
};
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    overflow: hidden;
}

.login-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    background: white;
}

.login-right {
    flex: 7;
    position: relative;
    background-image: url('../assets/login_background.jpg');
    background-size: cover;
    background-position: center;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
}

.login-logo {
    text-align: center;
    padding: 2rem 0;
    height: 20%;
}

.login-logo img {
    max-width: 200px;
    height: auto;
}

.login-form {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
}

.auth-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 4px 4px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.auth-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 1.5rem;
}

.login-footer {
    text-align: center;
    padding: 1px 0;
    color: #666;
    font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .login-container {
        flex-direction: column;
    }

    .login-left, .login-right {
        flex: none;
    }

    .login-right {
        display: none;
    }

    .login-left {
        padding: 1rem;
    }

    .login-logo img {
        max-width: 150px;
    }

    .auth-card {
        padding: 1.5rem;
    }
}
</style>