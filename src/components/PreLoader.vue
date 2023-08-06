<template>
    <div class="preloader">
        <div class="spinner"></div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.preloader {
    display: grid;
    place-items: center;
    min-height: 100vh;
}

.spinner {
    border: 4px dotted rgb(253, 249, 249);
    border-top: 4px solid #F97B22;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>