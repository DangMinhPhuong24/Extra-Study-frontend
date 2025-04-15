<template>
    <form @submit.prevent="updateUsers()">
        <a-card title="Cập nhật tài khoản" style="width: 100%">
            <div class="row">
                <div class="col-12 col-sm-4">

                    <div class="row">
                        <div class="col-12 d-flex justify-content-center mb-3">
                            <a-avatar shape="square" :size="250">
                                <template #icon>
                                    <img src="../../../assets/avatar.jpg" alt="Avatar">
                                </template>
                            </a-avatar>
                        </div>

                        <div class="col-12 d-flex justify-content-center">
                            <a-button type="primary">
                                <i class="fa-solid fa-plus me-2"></i>
                                <span> Chọn ảnh </span>
                            </a-button>
                        </div>
                    </div>

                </div>
                <div class="col-12 col-sm-8">
                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.username }">Tên tài khoản:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Nhập tên tài khoản" allow-clear v-model:value="username"
                                :class="{ 'select-danger': errors.username }"></a-input>
                            <div class="w-100"></div>
                            <small v-if="errors.username" class="text-danger">{{ errors.username[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.name }">Họ và tên:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Nhập họ và tên" allow-clear v-model:value="name"
                                :class="{ 'select-danger': errors.name }"></a-input>
                            <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.email }">Email:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-input placeholder="Nhập email" allow-clear v-model:value="email"
                                :class="{ 'select-danger': errors.email }"></a-input>
                            <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end"></div>
                        <div class="col-12 col-sm-5">
                            <a-checkbox v-model:checked="change_password">Đổi mật khẩu</a-checkbox>
                        </div>
                    </div>

                    <div class="row mb-3" v-if="change_password == true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.password }">Mật khẩu:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Nhập mật khẩu" allow-clear v-model:value="password"
                                :class="{ 'select-danger': errors.password }"></a-input-password>
                            <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
                        </div>
                    </div>

                    <div class="row mb-3" v-if="change_password == true">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.new_password_confirmation }">Xác nhận mật
                                    khẩu:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-input-password placeholder="Nhập lại mật khẩu" allow-clear
                                v-model:value="new_password_confirmation"
                                :class="{ 'select-danger': errors.new_password_confirmation }"></a-input-password>
                            <small v-if="errors.new_password_confirmation" class="text-danger">{{
                                errors.new_password_confirmation[0]
                                }}</small>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-12 col-sm-3 text-start text-sm-end">
                            <label>
                                <span>Lần đổi MK gần nhất:</span>
                            </label>
                        </div>
                        <div class="col-12 col-sm-5">
                            <span>{{ change_password_at }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 d-sm-flex justify-content-sm-end">
                    <router-link :to="{ name: 'student-registers' }">
                        <div class="d-grid mx-auto">
                            <a-button danger class="me-0 me-sm-2 mb-3 mb-sm-0">
                                <span>Hủy</span>
                            </a-button>
                        </div>
                    </router-link>

                    <div class="d-grid mx-auto">
                        <a-button type="primary" class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">
                            <span>Cập nhập</span>
                        </a-button>
                    </div>

                </div>
            </div>
        </a-card>
    </form>
</template>

<script>

import { defineComponent, ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { useMenu } from '../../../stores/use-menu';

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"])

        const router = useRouter();
        const route = useRoute();
        const errors = ref([]);
        const users = reactive({
            id: "",
            username: "",
            name: "",
            email: "",
            password: "",
            new_password_confirmation: "",
            change_password: false,
            change_password_at: ""
        });

        const getUserDetail = () => {
            axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`)
                .then((response) => {
                    users.id = response.data.data.id;
                    users.username = response.data.data.username;
                    users.name = response.data.data.name;
                    users.email = response.data.data.email;
                    users.change_password_at = response.data.data.change_password_at ?? "Bạn chưa đổi mật khẩu lần nào";
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const updateUsers = () => {
            const dataUpdate = reactive({
                id: users.id,
                username: users.username,
                name: users.name,
                email: users.email,
                password: users.password,
                new_password_confirmation: users.new_password_confirmation,
            });
            
            axios.put(`${import.meta.env.VITE_API_URL}/update_user`, dataUpdate)
                .then((response) => {
                    console.log(response);
                    message.success(response.data.message);
                    router.push({ name: "admin-users" });
                })
                .catch((error) => {
                    console.log(error);
                    errors.value = error.response.data.message;
                });
        }

        getUserDetail();

        return {
            errors,
            ...toRefs(users),
            updateUsers
        }
    }
});
</script>

<style>
.select-danger {
    border: 1px solid red;
}
</style>