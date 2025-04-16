import { ref } from 'vue';
import axios from 'axios';
import { useLoading } from './useLoading';

export function useRegisterUsers() {
    const { isLoading, loadingText, startLoading, stopLoading } = useLoading();
    const registrations = ref([]);
    const teachers = ref([]);
    const subjects = ref([]);
    const filteredRegistrations = ref([]);
    const selectedTeacher = ref('');
    const selectedSubject = ref('');
    const selectAll = ref(false);
    const selectedRegistrations = ref([]);
    const alreadyRegistered = ref([]);
    const registerDetails = ref([]);
    const visibleDetails = ref([]);
    const showModal = ref(false);
    const detailsIndex = ref(0);
    const hasMoreDetails = ref(false);

    // Pagination
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalRecords = ref(0);

    const fetchData = async (page = 1) => {
        try {
            startLoading('Đang tải dữ liệu...');
            const [teacherRes, subjectRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/teacher_all`),
                axios.get(`${import.meta.env.VITE_API_URL}/subject_all`),
            ]);

            teachers.value = teacherRes.data.data;
            subjects.value = subjectRes.data.data;

            // Fetch registrations with pagination
            const registerRes = await axios.get(`${import.meta.env.VITE_API_URL}/registers?page=${page}&register_user=`);
            registrations.value = registerRes.data.data;
            totalPages.value = registerRes.data.total_pages || 1;
            totalRecords.value = registerRes.data.total_records || 0;
            currentPage.value = page;

            // Fetch registered users
            const registerUsersRes = await axios.get(`${import.meta.env.VITE_API_URL}/register_users`);
            alreadyRegistered.value = registerUsersRes.data.data.map(item => item.register_id);
            selectedRegistrations.value = [...alreadyRegistered.value];
            filteredRegistrations.value = registrations.value;

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            stopLoading();
        }
    };

    const filterData = () => {
        filteredRegistrations.value = registrations.value.filter((registration) => {
            const matchTeacher =
                selectedTeacher.value === "" ||
                registration.teacher_id === selectedTeacher.value;
            const matchSubject =
                selectedSubject.value === "" ||
                registration.subject_id === selectedSubject.value;

            return matchTeacher && matchSubject;
        });

        selectedRegistrations.value = selectedRegistrations.value.filter((id) =>
            filteredRegistrations.value.some((registration) => registration.id === id)
        );
    };

    const changePage = async (page) => {
        await fetchData(page);
    };

    const toggleAll = () => {
        if (selectAll.value) {
            selectedRegistrations.value = filteredRegistrations.value.map(
                (registration) => registration.id
            );
        } else {
            selectedRegistrations.value = [];
        }
    };

    const registerSelected = async () => {
        try {
            startLoading('Đang xử lý đăng ký...');
            const payload = {
                register_ids: selectedRegistrations.value,
            };

            const hasRegisteredItems = selectedRegistrations.value.some(id =>
                alreadyRegistered.value.includes(id)
            );

            if (hasRegisteredItems) {
                await axios.put(`${import.meta.env.VITE_API_URL}/update_register_user`, payload);
                alert("Cập nhật đăng ký thành công!");
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/create_register_user`, payload);
                alert("Đăng ký mới thành công!");
            }
            selectedRegistrations.value = [];
            selectAll.value = false;
            await fetchData(currentPage.value); // Refresh current page
        } catch (error) {
            console.error("Error registering:", error);
            alert("Có lỗi xảy ra khi đăng ký.");
        } finally {
            stopLoading();
        }
    };

    const viewRegisterDetails = async (id) => {
        try {
            startLoading('Đang tải chi tiết đăng ký...');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/detail_register_user?id=${id}`);
            registerDetails.value = response.data.data;
            visibleDetails.value = registerDetails.value.slice(0, 10);
            showModal.value = true;
            detailsIndex.value = 10;
            hasMoreDetails.value = registerDetails.value.length > 10;
        } catch (error) {
            console.error("Error fetching registration details:", error);
            alert("Có lỗi xảy ra khi lấy chi tiết đăng ký.");
        } finally {
            stopLoading();
        }
    };

    const loadMoreDetails = () => {
        const nextDetails = registerDetails.value.slice(detailsIndex.value, detailsIndex.value + 10);
        visibleDetails.value.push(...nextDetails);
        detailsIndex.value += 10;
        hasMoreDetails.value = detailsIndex.value < registerDetails.value.length;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    return {
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
        currentPage,
        totalPages,
        totalRecords,
        fetchData,
        filterData,
        changePage,
        toggleAll,
        registerSelected,
        viewRegisterDetails,
        loadMoreDetails,
        closeModal,
        isLoading,
        loadingText
    };
} 