<template>
    <AuthCard title="Đăng ký">
        <form @submit.prevent="handleRegister">
            <FormInput
                label="Họ và tên"
                id="name"
                v-model="name"
                placeholder="Nhập họ và tên"
                :error="errorMessage.name?.[0]"
            />

            <FormInput
                label="Tên tài khoản"
                id="username"
                v-model="username"
                placeholder="Nhập tên tài khoản"
                :error="errorMessage.username?.[0]"
            />

            <FormInput
                label="Email"
                id="email"
                v-model="email"
                type="email"
                placeholder="Nhập email"
                :error="errorMessage.email?.[0]"
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

            <FormInput
                label="Xác nhận mật khẩu"
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Xác nhận mật khẩu"
                :show-icon="true"
                :icon-class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                @toggle-visibility="toggleConfirmPassword"
                :error="errorMessage.confirmPassword?.[0]"
            />

            <div class="role-display">
                Vai trò: Học sinh
            </div>

            <div class="button-group">
                <button type="submit" class="auth-button">Đăng ký</button>
                <router-link to="/" class="back-button">Quay lại</router-link>
            </div>
        </form>
    </AuthCard>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthCard from '../components/common/AuthCard.vue';
import FormInput from '../components/common/FormInput.vue';
import '../styles/auth.css';

const router = useRouter();
const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref({});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const handleRegister = async () => {
    try {
        errorMessage.value = {};
        
        await axios.post(`${import.meta.env.VITE_API_URL}/create_user`, {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
            new_password_confirmation: confirmPassword.value,
            role_id: 3
        });

        router.push('/');
    } catch (error) {
        console.error('Registration error:', error);
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
.role-display {
    text-align: center;
    margin: 15px 0;
    font-weight: bold;
    color: #555;
}
</style> 