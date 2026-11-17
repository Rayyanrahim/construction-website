<script setup>
defineProps({
  to: { type: String, required: true },
})

</script>

<template>
  <RouterLink :to="to" class="button flood-button">
    <slot />
  </RouterLink>
</template>

