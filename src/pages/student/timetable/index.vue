<template>
    <div>
        <FullCalendar :options="calendarOptions" />
        <ClassDetailModal 
            :show="showModal" 
            :eventData="selectedEvent" 
            :students="students"
            :columns="columns"
            @close="closeModal" 
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMenu } from '../../../stores/use-menu';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import ClassDetailModal from '../../../components/common/ClassDetailModal.vue';
import axios from 'axios';

const store = useMenu();
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

const timetableIndex = async () => {
    try {
        const indexRes = await axios.get(`${import.meta.env.VITE_API_URL}/register_users`);
        eventsData.value = indexRes.data.data;
        
        calendarOptions.value.events = eventsData.value.map(timetable => ({
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
    }
};

const handleEventClick = async (info) => {
    try {
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
    }
};

const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    locale: viLocale,
    slotMinTime: '09:00:00',
    slotMaxTime: '23:00:00',
    allDaySlot: false,
    height: 590,
    events: [],
    eventContent: function(arg) {
        const title = arg.event.title || '';
        return {
            html: `<div style="white-space: normal; font-size: 14px; padding: 2px;">
                ${title.replace(/\n/g, '<br>')}</div>`
        };
    },
    eventClick: handleEventClick
});

onMounted(async () => {
    store.onSelectedKeys(["student-timetable"]);
    await timetableIndex();
});
</script>

<style scoped>
.fc {
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>