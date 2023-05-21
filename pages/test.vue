<template>
  <div class="text-white flex flex-col gap-4 justify-center items-center">
    <input type="text" v-model="facility_id" class="text-black" />
    <input type="text" v-model="slot_id" class="text-black" />
    <div class="text-white">
      <u>Att skicka med bokningsfråga</u>
      <div>facility_id</div>
      <div>slot_id</div>
      <div>token</div>
    </div>
    <div class="text-white">
      <u>Hur hanterar sernern frågan</u>
      <div>Ta fram pris</div>
      <div>slot_id</div>
      <div>token</div>
    </div>

    <button class="bg-red-600">Betala</button>
  </div>
</template>

<script setup lang="ts">
const facility_id = ref("facility_id");
const slot_id = ref("slot_id");
</script>

<style scoped></style>
