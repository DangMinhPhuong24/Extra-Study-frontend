<template>
    <AuthCard title="Quên mật khẩu">
        <form @submit.prevent="handleForgotPassword">
            <FormInput
                label="Email"
                id="email"
                v-model="email"
                type="email"
                placeholder="Vui lòng nhập email"
                :error="errorMessage.email?.[0]"
            />

            <div class="button-group">
                <button type="submit" class="auth-button">Gửi</button>
                <router-link to="/" class="back-button">Quay lại</router-link>
            </div>
        </form>
    </AuthCard>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import AuthCard from '../components/common/AuthCard.vue';
import FormInput from '../components/common/FormInput.vue';
import '../styles/auth.css';

const email = ref('');
const errorMessage = ref({});

const handleForgotPassword = async () => {
    try {
        errorMessage.value = {};
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot_password`, {
            email: email.value
        });
        
        alert('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu');
    } catch (error) {
        console.error('Forgot password error:', error);
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