<template>
    <LoadingSpinner v-if="isLoading" :text="loadingText" />
    <FullCalendar v-else :options="calendarOptions" />
    <ClassDetailModal 
        :show="showModal" 
        :eventData="selectedEvent" 
        :students="students"
        :columns="columns"
        :isLoading="isLoading"
        :loadingText="loadingText"
        @close="closeModal" 
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMenu } from '../../../stores/use-menu';
import { useTimetable } from '../../../composables/useTimetable';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import ClassDetailModal from '../../../components/common/ClassDetailModal.vue';
import LoadingSpinner from '../../../components/common/LoadingSpinner.vue';

const store = useMenu();
const { showModal, selectedEvent, students, columns, closeModal, fetchTimetable, handleEventClick, isLoading, loadingText } = useTimetable();

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
    calendarOptions.value.events = await fetchTimetable();
});
</script>