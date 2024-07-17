<template>
  <div class="relative m-2">
    <div @click="open = !open" class="cursor-pointer">
      <button
        class="flex items-center justify-between p-2 rounded-lg text-white bg-[#ff722c] border min-w-[150px] text-center"
      >
        <span>
          {{ modelValue.toUpperCase() || selectOption.toUpperCase() }}
        </span>
        <svg
          :class="{ 'rotate-180': open }"
          class="ml-2 h-6 w-6 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <Transition name="dropdown">
        <div v-show="open" class="absolute z-10 bg-white w-full rounded-lg">
          <div
            v-for="option in options"
            @click.stop="selectOption(option)"
            class="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
          >
            <span class="ml-2">{{ option.toUpperCase() }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  modelValue: String,
  options: Array,
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedOption = ref(
  props.options.find((o) => o.value === props.modelValue)
);

const selectOption = (option) => {
  selectedOption.value = option;
  open.value = false;
  emit("update:modelValue", option);
};
</script>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-in-out;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
