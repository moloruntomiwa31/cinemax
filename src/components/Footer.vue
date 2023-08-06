<template>
    <footer>
        <h1>Built by <a href="https://github.com/moloruntomiwa31/">m-oloruntomiwa31</a></h1>
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
footer {
    border: 1px solid rgb(164, 163, 163);
    position: relative;
    margin: 1rem 0;

    h1 {
        text-transform: uppercase;
        color: white;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background-color: #353535;
        font-size: 0.5rem;border-radius: 1rem;
        font-weight: 700;

        a {
            color: #ff722c;
            text-decoration: none;
        }
    }
}
</style>