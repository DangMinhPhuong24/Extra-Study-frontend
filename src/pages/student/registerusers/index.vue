<template>
  <div class="registration-list">
    <h1>Danh sách đăng ký môn học
      <button @click="registerSelected" :disabled="selectedRegistrations.length === 0 || isLoading">
        Đăng ký
      </button>
    </h1>

    <!-- Bộ lọc -->
    <div class="filters">
      <label for="teacher">Giáo viên:</label>
      <select v-model="selectedTeacher" @change="filterData" :disabled="isLoading">
        <option value="">Tất cả</option>
        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
          {{ teacher.name }}
        </option>
      </select>

      <label for="subject">Môn học:</label>
      <select v-model="selectedSubject" @change="filterData" :disabled="isLoading">
        <option value="">Tất cả</option>
        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
          {{ subject.subject_name }}
        </option>
      </select>
    </div>

    <!-- Danh sách đăng ký -->
    <div class="table-wrapper" :class="{ 'menu-collapsed': isMenuCollapsed }">
      <LoadingSpinner v-if="isLoading" :text="loadingText" class="centered-loading" />
      <table v-else>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleAll" v-model="selectAll"></th>
            <th>STT</th>
            <th>Lớp</th>
            <th>Số lượng</th>
            <th>Còn lại</th>
            <th>Môn học</th>
            <th>Giáo viên</th>
            <th>Giờ học</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registration, index) in filteredRegistrations" :key="registration.id">
            <td>
              <input type="checkbox" v-model="selectedRegistrations" :value="registration.id">
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ registration.class_name }}</td>
            <td>{{ registration.quantity }}</td>
            <td>{{ registration.remaining_quantity }}</td>
            <td>{{ registration.subject_name }}</td>
            <td>{{ registration.teacher_name }}</td>
            <td>
              Từ {{ registration.from_hour }} đến {{ registration.to_hour }},
              Ngày bắt đầu {{ registration.from_date }} - Ngày kết thúc {{ registration.to_date }}
            </td>
            <td>
              <i class="fa-regular fa-eye" @click="viewRegisterDetails(registration.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Chi tiết đăng ký</h3>
        <LoadingSpinner v-if="isLoading" :text="loadingText" />
        <template v-else>
          <div v-for="(detail, index) in visibleDetails" :key="detail.id">
            <p>{{ detail.student_name }}</p>
          </div>
          <button v-if="hasMoreDetails" @click="loadMoreDetails">Xem thêm</button>
          <button @click="closeModal">Đóng</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { useMenu } from '../../../stores/use-menu';
import { useRegisterUsers } from '../../../composables/useRegisterUsers';
import LoadingSpinner from '../../../components/common/LoadingSpinner.vue';

const store = useMenu();
const isMenuCollapsed = inject('isMenuCollapsed', false);
const {
  registrations,
  teachers,
  subjects,
  filteredRegistrations,
  selectedTeacher,
  selectedSubject,
  selectAll,
  selectedRegistrations,
  alreadyRegistered,
  registerDetails,
  visibleDetails,
  showModal,
  detailsIndex,
  hasMoreDetails,
  fetchData,
  filterData,
  toggleAll,
  registerSelected,
  viewRegisterDetails,
  loadMoreDetails,
  closeModal,
  isLoading,
  loadingText
} = useRegisterUsers();

onMounted(() => {
  store.onSelectedKeys(["student-registerusers"]);
  fetchData();
});
</script>

<style scoped>
.registration-list {
  padding: 20px;
  position: relative;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

label {
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #218838;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

button:hover {
  background-color: #0056b3;
}

h3 {
  margin-top: 0;
}

.centered-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>