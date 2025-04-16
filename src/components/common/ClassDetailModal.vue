<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3>Chi tiết lớp học</h3>
                <button class="close-button" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <LoadingSpinner v-if="isLoading" :text="loadingText" class="centered-loading" />
                <template v-else>
                    <div class="detail-item">
                        <span class="label">Môn học:</span>
                        <span class="value">{{ eventData.title.split('\n')[0] }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Thời gian:</span>
                        <span class="value">{{ eventData.title.split('\n')[1] }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Giảng viên:</span>
                        <span class="value">{{ eventData.title.split('\n')[2] }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Ngày:</span>
                        <span class="value">{{ formatDate(eventData.start) }}</span>
                    </div>
                    <div>
                        <span class="label">Danh sách học sinh:</span>
                        <a-table 
                            :dataSource="props.students" 
                            :columns="props.columns" 
                            :scroll="{ x: 0}"
                            :pagination="false"
                            size="small"
                            bordered
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'key'">
                                    {{ record.key }}
                                </template>
                                <template v-else>
                                    {{ record[column.dataIndex] }}
                                </template>
                            </template>
                        </a-table>
                    </div>
                </template>
            </div>
            <div class="modal-footer">
                <button class="cancel-button" @click="closeModal">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    eventData: {
        type: Object,
        default: () => ({})
    },
    students: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Đang tải thông tin...'
    }
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    min-height: 200px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.modal-body {
    padding: 20px;
    position: relative;
    min-height: 150px;
}

.centered-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1000;
}

.detail-item {
    margin-bottom: 15px;
    display: flex;
}

.label {
    font-weight: bold;
    width: 100px;
    color: #555;
}

.value {
    flex: 1;
    color: #333;
}

.modal-footer {
    padding: 15px 20px;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
    text-align: right;
}

.cancel-button {
    padding: 8px 16px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-button:hover {
    background-color: #5a6268;
}
</style> 