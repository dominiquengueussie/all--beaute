<script setup>
import { Heart, Share2, Star, Slash } from "lucide-vue-next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <Breadcrumb class="mb-6 ml-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            Accueil
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/services">
            Services
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage class="text-[#FF6B6B]">Manucure Premium</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Service Header -->
      <div class="p-6 border-b">
        <div class="flex justify-between items-start">
          <div>
            <span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">ID: #BS-0421</span>
            <h2 class="text-3xl font-bold text-dark mt-2">Manucure Premium</h2>
            <p class="text-gray-500 text-sm mt-1 flex items-center gap-1">
              <Star class="w-4 h-4 text-yellow-500" />
              <Star class="w-4 h-4 text-yellow-500" />
              <Star class="w-4 h-4 text-yellow-500" />
              <Star class="w-4 h-4 text-yellow-500" />
              <Star class="w-4 h-4 text-yellow-500" />
              <span class="text-gray-600 text-md">4.7</span>
              <span class="text-gray-600 text-md">(128 avis)</span>
            </p>
          </div>
          <div class="flex space-x-3">
            <button class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <Heart class="w-5 h-5" />
            </button>
            <button class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <Share2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div class="md:flex">
        <ServiceGallery />
        <ServiceInfo />
      </div>

      <div class="p-6">
        <ServiceDescription />
      </div>
    </div>
  </div>
</template>
<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Playfair Display', 'serif';
}

body {
  font-family: 'Montserrat', 'sans-serif';
}
</style>