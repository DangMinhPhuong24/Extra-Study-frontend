<template>
    <div class="container-fuild">
        <div class="row text-white" style="background-color: #0c713d; padding: 1rem;">
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawerOpen()"><i class="fa-solid fa-align-justify"></i></span>
            </div>

            <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
                <img src="../assets/vue.svg" alt="Logo" height="32" width="34" class="ms-3 me-3">
                <span class="d-none d-sm-flex">Trang chủ</span>
            </div>
            
            <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
                <!-- Hiển thị tên người dùng -->
                <span>{{ userName }}</span>
                <button @click="logout" class="btn btn-danger ms-3">Đăng xuất</button>
            </div>
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawerVisible()"><i class="fa-solid fa-user"></i></span>
            </div>
        </div>
    </div>

    <a-drawer
        v-model:open="open"
        title="Danh mục"
        placement="left"
    >
        <TheMenu/>
    </a-drawer>

    <a-drawer
        v-model:visible="visible"
        title="Tài khoản"
        placement="right"
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </a-drawer>
</template>

<script setup>
import TheMenu from "../components/TheMenu.vue";
import { ref, computed } from 'vue';

const open = ref(false);
const visible = ref(false);

const userName = computed(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log('kkkk', user);
    return user ? user.name : 'Khách';
});

const showDrawerOpen = () => {
  open.value = true;
};

const showDrawerVisible = () => {
    visible.value = true;
};

const logout = async () => {
    try {
        await axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
       
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/';
    } catch (error) {
        alert('Đăng xuất thất bại, vui lòng thử lại.');
    }
};
</script>