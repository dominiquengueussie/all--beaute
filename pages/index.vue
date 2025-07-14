<script setup >
definePageMeta({
  layout: 'customheader',
});

</script>

<template>
  <div class="min-h-screen flex flex-col -mb-16">
    <Banniere />
    <main class="flex-grow gradient-bg">
      <Categories />
      <NewProducts />
      <PromoProducts />
      <BestProfesssional />
      <CallToAction />
    </main>
  </div>
</template>

<style>
.gradient-bg {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
body {
    font-family: "Montserrat", sans-serif;
    color: #333;
    scroll-behavior: smooth;
}

h1,
h2,
h3,
h4 {
    font-family: "Playfair Display", serif;
}
</style>