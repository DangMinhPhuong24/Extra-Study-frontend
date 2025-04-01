<template>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
    >
        <a-menu-item key="student-registers">
            <router-link :to="{name: 'student-registers'}">
                <span><UserOutlined class="me-1"/> Danh sách đăng ký</span>
            </router-link>
        </a-menu-item >

        <a-menu-item key="student-home">
            <router-link :to="{name: 'student-home'}">
                <span><SolutionOutlined class="me-1"/> Thời khóa biểu</span>
            </router-link>
        </a-menu-item >

        <a-menu-item key="student-home">
            <router-link :to="{name: 'student-home'}">
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