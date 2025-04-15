<template>
    <div class="form-group">
        <label :for="id">{{ label }}</label>
        <div class="input-wrapper">
            <input
                :type="type"
                :id="id"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <i v-if="showIcon" 
               class="fas" 
               :class="iconClass" 
               @click="$emit('toggle-visibility')"
            ></i>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    showIcon: {
        type: Boolean,
        default: false
    },
    iconClass: {
        type: String,
        default: ''
    },
    error: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue', 'toggle-visibility']);
</script>