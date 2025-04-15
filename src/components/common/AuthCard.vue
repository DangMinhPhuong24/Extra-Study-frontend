<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2 class="auth-title">{{ title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f2ff 0%, #b3d9ff 50%, #80bfff 100%);
    padding: 20px;
}

.auth-card {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    backdrop-filter: blur(10px);
}

.auth-title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
}
</style> 