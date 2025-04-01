<template>
    Đây là trang quản lý cài đặt
</template>

<script>

import { useMenu } from '../../../stores/use-menu';

export default {
    setup() {
        const store = useMenu();
        store. onSelectedKeys(["admin-settings"])
    }
}
</script>