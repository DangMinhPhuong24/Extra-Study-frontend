<template>
    <AuthCard title="Tạo mật khẩu mới">
        <form @submit.prevent="handleRegister">
            <FormInput
                label="Mật khẩu mới"
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Nhập mật khẩu mới"
                :show-icon="true"
                :icon-class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                @toggle-visibility="togglePassword"
                :error="errorMessage.password?.[0]"
            />

            <FormInput
                label="Xác nhận mật khẩu mới"
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Xác nhận mật khẩu mới"
                :show-icon="true"
                :icon-class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                @toggle-visibility="toggleConfirmPassword"
                :error="errorMessage.confirmPassword?.[0]"
            />

            <button type="submit" class="auth-button">Xác nhận</button>
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
        const token = router.currentRoute.value.params.token;

        await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset_password`, {
            password: password.value,
            new_password_confirmation: confirmPassword.value,
            token: token
        });

        router.push('/');
    } catch (error) {
        console.error('Reset password error:', error);
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