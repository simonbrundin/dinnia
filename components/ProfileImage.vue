<template>
  <div id="profile-image">
    <nuxt-link to="/user">
      <img
        src="https://www.nj.gov/njgf/assets/images/EC_Members_Default.jpg"
        alt=""
    /></nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#profile-image {
  display: flex;
  justify-content: flex-end;
}
#profile-image img {
  width: 36px;
}
</style>
