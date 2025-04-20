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

                        <div class="google-signup-container">
                            <button class="google-signup" @click="loginWithGoogle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="error" class="error-message">
                {{ error }}
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
import { ref, onMounted } from 'vue';
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

const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    console.log('params', params);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
        localStorage.setItem('authToken', token);
        router.push('/dashboard');
    }

    if (error) {
        console.error('Google login failed:', error);
    }
});
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
    padding: 1rem 0;
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

.google-signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.google-signup {
    display: block;
    text-align: center;
    justify-content: center;
    background-color: rgb(223, 255, 222);
    color: black;
    border-radius: 4px;
    border: 2px solid rgb(192, 255, 192);
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 7px 10px;
    width: 60%;
}

.google-signup svg {
    margin-right: 5px;
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