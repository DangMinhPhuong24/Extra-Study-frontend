<template>
    <div class="container-fuild">
        <div class="row text-white" style="background-color: #0c713d; padding: 1rem;">
            <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
                <span @click="showDrawerOpen()"><i class="fa-solid fa-align-justify"></i></span>
            </div>

            <div class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start">
                <i class="fa-solid fa-graduation-cap"></i> 
                <span class="ms-1">Trang chủ</span>
            </div>
            
            <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
                <div class="dropdown">
                    <span class="dropdown-toggle" @click="toggleDropdown">
                        {{ userName }} <i v-if="userName !== 'Khách'" class="fa-solid fa-chevron-down"></i>
                    </span>
                    <div v-if="isDropdownOpen && userName !== 'Khách'" class="dropdown-menu">
                        <router-link :to="{ name: 'student-profile'}" class="dropdown-item">
                            Thông tin cá nhân
                        </router-link>
                    </div>
                </div>

                <button v-if="userName !== 'Khách'" @click="logout" class="btn-login ms-3">
                    Đăng xuất <i class="fa-solid fa-right-to-bracket"></i>
                </button>

                <button v-if="userName == 'Khách'" class="btn-login ms-3">
                    <router-link class="btn-login" to="/">Đăng nhập <i class="fa-solid fa-right-to-bracket"></i></router-link>
                </button>
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
</template>

<script setup>
import TheMenu from "../components/TheMenu.vue";
import { ref, computed } from 'vue';
import "../styles/auth.css";

const open = ref(false);
const visible = ref(false);
const isDropdownOpen = ref(false);

const userName = computed(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.name : 'Khách';
});

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const showDrawerOpen = () => {
    open.value = true;
};

const showDrawerVisible = () => {
    visible.value = true;
};

const logout = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {
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

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-toggle {
    cursor: pointer;
    padding: 5px 1px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    min-width: 170px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    border-radius: 4px;
    z-index: 1000;
}

.dropdown-item {
    display: block;
    padding: 8px 20px;
    color: #333;
    text-decoration: none;
}

.dropdown-item:hover {
    background-color: #f5f5f5;
    border-radius: 4px;
}
</style>