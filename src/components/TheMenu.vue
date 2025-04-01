<template>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
    >
        <a-menu-item key="admin-users">
            <router-link :to="{name: 'admin-users'}">
                <span><UserOutlined class="me-1"/> Tài khoản</span>
            </router-link>
        </a-menu-item >

        <a-menu-item key="admin-roles">
            <router-link :to="{name: 'admin-roles'}">
                <span><SolutionOutlined class="me-1"/> Vai trò</span>
            </router-link>
        </a-menu-item >

        <a-menu-item key="admin-settings">
            <router-link :to="{name: 'admin-settings'}">
                <span><SettingOutlined class="me-1"/> Cài đặt</span>
            </router-link>
        </a-menu-item >
    </a-menu>
</template>

<script setup>
import { UserOutlined, SolutionOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';
import { useMenu } from '../stores/use-menu';
import { storeToRefs } from 'pinia';


const store = useMenu();

const state = reactive({
    ...storeToRefs(store)
});

</script>