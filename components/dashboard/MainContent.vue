<script setup lang="ts">
import {ChevronRight,Trash2,SquarePen,Star,ArrowDown,UserPlus,ArrowUp,Euro,CalendarFold,Search,Bell} from 'lucide-vue-next';
import * as echarts from 'echarts';
// User avatar
const userAvatar =
  "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20beautiful%20young%20French%20woman%20with%20short%20brown%20hair%2C%20warm%20smile%2C%20natural%20makeup%2C%20beauty%20salon%20owner%2C%20professional%20headshot%2C%20neutral%20background%2C%20high%20quality%2C%20photorealistic&width=200&height=200&seq=1&orientation=squarish";
// Charts references
const revenueChartRef = ref<HTMLElement | null>(null);
const servicesChartRef = ref<HTMLElement | null>(null);
// Appointments data
const appointments = ref([
  {
    clientName: "Marie Dupont",
    clientEmail: "marie.d@example.com",
    clientAvatar:
      "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20French%20woman%20with%20long%20blonde%20hair%2C%20natural%20makeup%2C%20friendly%20smile%2C%20neutral%20background%2C%20professional%20photo%2C%20high%20quality&width=100&height=100&seq=2&orientation=squarish",
    service: "Soin du visage",
    dateTime: "01 Mai 2025, 10:00",
    duration: "60 min",
    price: 85,
    status: "Confirmé",
  },
  {
    clientName: "Julie Martin",
    clientEmail: "julie.m@example.com",
    clientAvatar:
      "https://readdy.ai/api/search-image?query=portrait%20of%20a%20middle-aged%20French%20woman%20with%20short%20red%20hair%2C%20glasses%2C%20professional%20appearance%2C%20neutral%20background%2C%20high%20quality%20photo&width=100&height=100&seq=3&orientation=squarish",
    service: "Manucure",
    dateTime: "01 Mai 2025, 11:30",
    duration: "45 min",
    price: 40,
    status: "En attente",
  },
  {
    clientName: "Camille Blanc",
    clientEmail: "camille.b@example.com",
    clientAvatar:
      "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20French%20woman%20with%20curly%20brown%20hair%2C%20natural%20makeup%2C%20casual%20style%2C%20neutral%20background%2C%20professional%20photo%2C%20high%20quality&width=100&height=100&seq=4&orientation=squarish",
    service: "Massage relaxant",
    dateTime: "01 Mai 2025, 14:00",
    duration: "90 min",
    price: 120,
    status: "Confirmé",
  },
  {
    clientName: "Thomas Petit",
    clientEmail: "thomas.p@example.com",
    clientAvatar:
      "https://readdy.ai/api/search-image?query=portrait%20of%20a%20young%20French%20man%20with%20short%20dark%20hair%2C%20clean%20shaven%2C%20professional%20appearance%2C%20neutral%20background%2C%20high%20quality%20photo&width=100&height=100&seq=5&orientation=squarish",
    service: "Coupe homme",
    dateTime: "01 Mai 2025, 16:00",
    duration: "30 min",
    price: 35,
    status: "Confirmé",
  },
]);
// Products data
const products = ref([
  {
    name: "Crème hydratante visage",
    category: "Soins visage",
    price: 49.99,
    stock: 15,
    image:
      "https://readdy.ai/api/search-image?query=luxury%20face%20cream%20in%20elegant%20glass%20jar%20with%20pink%20lid%2C%20high-end%20skincare%20product%2C%20beauty%20product%20photography%2C%20clean%20minimal%20background%2C%20professional%20product%20shot%2C%20cosmetic%20cream%2C%20soft%20lighting&width=300&height=200&seq=6&orientation=landscape",
  },
  {
    name: "Huile de massage relaxante",
    category: "Massage",
    price: 29.99,
    stock: 8,
    image:
      "https://readdy.ai/api/search-image?query=elegant%20glass%20bottle%20of%20massage%20oil%20with%20wooden%20cap%2C%20lavender%20and%20essential%20oils%2C%20beauty%20product%20photography%2C%20clean%20minimal%20background%2C%20professional%20product%20shot%2C%20soft%20lighting&width=300&height=200&seq=7&orientation=landscape",
  },
  {
    name: "Vernis à ongles bio",
    category: "Manucure",
    price: 18.5,
    stock: 22,
    image:
      "https://readdy.ai/api/search-image?query=luxury%20nail%20polish%20bottle%20in%20pink%20color%2C%20organic%20nail%20polish%2C%20beauty%20product%20photography%2C%20clean%20minimal%20background%2C%20professional%20product%20shot%2C%20cosmetic%20product%2C%20soft%20lighting&width=300&height=200&seq=8&orientation=landscape",
  },
  {
    name: "Sérum anti-âge",
    category: "Soins visage",
    price: 89.99,
    stock: 5,
    image:
      "https://readdy.ai/api/search-image?query=premium%20anti-aging%20serum%20in%20elegant%20dropper%20bottle%2C%20luxury%20skincare%20product%2C%20beauty%20product%20photography%2C%20clean%20minimal%20background%2C%20professional%20product%20shot%2C%20cosmetic%20serum%2C%20soft%20lighting&width=300&height=200&seq=9&orientation=landscape",
  },
]);
// Status class helper
const getStatusClass = (status: string) => {
  switch (status) {
    case "Confirmé":
      return "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800";
    case "En attente":
      return "px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800";
    case "Annulé":
      return "px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800";
    default:
      return "px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800";
  }
};
onMounted(() => {
  // Initialize Revenue Chart
  if (revenueChartRef.value) {
    const revenueChart = echarts.init(revenueChartRef.value);
    const revenueOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        formatter: "{b}: {c} €",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        axisLine: {
          lineStyle: {
            color: "#ddd",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: "{value} €",
        },
        splitLine: {
          lineStyle: {
            color: "#f0f0f0",
          },
        },
      },
      series: [
        {
          name: "Revenus",
          type: "line",
          smooth: true,
          data: [280, 350, 310, 420, 390, 530, 480],
          itemStyle: {
            color: "#ec4899",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(236, 72, 153, 0.5)" },
              { offset: 1, color: "rgba(236, 72, 153, 0.05)" },
            ]),
          },
        },
      ],
    };
    revenueChart.setOption(revenueOption);
    window.addEventListener("resize", () => {
      revenueChart.resize();
    });
  }
  // Initialize Services Chart
  if (servicesChartRef.value) {
    const servicesChart = echarts.init(servicesChartRef.value);
    const servicesOption = {
      animation: false,
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: ["Soins visage", "Massages", "Manucure", "Coiffure", "Autres"],
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: 35,
              name: "Soins visage",
              itemStyle: { color: "#ec4899" },
            },
            { value: 25, name: "Massages", itemStyle: { color: "#8b5cf6" } },
            { value: 20, name: "Manucure", itemStyle: { color: "#3b82f6" } },
            { value: 15, name: "Coiffure", itemStyle: { color: "#10b981" } },
            { value: 5, name: "Autres", itemStyle: { color: "#f59e0b" } },
          ],
        },
      ],
    };
    servicesChart.setOption(servicesOption);
    window.addEventListener("resize", () => {
      servicesChart.resize();
    });
  }
});

const auth = useAuthStore();
const fullName = computed(() => {
  return `${auth.user?.fullname}`;
});
const enterpriseName = computed(() => {
  return `${auth.user?.fullname}`;
});

</script>

<template>
    <div class="ml-64 flex-1">
        <!-- Header -->
        <header class="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-5">
            <div class="flex items-center">
                <div class="relative">
                    <input type="text" placeholder="Rechercher..."
                        class="pl-10 pr-4 py-2 border-none rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm" />
                        <Search class="fas fa-search absolute left-3 top-2.5 text-gray-400 h-4 w-4"/>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <button class="text-gray-500 hover:text-pink-500 transition-colors duration-200 cursor-pointer">
                        <Bell class="text-xl"/>
                        <span
                            class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                    </button>
                </div>
                <div class="flex items-center space-x-3 cursor-pointer">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img :src="userAvatar" alt="Avatar utilisateur" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-medium text-sm">{{ fullName }}</p>
                        <p class="text-xs text-gray-500">{{ enterpriseName }}</p>
                    </div>
                </div>
            </div>
        </header>
        <!-- Dashboard Content -->
        <main class="p-6">
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-800">Bonjour, {{ enterpriseName }}</h1>
                <p class="text-gray-600">
                    Voici un aperçu de votre activité aujourd'hui
                </p>
            </div>
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-pink-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Rendez-vous aujourd'hui</p>
                            <p class="text-2xl font-bold mt-1">8</p>
                        </div>
                        <div class="bg-pink-100 p-3 rounded-full">
                            <CalendarFold class="fas fa-calendar text-pink-500"/>
                        </div>
                    </div>
                    <div class="mt-4 text-sm flex">
                        <ArrowUp class="text-green-500"/>
                        <span class="text-green-500 mr-1"> 12% </span>
                        <span>depuis hier</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Ventes du jour</p>
                            <p class="text-2xl font-bold mt-1">320 €</p>
                        </div>
                        <div class="bg-purple-100 p-3 rounded-full">
                            <Euro class="fas fa-euro-sign text-purple-500"/>
                        </div>
                    </div>
                    <div class="mt-4 text-sm flex">
                        <ArrowUp class="text-green-500"/>
                        <span class="text-green-500 mr-1"> 8% </span>
                        <span>depuis hier</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Nouveaux clients</p>
                            <p class="text-2xl font-bold mt-1">3</p>
                        </div>
                        <div class="bg-blue-100 p-3 rounded-full">
                            <UserPlus class="fas fa-user-plus text-blue-500"/>
                        </div>
                    </div>
                    <div class="mt-4 text-sm flex">
                        <ArrowDown class="text-red-500"/>
                        <span class="text-red-500 mr-1"> 5% </span>
                        <span>depuis hier</span>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Avis reçus</p>
                            <p class="text-2xl font-bold mt-1">
                                4.8 <span class="text-sm font-normal text-gray-500">/5</span>
                            </p>
                        </div>
                        <div class="bg-yellow-100 p-3 rounded-full">
                            <Star class="text-yellow-500"/>
                        </div>
                    </div>
                    <div class="mt-4 text-sm">
                        <span class="text-gray-500">12 nouveaux avis</span>
                    </div>
                </div>
            </div>
            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-bold text-gray-800">Revenus mensuels</h2>
                        <div class="text-sm text-gray-500">Mai 2025</div>
                    </div>
                    <div class="h-80">
                        <div ref="revenueChartRef" class="w-full h-full"></div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-bold text-gray-800">Services populaires</h2>
                        <div class="text-sm text-gray-500">Derniers 30 jours</div>
                    </div>
                    <div class="h-80">
                        <div ref="servicesChartRef" class="w-full h-full"></div>
                    </div>
                </div>
            </div>
            <!-- Upcoming Appointments -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="font-bold text-gray-800">Prochains rendez-vous</h2>
                    <button
                        class="text-pink-600 hover:text-pink-700 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap flex items-center">
                        Voir tous <ChevronRight class="w-4 h-4 ml-1"/>
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Heure
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durée
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Prix
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(appointment, index) in appointments" :key="index">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="h-10 w-10 rounded-full overflow-hidden mr-3">
                                            <img :src="appointment.clientAvatar" alt="Client"
                                                class="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ appointment.clientName }}
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                {{ appointment.clientEmail }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ appointment.service }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ appointment.dateTime }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ appointment.duration }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ appointment.price }} €
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="getStatusClass(appointment.status)">
                                        {{ appointment.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        class="text-pink-600 hover:text-pink-900 mr-3 cursor-pointer !rounded-button whitespace-nowrap">
                                        <SquarePen class="w-5 h-5"/>
                                    </button>
                                    <button
                                        class="text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                                        <Trash2 class="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Recent Products -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="font-bold text-gray-800">Produits récemment ajoutés</h2>
                    <button
                        class="text-pink-600 hover:text-pink-700 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap flex items-center">Voir tous
                        <ChevronRight class="w-4 h-4 ml-1"/>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="(product, index) in products" :key="index"
                        class="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div class="h-48 overflow-hidden">
                            <img :src="product.image" alt="Product" class="w-full h-full object-cover object-top" />
                        </div>
                        <div class="p-4">
                            <h3 class="font-medium text-gray-900">{{ product.name }}</h3>
                            <p class="text-gray-500 text-sm mt-1">{{ product.category }}</p>
                            <div class="flex justify-between items-center mt-3">
                                <p class="font-bold text-pink-600">{{ product.price }} €</p>
                                <p class="text-sm text-gray-500">
                                    Stock: {{ product.stock }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>