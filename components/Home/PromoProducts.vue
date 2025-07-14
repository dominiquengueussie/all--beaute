<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight, ShoppingCart } from 'lucide-vue-next';

interface PromoProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  discountedPrice: number;
  discount: number;
  image: string;
  stock: number;
}

const { addProduct } = useCart();

const addToCart = async (product: PromoProduct) => {
  console.log("Produit ajouté:", product);
  addProduct(product, true);
};

const promoProducts = ref<PromoProduct[]>([
  {
    id: 1,
    title: 'Kit Beauté Complète',
    description: 'Clarins',
    price: "89.90",
    discountedPrice: 62.90,
    discount: 30,
    image: 'https://img.freepik.com/free-photo/beauty-product-still-life_23-2147817669.jpg?uid=R77743068&ga=GA1.1.2132251005.1744087486&semt=ais_country_boost&w=740',
    stock: 45
  },
  {
    id: 2,
    title: 'Parfum Fleuri',
    description: 'Chanel',
    price: "120.00",
    discountedPrice: 89.90,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    stock: 20
  },
  {
    id: 3,
    title: 'Baume à Lèvres',
    description: 'Bioderma',
    price:" 9.90",
    discountedPrice: 6.90,
    discount: 30,
    image: 'https://img.freepik.com/free-photo/portrait-young-beautiful-woman-with-beauty-product_23-2150331723.jpg?uid=R77743068&ga=GA1.1.2132251005.1744087486&semt=ais_country_boost&w=740',
    stock: 70
  },
  {
    id: 4,
    title: 'Shampoing Réparateur',
    description: 'Kérastase',
    price: "32.90",
    discountedPrice: 24.90,
    discount: 24,
    image: 'https://img.freepik.com/free-photo/front-view-smiley-woman-arranging-hair_23-2149634996.jpg?uid=R77743068&ga=GA1.1.2132251005.1744087486&semt=ais_country_boost&w=740',
    stock: 35
  }
]);

</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gradient-bg">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">Produits En Promotions </h2>
        <p class="text-gray-600">Profitez de nos offres spéciales</p>
      </div>
      <NuxtLink to="/store" class="text-slate-900 hover:text-gold font-medium flex items-center">
        Voir tout <ChevronRight /></NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div 
    v-for="product in promoProducts" 
    :key="product.id" 
    class="bg-slate-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 service-card relative group"
  >
    <!-- Badge de promotion -->
    <div class="absolute top-4 right-4 bg-slate-900 opacity-90 text-gold text-xs font-bold px-2 py-1 rounded-full">
      -{{ product.discount }}%
    </div>
    
    <!-- Image du produit -->
    <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover">
    
    <div class="p-4">
      <!-- Nom et marque -->
      <h3 class="text-lg font-semibold text-white mb-1">{{ product.title }}</h3>
      <p class="text-white text-sm mb-2">{{ product.description }}</p>
      
      <!-- Prix -->
      <div class="flex items-center">
        <span class="text-gold font-bold mr-2">{{ product.discountedPrice }} Fcfa</span>
        <span class="text-gray-400 text-sm line-through">{{ product.price }} Fcfa</span>
      </div>
      
      <!-- Barre de stock -->
      <div class="mt-3 flex justify-between items-center">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-yellow-golden h-2 rounded-full" 
            :style="{ width: `${product.stock}%` }"
          ></div>
        </div>
        <span class="text-xs text-slate-500 ml-2">{{ product.stock }}% restants</span>
      </div>
      
      <!-- Bouton d'ajout au panier -->
      <button 
        @click="addToCart(product)"
        class="mt-4 w-full flex items-center justify-center gap-2 bg-gold hover:bg-yellow-golden text-slate-900 py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <ShoppingCart class="w-4 h-4" />
        <span>Ajouter au panier</span>
      </button>
    </div>
  </div>
</div>
  </section>
</template>

<style scoped>
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>