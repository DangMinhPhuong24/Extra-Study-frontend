import { ref } from 'vue';
import axios from 'axios';
import { useLoading } from './useLoading';

export function useTimetable() {
    const { isLoading, loadingText, startLoading, stopLoading } = useLoading();
    const showModal = ref(false);
    const selectedEvent = ref(null);
    const students = ref([]);
    const eventsData = ref([]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        }
    ];

    const closeModal = () => {
        showModal.value = false;
        selectedEvent.value = null;
        students.value = [];
    };

    const fetchTimetable = async () => {
        try {
            startLoading('Đang tải thời khóa biểu...');
            const indexRes = await axios.get(`${import.meta.env.VITE_API_URL}/register_users`);
            eventsData.value = indexRes.data.data;
            
            return eventsData.value.map(timetable => ({
                id: timetable.register_id.toString(),
                title: `${timetable.subject_name}\n ${timetable.from_hour} - ${timetable.to_hour}\n ${timetable.teacher_name}`,
                start: `${timetable.from_date_origin}T${timetable.from_hour}`,
                end: `${timetable.from_date_origin}T${timetable.to_hour}`,
                textColor: 'black',
                backgroundColor: '#D8FFD0',
                borderColor: '#C8D4FF'
            }));
        } catch (error) {
            console.error('Lỗi khi load dữ liệu thời khóa biểu:', error);
            return [];
        } finally {
            stopLoading();
        }
    };

    const handleEventClick = async (info) => {
        try {
            startLoading('Đang tải thông tin lớp học...');
            selectedEvent.value = info.event;
            showModal.value = true;
            
            const eventId = info.event.id;
            console.log('Event ID:', eventId);
            
            if (eventId) {
                const detailRes = await axios.get(`${import.meta.env.VITE_API_URL}/detail_register_user?id=${eventId}`);
                console.log('Detail Response:', detailRes.data);
                
                students.value = detailRes.data.data.map((student, index) => ({
                    key: (index + 1).toString(),
                    name: student.student_name
                }));
            }
        } catch (error) {
            console.error('Lỗi khi xử lý sự kiện:', error);
        } finally {
            stopLoading();
        }
    };

    return {
        showModal,
        selectedEvent,
        students,
        columns,
        closeModal,
        fetchTimetable,
        handleEventClick,
        isLoading,
        loadingText
    };
} 