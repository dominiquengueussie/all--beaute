<script setup>
import {
  CircleGauge,
  ConciergeBell,
  ShoppingBag,
  ChevronDown,
  Star,
  List,
  Settings,
  LogOut,
  CalendarClock,
  CircleSmall,
  NotebookTabs,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification'
 const toast = useToast()
//const route = useRouter();
const isCollapsed = ref(false);
// Votre fonction isActive existante
const isActive = (path) => {
  return useRoute().path.startsWith(path);
};
const auth = useAuthStore();
const isLoggingOut = ref(false);

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    await auth.logout();
    toast.success('Déconnexion réussie !')
    navigateTo("/");
  } catch (error) {
    console.error("Erreur pendant la déconnexion", error);
  } finally {
    isLoggingOut.value = false;
  }
};

const role = computed(() => auth.user?.role);
</script>
<template>
  <div
    class="w-64 bg-slate-900 text-white shadow-lg fixed h-full overflow-y-auto z-10 transition-all duration-300"
    :class="{ '!w-20': isCollapsed }"
  >
    <div class="p-4 border-b flex justify-between items-center">
      <div :class="{ hidden: isCollapsed }">
        <NuxtLink to="/" class="text-2xl font-bold text-gold"
          >AllôBeauté</NuxtLink
        >
        <p class="text-sm text-gray-100">Plateforme de services</p>
      </div>
      <div
        class="flex items-center space-x-2 hover:cursor-pointer"
        @click="isCollapsed = !isCollapsed"
      >
        <List />
      </div>
    </div>
    <nav class="mt-6">
      <NuxtLink
        to="/dashboard"
        :class="[
          'flex items-center px-4 py-3',
          isActive('/dashboard')
            ? ''
            : 'text-white hover:bg-gray-50 transition-colors duration-200',
        ]"
      >
        <CircleGauge class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3"
          >Tableau de bord</span
        >
      </NuxtLink>
      <NuxtLink
        to="/dashboard/prestataires/lists"
            class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"

      >
        <NotebookTabs class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3"
          >Voir les prestataires</span
        >
      </NuxtLink>
      <NuxtLink
        to="/dashboard/appointments"
        class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"
      >
        <ShoppingBag class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3"
          >Produits à vendre</span
        >
      </NuxtLink>
      <NuxtLink
        to="/dashboard/services"
         class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"
      >
        <ConciergeBell class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3">Mes services</span>
      </NuxtLink>
      <div
         class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"
      >
        <details class="group">
          <summary
            class="flex items-center cursor-pointer hover:bg-gray-500 rounded px-2 py-2 transition-colors duration-200"
          >
            <CalendarClock class="h-5 w-5" />
            <span :class="{ hidden: isCollapsed }" class="ml-3 flex-1"
              >Réservation</span
            >
            <ChevronDown
              :class="{ hidden: isCollapsed }"
              class="h-4 w-4 transition-transform group-open:rotate-180"
            />
          </summary>
          <div :class="{ hidden: isCollapsed }" class="mt-2 ml-8">
            <NuxtLink
              to="/dashboard/incoming-bookings"
              class="py-2 text-sm text-gray-100 hover:text-gray-100 transition-colors flex items-center"
            >
              <CircleSmall class="mr-2 h-4 w-4 text-gray-100" />Réservations
              reçues
            </NuxtLink>
            <NuxtLink
              to="/dashboard/booked-services"
              class="py-2 text-sm text-gray-100 hover:text-gray-100 transition-colors flex items-center"
            >
              <CircleSmall class="mr-2 h-4 w-4 text-gray-100" />Services
              réservés
            </NuxtLink>
          </div>
        </details>
      </div>
      <NuxtLink
        to="/dashboard/reviews"
         class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"
      >
        <Star class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3">Avis clients</span>
      </NuxtLink>
      <div :class="{ hidden: isCollapsed }" class="px-4 mt-6 mb-3">
        <p class="text-xs uppercase text-gray-400 tracking-wider">Paramètres</p>
      </div>
      <NuxtLink
        to="/dashboard/settings"
         class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200"
      >
        <Settings class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3"
          >Paramètres du compte</span
        >
      </NuxtLink>
      <p
        @click.prevent="handleLogout"
         class="flex items-center px-4 py-3 text-white hover:bg-gray-500 transition-colors duration-200 cursor-pointer"
      >
        <LogOut class="h-5 w-5" />
        <span :class="{ hidden: isCollapsed }" class="ml-3">
          <span v-if="isLoggingOut">Déconnexion en cours...</span>
          <span v-else>Déconnexion</span>
        </span>
      </p>
    </nav>
  </div>
  <div :class="{ '-ml-48': isCollapsed }">
    <slot />
  </div>
</template>

<style scoped>
span {
  font-family: "Playfair Display", serif;
  font-weight: 700;
}
</style>
