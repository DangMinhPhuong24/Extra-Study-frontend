<template>
    <form @submit.prevent="createUsers()">
        <a-card title="Tạo mới tài khoản" style="width: 100%">
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

                    <div class="row mb-3">
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
                            <label for="">
                                <span class="text-danger me-1">*</span>
                                <span :class="{ 'text-danger': errors.role_id }">Vai trò:</span>
                            </label>
                        </div>

                        <div class="col-12 col-sm-5">
                            <a-select placeholder="-- Chọn vai trò --" style="width: 100%;" :filter-option="null"
                                v-model:value="role_id" :class="{ 'select-danger': errors.role_id }">
                                <a-select-option v-for="role in roles" :key="role.id" :value="role.id">
                                    {{ role.display_name }}
                                </a-select-option>
                            </a-select>

                            <div class="w-100"></div>
                            <small v-if="errors.role_id" class="text-danger">{{ errors.role_id[0] }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 d-sm-flex">
                    <router-link :to="{ name: 'admin-users' }">
                        <div class="d-grid mx-auto">
                            <a-button danger class="me-0 me-sm-2 mb-3 mb-sm-0">
                                <span>Hủy</span>
                            </a-button>
                        </div>
                    </router-link>

                    <div class="d-grid mx-auto">
                        <a-button type="primary" class="me-0 me-sm-2 mb-3 mb-sm-0" html-type="submit">
                            <span>Tạo mới</span>
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
import { message } from 'ant-design-vue';
import { useMenu } from '../../../stores/use-menu';

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"])

        const router = useRouter();
        const roles = ref([]);
        const errors = ref([]);
        const users = reactive({
            username: "",
            name: "",
            email: "",
            password: "",
            new_password_confirmation: "",
            role_id: []
        });

        const getRoleAll = () => {
            axios.get('http://127.0.0.1:8000/api/role_all')
                .then((response) => {
                    roles.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const createUsers = () => {
            axios.post('http://127.0.0.1:8000/api/create_user', users)
                .then((response) => {
                    message.success(response.data.message);
                    router.push({ name: "admin-users" });
                })
                .catch((error) => {
                    errors.value = error.response.data.message;
                });
        }

        getRoleAll();

        return {
            roles,
            errors,
            ...toRefs(users),
            createUsers,
        }
    }
});
</script>

<style>
.select-danger {
    border: 1px solid red;
}
</style>