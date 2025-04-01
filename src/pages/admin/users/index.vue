<template>
    <a-card title="Tài khoản" style="width: 100%">
        <div class="row mb-3">
            <div class="col-12 d-flex justify-content-end">
                <router-link :to="{ name: 'admin-users-create' }">
                    <a-button type="primary">
                        <i class="fa-solid fa-plus"></i>
                    </a-button>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
                    <template #bodyCell="{ column, index, record }">
                        <template v-if="column.key === 'index'">
                            <span>{{ index + 1 }}</span>
                        </template>

                        <template v-if="column.key === 'action'">
                            <a-space warp>
                                <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                                    <a-button type="primary">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>

                                <a-button type="primary" danger @click="deleteUsers(record.id)">
                                    <i class="fa-solid fa-trash"></i>
                                </a-button>
                            </a-space>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </a-card>
</template>

<script>

import { createVNode, defineComponent, ref } from 'vue';
import { useMenu } from '../../../stores/use-menu';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys(["admin-users"])

        const users = ref([]);
        const columns = [
            {
                title: 'STT',
                key: 'index',
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Tài khoản',
                dataIndex: 'username',
                key: 'username',
                responsive: ['sm'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                responsive: ['sm'],
            },
            {
                title: 'Vai trò',
                dataIndex: 'role_display_name',
                key: 'role',
            },
            {
                title: 'Hành động',
                key: 'action',
                fixed: 'right',
            }
        ];

        const getUsers = () => {
            axios.get('http://127.0.0.1:8000/api/users')
                .then((response) => {
                    users.value = response.data.data.map(user => ({
                        ...user,
                        role_display_name: user.role?.display_name || '',
                    }));

                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const deleteUsers = (id) => {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn xóa người dùng này?',
                icon: createVNode(ExclamationCircleOutlined),
                content: 'Bạn có thực sự muốn xóa dòng thông tin này? Quá trình này không thể được hoàn tác.',
                okText: 'Xoá',
                okType: 'danger',
                onOk() {
                    axios.delete(`http://127.0.0.1:8000/api/delete_user?id=${id}`)
                        .then((response) => {
                            message.success(response.data.message);
                            if (response.status == 200) {
                                getUsers();
                            }
                        })
                        .catch((error) => {
                            message.success(error.response.data.message);
                        });
                },
                cancelText: 'Hủy',
                onCancel() { },
            });
        }

        getUsers();

        return {
            users,
            columns,
            deleteUsers
        };
    }
});
</script>