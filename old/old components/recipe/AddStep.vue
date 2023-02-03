<template>
  <Modal>
    <button @click="$emit('hideAddStep')">Stäng</button>
    <div>
      <input v-model="title" type="text" placeholder="Beskrivning" />
    </div>

    <button @click="$emit('addStep', title)">Lägg till steg</button>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    }
  },
}
</script>

<style scoped>
input {
  border: 1px solid black;
}
button {
  border: 1px solid black;
  padding: 0 16px;
}
</style>
