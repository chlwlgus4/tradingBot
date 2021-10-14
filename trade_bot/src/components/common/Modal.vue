<template>
  <transition name="modal">
    <div class="container">
      <main>
        <slot name="content"></slot>
      </main>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style scoped>

</style>