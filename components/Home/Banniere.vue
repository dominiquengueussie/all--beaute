<script setup lang="ts">
import { Search } from 'lucide-vue-next';
const searchQuery = ref("");
const showResults = ref(false);
const auth = useAuthStore();
console.log('Nom utilisateur :', auth.user?.fullname)
console.log('Token :', auth.token) 
interface SearchResult {
  id: number;
  name: string;
  type: "service" | "product";
  price: number;
  icon?: string;
  brand?: string;
  provider?: string;
}

const searchResults = computed<SearchResult[]>(() => {
  // Implement search logic here
  return [];
});

const performSearch = () => {
  showResults.value = searchQuery.value.length > 0;
};

const goToResult = (result: SearchResult) => {
  alert(`Naviguer vers ${result.name}`);
  searchQuery.value = "";
  showResults.value = false;
};
</script>

<template>
  <div
    class="hero-image flex-grow flex items-center justify-center text-center text-white py-20"
  >
    <div class="max-w-4xl px-4 w-full">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Votre beauté, notre passion
      </h1>
      <p class="text-xl mb-8">
        Découvrez les meilleurs prestataires de beauté près de chez vous et
        réservez vos services en quelques clics.
      </p>

      <!-- Search Bar -->
      <div class="relative max-w-2xl mx-auto mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="performSearch"
            @focus="showResults = true"
            type="text"
            placeholder="Rechercher un service ou produit..."
            class="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <button
            class="absolute right-2 top-2 bg-slate-900 hover:bg-yellow-golden text-white p-2 rounded-full"
          >
          <Search />          </button>
        </div>

        <!-- Search Results Dropdown -->
        <div
          v-if="showResults && searchResults.length > 0"
          class="search-results mt-1"
        >
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="search-item p-4 border-b border-gray-100 cursor-pointer flex items-center"
            @click="goToResult(result)"
          >
            <div
              class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4"
            >
              <i :class="result.icon || 'fas fa-spa'" class="text-pink-500"></i>
            </div>
            <div>
              <h4 class="font-medium text-gray-800">{{ result.name }}</h4>
              <p class="text-sm text-gray-500">
                {{ result.type === "service" ? "Service" : "Produit" }} •
                {{ result.price }} €
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/becomeProvider"
          class="bg-slate-900 hover:bg-yellow-golden hover:text-slate-900 text-gold px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Devenir prestataire
        </NuxtLink>
        <NuxtLink to="/services"
          class="bg-white hover:bg-gold hover:text-slate-900 text-slate-900 px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Découvrir nos services
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80");
  background-size: cover;
  background-position: center;
}

.search-results {
  position: absolute;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
}

.search-item:hover {
  background-color: #f9fafb;
}
</style>
