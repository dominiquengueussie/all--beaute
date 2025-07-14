<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { ShoppingCart } from "lucide-vue-next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
    {
        id: 1,
        title: "Crème Hydratante",
        description: "Formule enrichie en acide hyaluronique pour une...",
        overlayText: "Hydratation intense 24h",
        price: "1000",
        image:
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        title: "Masque Détox",
        description: "Argile verte et charbon actif pour une peau purifiée",
        overlayText: "Purifie et illumine",
        price: "2000",
        image:
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        title: "Sérum Vitaminé C",
        description: "Antioxydant puissant pour un teint éclatant et unifié",
        overlayText: "Éclat immédiat",
        price: "3000",
        image:
            "https://img.freepik.com/photos-gratuite/vue-femme-mal-rasee-maison-dans-scene-vie-quotidienne_23-2150168711.jpg?ga=GA1.1.1906610707.1745044508&semt=ais_hybrid&w=740",
    },
    {
        id: 4,
        title: "Huile Nourrissante",
        description: "Mélange d'huiles précieuses pour une peau douce et nourrie",
        overlayText: "Nourriture intense",
        price: "4000",
        image:
            "https://img.freepik.com/photos-premium/close-up-mains-femme-afro-americaine-tenant-bouteille-goutte-goutte-huile-doree_1058532-31932.jpg?ga=GA1.1.1906610707.1745044508&semt=ais_hybrid&w=740",
    },
    {
        id: 5,
        title: "BB Crème Teintée",
        description: "Hydratation + protection SPF30 + couvrance légère",
        overlayText: "Teint parfait naturel",
        price: "5000",
        image:
            "https://img.freepik.com/photos-gratuite/portrait-jeune-belle-femme-creme-hydratante_23-2150331753.jpg?ga=GA1.1.1906610707.1745044508&semt=ais_hybrid&w=740",
    },
];
const { addProduct} = useCart();
const addToCart = async (product) => {
    console.log("Produit ajouté au panier:", product);
    addProduct(product, true);
};
</script>

<template>
    <section class="bg-gray-50 py-12 max-w-7xl mx-auto mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-slate-800 mb-1">
                Nos Produits Phares
            </h1>
            <p class="text-gray-600 mb-8 max-w-2xl">
                Découvrez notre sélection exclusive de produits de beauté pour sublimer
                votre routine
            </p>

            <Swiper :modules="[Navigation, Pagination]" :slides-per-view="1" :space-between="20" :breakpoints="{
                640: { slidesPerView: 1.3 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }" navigation pagination class="pb-12">
                <SwiperSlide v-for="(product , index) in products" :key="product.id"
                    class="bg-slate-900 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl mb-10">
                    <div class="relative h-64">
                        <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
                        <div
                            class="absolute inset-0 flex items-end p-4 product-overlay transition-opacity duration-300 opacity-0 hover:opacity-100 bg-gradient-to-t from-black/70 to-transparent">
                            <div>
                                <p class="text-white text-sm">{{ product.overlayText }}</p>
                                <!--  <button
                                    class="mt-2 bg-[#b37c5d] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#b37c5d] hover:text-white transition">
                                    Voir plus
                                </button> -->
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-white">
                            {{ product.title }}
                        </h3>
                        <p class="text-white text-sm mt-1">
                            {{ product.description.slice(0, 40) }}...
                        </p>
                        <div class="mt-3 flex justify-between items-center">
                            <span class="text-gold font-bold">{{ product.price }} Fcfa</span>
                            <button @click="addToCart(product)"
                                class="text-yellow-golden hover:text-gold transition-colors duration-200 p-2 rounded-full hover:bg-pink-50"
                                aria-label="Ajouter au panier">
                                <ShoppingCart class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <template #navigation>
                    <!--  <div class="swiper-button-prev custom-nav" />
                    <div class="swiper-button-next custom-nav" /> -->
                </template>
            </Swiper>
        </div>
    </section>
</template>

<style scoped>
.custom-nav {
    background-color: rgba(255, 255, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #6b46c1;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.custom-nav:hover {
    background-color: #6b46c1;
    color: white;
    transform: scale(1.1);
}

.swiper-pagination-bullet {
    background: #cbd5e0;
    opacity: 1;
}

.swiper-pagination-bullet-active {
    background: #6b46c1;
    transform: scale(1.2);
}
</style>
