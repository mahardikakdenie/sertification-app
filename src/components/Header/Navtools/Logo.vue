<template>
  <router-link to="/">
    <img
      src="https://img.freepik.com/premium-vector/luxury-golden-award-icon-certificate-design-blue-gold-2_609989-190.jpg?w=1380"
      alt=""
      width="70"
      v-if="!this.$store.themeSettingsStore.isDark"
      />
      
      <img
      src="https://img.freepik.com/premium-vector/luxury-golden-award-icon-certificate-design-blue-gold-2_609989-190.jpg?w=1380"
      width="70"
      alt=""
      v-if="this.$store.themeSettingsStore.isDark"
    />
  </router-link>
</template>
<script></script>
