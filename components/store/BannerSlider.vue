<template>
  <div class="swiper banner-slider h-[400px] md:h-[400px] lg:h-[500px]">
    <Swiper
      :modules="[Navigation, Autoplay]"
      class="w-full h-screen max-h-[800px]"
      :loop="true"
      :autoplay="{ delay: 7000, disableOnInteraction: false }"
      :speed="1000"
      effect="slide"
      grab-cursor
      navigation
      @slideChangeTransitionStart="onSlideChangeStart"
      @slideChangeTransitionEnd="onSlideChangeEnd"
      @init="onInit"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative w-full h-full overflow-hidden">
          <img :src="slide.image" :alt="slide.title" class="banner-image" />
          <div class="banner-content">
            <h2 class="banner-title">{{ slide.title }}</h2>
            <p class="banner-description">{{ slide.description }}</p>
            <NuxtLink to="/" class="banner-button bg-gold text-slate-900">{{ slide.button }}</NuxtLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>


<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation} from "swiper/modules";

const slides = [
  {
    title: "Soins Visage Premium",
    description: "Découvrez notre gamme exclusive de soins visage anti-âge et hydratants pour une peau éclatante",
    button: "Commander",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
  },
  {
    title: "Massage Relaxant",
    description: "Offrez-vous un moment de détente absolue avec nos massages aux huiles essentielles bio",
    button: "Commander",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Épilage Professionnel",
    description: "Techniques douces et indolores pour une peau parfaitement lisse durablement",
    button: "Commander",
    image: "https://img.freepik.com/photos-premium/toilettage-jambes-creme-raser-epilation-modele-femme-noire-occupe-hygiene-corporelle-nettoyage-peau-cosmetique-beaute-bien-etre-personne-du-kenya-rasage-soin-lotion-savon_590464-110172.jpg?semt=ais_hybrid&w=740"
  },
  {
    title: "Maquillage Artistique",
    description: "Laissez-vous sublimer par nos experts en maquillage pour des occasions spéciales",
    button: "Commander",
    image: "https://img.freepik.com/photos-premium/close-up-model-lady-brunette-coiffure-ondulee-look-esthetique-make-maquillage-show-brushes_274222-19760.jpg?ga=GA1.1.1906610707.1745044508&semt=ais_hybrid&w=740"
  }
];

const onInit = (swiper) =>
  animateSlideContent(swiper.slides[swiper.activeIndex]);
const onSlideChangeStart = (swiper) => swiper.slides.forEach(resetSlideContent);
const onSlideChangeEnd = (swiper) =>
  animateSlideContent(swiper.slides[swiper.activeIndex]);

const animateSlideContent = (slide) => {
  slide.querySelector(".banner-content")?.classList.add("active");
};

const resetSlideContent = (slide) => {
  slide.querySelector(".banner-content")?.classList.remove("active");
};
</script>

<style scoped>
.banner-image {
  @apply w-full h-full object-bottom scale-[1.1] transition-transform duration-500 ease-in-out;
}

.swiper-slide-active .banner-image {
  @apply scale-100;
}

.banner-content {
  @apply absolute bottom-[35%] md:bottom-[35%] lg:bottom-[35%] xl:bottom-[40%] left-[10%] w-[40%] min-w-[300px] p-10 bg-black/30 backdrop-blur-sm rounded-[10px] text-white opacity-0 translate-x-[100px] transition-all duration-1000 ease-in-out;
}

.banner-content.active {
  @apply opacity-100 translate-x-0;
}

.banner-title {
  @apply text-4xl font-bold mb-4 opacity-0 translate-y-[30px] transition-all duration-700 delay-300 ease-in-out;
}

.banner-description {
  @apply text-lg leading-relaxed mb-10 opacity-0 translate-y-[30px] transition-all duration-700 delay-500 ease-in-out;
}

.banner-button {
  @apply px-8 py-3 font-bold rounded-full no-underline opacity-0 translate-y-[30px] transition-all duration-700 delay-700 ease-in-out;
}

.banner-content.active .banner-title,
.banner-content.active .banner-description,
.banner-content.active .banner-button {
  @apply opacity-100 translate-y-0;
}

 .swiper-button-next,
.swiper-button-prev {
  @apply text-white bg-white/20 w-[60px] h-[60px] rounded-full hidden backdrop-blur-sm transition-all duration-300 ease-in-out;
} 


@media (max-width: 768px) {
  .swiper {
    @apply h-[70vh];
  }

  .banner-content {
    @apply w-[80%] left-[5%] bottom-[10%] p-5;
  }

  .banner-title {
    @apply text-2xl;
  }

  .banner-description {
    @apply text-base;
  }

   .swiper-button-next,
  .swiper-button-prev {
    @apply w-10 h-10 hidden;
  } 
}
</style>
