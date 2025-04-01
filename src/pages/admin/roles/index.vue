<template>
    Đây là trang quản lý vai trò
</template>

<script>

import { useMenu } from '../../../stores/use-menu';

export default {
    setup() {
        const store = useMenu();
        store. onSelectedKeys(["admin-roles"])
    }
}
</script>