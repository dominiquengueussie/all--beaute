<template>
  <div class="min-h-screen flex flex-col">
    <NavBar @toggleServiceCart="toggleServiceCart" @toggleProductCart="toggleProductCart" />
    <div class="flex-grow py-16 ">
      <slot />
    </div>
    <Footer />
    <ServiceCart />
    <ProductCart />
  </div>
</template>

<script setup></script>
