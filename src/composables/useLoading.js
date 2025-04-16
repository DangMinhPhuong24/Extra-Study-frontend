import { ref } from 'vue';

export function useLoading() {
    const isLoading = ref(false);
    const loadingText = ref('Đang tải...');

    const startLoading = (text = 'Đang tải...') => {
        isLoading.value = true;
        loadingText.value = text;
    };

    const stopLoading = () => {
        isLoading.value = false;
    };

    return {
        isLoading,
        loadingText,
        startLoading,
        stopLoading
    };
} 