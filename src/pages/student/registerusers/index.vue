<template>
  <div class="registration-list">
    <h1>Danh sách đăng ký môn học
      <button @click="registerSelected" :disabled="selectedRegistrations.length === 0">
        Đăng ký
      </button>
    </h1>

    <!-- Bộ lọc -->
    <div class="filters">
      <label for="teacher">Giáo viên:</label>
      <select v-model="selectedTeacher" @change="filterData">
        <option value="">Tất cả</option>
        <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
          {{ teacher.name }}
        </option>
      </select>

      <label for="subject">Môn học:</label>
      <select v-model="selectedSubject" @change="filterData">
        <option value="">Tất cả</option>
        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
          {{ subject.subject_name }}
        </option>
      </select>
    </div>

    <!-- Danh sách đăng ký -->
    <table>
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

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Chi tiết đăng ký</h3>
        <div v-for="(detail, index) in visibleDetails" :key="detail.id">
          <p>{{ detail.student_name }}</p>
        </div>
        <button v-if="hasMoreDetails" @click="loadMoreDetails">Xem thêm</button>
        <button @click="closeModal">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registrations: [],
      teachers: [],
      subjects: [],
      filteredRegistrations: [],
      selectedTeacher: '',
      selectedSubject: '',
      selectAll: false,
      selectedRegistrations: [],
      alreadyRegistered: [],
      registerDetails: [],
      visibleDetails: [],
      showModal: false,
      detailsIndex: 0,
      hasMoreDetails: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const [registerRes, teacherRes, subjectRes, registerUsersRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/register_all"),
          axios.get("http://127.0.0.1:8000/api/teacher_all"),
          axios.get("http://127.0.0.1:8000/api/subject_all"),
          axios.get("http://127.0.0.1:8000/api/register_users"),
        ]);

        this.registrations = registerRes.data.data;
        this.teachers = teacherRes.data.data;
        this.subjects = subjectRes.data.data;
        this.filteredRegistrations = this.registrations;
        this.alreadyRegistered = registerUsersRes.data.data.map(item => item.register_id);
        this.selectedRegistrations = [...this.alreadyRegistered];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    filterData() {
      this.filteredRegistrations = this.registrations.filter((registration) => {
        const matchTeacher =
          this.selectedTeacher === "" ||
          registration.teacher_id === this.selectedTeacher;
        const matchSubject =
          this.selectedSubject === "" ||
          registration.subject_id === this.selectedSubject;

        return matchTeacher && matchSubject;
      });

      this.selectedRegistrations = this.selectedRegistrations.filter((id) =>
        this.filteredRegistrations.some((registration) => registration.id === id)
      );
    },
    toggleAll() {
      if (this.selectAll) {
        this.selectedRegistrations = this.filteredRegistrations.map(
          (registration) => registration.id
        );
      } else {
        this.selectedRegistrations = [];
      }
    },
    async registerSelected() {
      try {
        const payload = {
          register_ids: this.selectedRegistrations,
        };

        const hasRegisteredItems = this.selectedRegistrations.some(id =>
          this.alreadyRegistered.includes(id)
        );

        if (hasRegisteredItems) {
          await axios.put("http://127.0.0.1:8000/api/update_register_user", payload);
          alert("Cập nhật đăng ký thành công!");
        } else {
          await axios.post("http://127.0.0.1:8000/api/create_register_user", payload);
          alert("Đăng ký mới thành công!");
        }
        this.selectedRegistrations = [];
        this.selectAll = false;
      } catch (error) {
        console.error("Error registering:", error);
        alert("Có lỗi xảy ra khi đăng ký.");
      }
    },
    async viewRegisterDetails(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detail_register_user?id=${id}`);
        this.registerDetails = response.data.data;
        this.visibleDetails = this.registerDetails.slice(0, 10);
        this.showModal = true;
        this.detailsIndex = 10;
        this.hasMoreDetails = this.registerDetails.length > 10;
      } catch (error) {
        console.error("Error fetching registration details:", error);
        alert("Có lỗi xảy ra khi lấy chi tiết đăng ký.");
      }
    },
    loadMoreDetails() {
      const nextDetails = this.registerDetails.slice(this.detailsIndex, this.detailsIndex + 10);
      this.visibleDetails.push(...nextDetails);
      this.detailsIndex += 10;

      this.hasMoreDetails = this.detailsIndex < this.registerDetails.length;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.registration-list {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
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
  text-align: left;
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
}

button:hover {
  background-color: #0056b3;
}

h3 {
  margin-top: 0;
}
</style>