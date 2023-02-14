<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import { NhostClient } from "@nhost/nhost-js";
const nhost = new NhostClient({
  subdomain: "rzcywmsyykhpunfkygpk",
  region: "eu-central-1",
});
const isAuthenticated = nhost.auth.isAuthenticated();
</script>
