<script lang="ts" setup>
import { Search, Clock9, Bell, Plus, Wand2, Syringe, Package2, SprayCan, ShowerHead, Euro, ShoppingBag, ChevronDown, Grid, Flame, Hand, Sparkles, Scissors, ArrowDownNarrowWide, SquarePen, Trash2, ConciergeBell, TriangleAlert } from "lucide-vue-next";

// User avatar
const userAvatar =
  "https://readdy.ai/api/search-image?query=professional%252520portrait%252520of%252520a%252520beautiful%252520young%252520French%252520woman%252520with%252520short%252520brown%252520hair%25252C%252520warm%252520smile%25252C%252520natural%252520makeup%25252C%252520beauty%252520salon%252520owner%25252C%252520professional%252520headshot%25252C%252520neutral%252520background%25252C%252520high%252520quality%25252C%252520photorealistic&width=200&height=200&seq=1&orientation=squarish";
// Categories
const categories = ref([
  { id: "all", name: "Tous les produits", icon: Grid },             // fas fa-th-large
  { id: "skincare", name: "Soins du visage", icon: Flame },           // fas fa-spa
  { id: "makeup", name: "Maquillage", icon: Wand2 },                // fas fa-magic
  { id: "haircare", name: "Soins capillaires", icon: Syringe },    // fas fa-pump-soap
  { id: "bodycare", name: "Soins du corps", icon: ShowerHead },     // fas fa-shower
  { id: "fragrance", name: "Parfums", icon: SprayCan },      // fas fa-air-freshener
])
// Products data
const products = ref([
  {
    id: 1,
    name: "Crème hydratante visage",
    categoryId: "skincare",
    price: 29.99,
    stock: 15,
    reference: "SK-001",
    brand: "BeautéPro",
    description:
      "Crème hydratante enrichie en acide hyaluronique pour une hydratation intense et durable. Convient à tous les types de peau, même les plus sensibles.",
    image:
      "https://readdy.ai/api/search-image?query=luxury%252520skincare%252520face%252520cream%252520in%252520elegant%252520glass%252520jar%252520with%252520pink%252520cream%252520texture%25252C%252520minimalist%252520beauty%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520cosmetic%252520product%252520with%252520clean%252520aesthetic%25252C%252520professional%252520lighting&width=600&height=600&seq=101&orientation=squarish",
  },
  {
    id: 2,
    name: "Sérum anti-âge",
    categoryId: "skincare",
    price: 45.5,
    stock: 8,
    reference: "SK-002",
    brand: "BeautéPro",
    description:
      "Sérum concentré enrichi en peptides et vitamine C pour lutter contre les signes visibles de l'âge. Redonne fermeté et éclat à la peau.",
    image:
      "https://readdy.ai/api/search-image?query=premium%252520anti-aging%252520serum%252520in%252520elegant%252520glass%252520dropper%252520bottle%25252C%252520luxury%252520skincare%252520product%252520photography%252520with%252520golden%252520liquid%25252C%252520minimalist%252520beauty%252520product%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520cosmetic%252520presentation&width=600&height=600&seq=102&orientation=squarish",
  },
  {
    id: 3,
    name: "Rouge à lèvres mat",
    categoryId: "makeup",
    price: 18.9,
    stock: 23,
    reference: "MK-001",
    brand: "Glamour",
    description:
      "Rouge à lèvres longue tenue à la texture crémeuse et au fini mat. Enrichi en beurre de karité pour des lèvres douces et hydratées.",
    image:
      "https://readdy.ai/api/search-image?query=luxury%252520matte%252520lipstick%252520in%252520elegant%252520rose%252520gold%252520tube%25252C%252520deep%252520red%252520color%25252C%252520premium%252520makeup%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520cosmetic%252520with%252520professional%252520lighting%25252C%252520beauty%252520product%252520showcase&width=600&height=600&seq=103&orientation=squarish",
  },
  {
    id: 4,
    name: "Shampoing réparateur",
    categoryId: "haircare",
    price: 16.5,
    stock: 18,
    reference: "HC-001",
    brand: "NaturHair",
    description:
      "Shampoing enrichi en huiles naturelles pour réparer et nourrir les cheveux secs et abîmés. Redonne brillance et vitalité à votre chevelure.",
    image:
      "https://readdy.ai/api/search-image?query=premium%252520hair%252520repair%252520shampoo%252520in%252520elegant%252520bottle%25252C%252520luxury%252520haircare%252520product%252520with%252520pearlescent%252520liquid%25252C%252520minimalist%252520beauty%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520cosmetic%252520presentation&width=600&height=600&seq=104&orientation=squarish",
  },
  {
    id: 5,
    name: "Huile de massage relaxante",
    categoryId: "bodycare",
    price: 22.9,
    stock: 12,
    reference: "BC-001",
    brand: "BeautéPro",
    description:
      "Huile de massage aux huiles essentielles de lavande et d'ylang-ylang. Parfaite pour un moment de détente et de relaxation profonde.",
    image:
      "https://readdy.ai/api/search-image?query=luxury%252520massage%252520oil%252520in%252520elegant%252520glass%252520bottle%25252C%252520premium%252520body%252520care%252520product%252520with%252520golden%252520oil%25252C%252520minimalist%252520beauty%252520product%252520photography%252520on%252520soft%252520pink%252520background%252520with%252520lavender%252520flowers%25252C%252520high-end%252520cosmetic&width=600&height=600&seq=105&orientation=squarish",
  },
  {
    id: 6,
    name: "Eau de parfum Fleur de Rose",
    categoryId: "fragrance",
    price: 65.0,
    stock: 7,
    reference: "FR-001",
    brand: "Essence",
    description:
      "Eau de parfum aux notes florales de rose et de pivoine. Une fragrance élégante et féminine pour une sensation de fraîcheur tout au long de la journée.",
    image:
      "https://readdy.ai/api/search-image?query=elegant%252520perfume%252520bottle%252520with%252520pink%252520liquid%25252C%252520luxury%252520fragrance%252520product%252520photography%25252C%252520crystal%252520glass%252520with%252520gold%252520accents%25252C%252520minimalist%252520beauty%252520product%252520on%252520soft%252520pink%252520background%252520with%252520rose%252520petals%25252C%252520high-end%252520cosmetic&width=600&height=600&seq=106&orientation=squarish",
  },
  {
    id: 7,
    name: "Palette de fards à paupières",
    categoryId: "makeup",
    price: 32.9,
    stock: 10,
    reference: "MK-002",
    brand: "Glamour",
    description:
      "Palette de 12 fards à paupières aux teintes nude et rosées. Textures mates et satinées pour créer une multitude de looks.",
    image:
      "https://readdy.ai/api/search-image?query=luxury%252520eyeshadow%252520palette%252520with%252520pink%252520and%252520nude%252520shades%25252C%252520premium%252520makeup%252520product%252520in%252520elegant%252520packaging%25252C%252520high-end%252520cosmetic%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520professional%252520beauty%252520product%252520showcase&width=600&height=600&seq=107&orientation=squarish",
  },
  {
    id: 8,
    name: "Masque capillaire nourrissant",
    categoryId: "haircare",
    price: 19.9,
    stock: 14,
    reference: "HC-002",
    brand: "NaturHair",
    description:
      "Masque capillaire enrichi en huile d'argan et en kératine pour nourrir intensément les cheveux secs et abîmés. Laisse les cheveux doux et brillants.",
    image:
      "https://readdy.ai/api/search-image?query=premium%252520hair%252520mask%252520in%252520elegant%252520jar%25252C%252520luxury%252520haircare%252520product%252520with%252520creamy%252520texture%25252C%252520minimalist%252520beauty%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520cosmetic%252520presentation%252520with%252520argan%252520oil%252520elements&width=600&height=600&seq=108&orientation=squarish",
  },
  {
    id: 9,
    name: "Gommage corps au sucre",
    categoryId: "bodycare",
    price: 24.5,
    stock: 0,
    reference: "BC-002",
    brand: "BeautéPro",
    description:
      "Gommage corps au sucre et à l'huile de coco pour exfolier en douceur et nourrir la peau. Laisse la peau douce, lisse et hydratée.",
    image:
      "https://readdy.ai/api/search-image?query=luxury%252520sugar%252520body%252520scrub%252520in%252520elegant%252520jar%25252C%252520premium%252520body%252520care%252520product%252520with%252520textured%252520scrub%252520visible%25252C%252520minimalist%252520beauty%252520product%252520photography%252520on%252520soft%252520pink%252520background%252520with%252520coconut%252520elements%25252C%252520high-end%252520cosmetic&width=600&height=600&seq=109&orientation=squarish",
  },
]);
// State variables
const searchQuery = ref("");
const selectedCategory = ref("all");
const priceFilter = ref("all");
const stockFilter = ref("all");
const sortBy = ref("name-asc");
const openDropdown = ref("");
const showProductModal = ref(false);
const showDeleteModal = ref(false);
const editingProduct = ref(false);
const productToDelete = ref<any>(null);
const currentProduct = ref({
  id: 0,
  name: "",
  categoryId: "skincare",
  price: 0,
  stock: 0,
  reference: "",
  brand: "",
  description: "",
  image: "",
});
// Close dropdowns when clicking outside
const closeDropdowns = (event: MouseEvent) => {
  if (openDropdown.value !== "") {
    openDropdown.value = "";
  }
};
onMounted(() => {
  document.addEventListener("click", closeDropdowns);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdowns);
});
// Toggle filter dropdowns
const toggleFilterDropdown = (dropdown: string) => {
  openDropdown.value = openDropdown.value === dropdown ? "" : dropdown;
};
// Select category
const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};
// Get category name by ID
const getCategoryName = (categoryId: string) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.name : "";
};
// Get stock status text
const getStockStatusText = (stock: number) => {
  if (stock === 0) return "Rupture de stock";
  if (stock <= 5) return "Stock faible";
  return `En stock (${stock})`;
};
// Get stock status class
const getStockStatusClass = (stock: number) => {
  if (stock === 0) return "text-red-600";
  if (stock <= 5) return "text-orange-600";
  return "text-green-600";
};
// Filtered products
const filteredProducts = computed(() => {
  let result = [...products.value];
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.reference.toLowerCase().includes(query),
    );
  }
  // Filter by category
  if (selectedCategory.value !== "all") {
    result = result.filter(
      (product) => product.categoryId === selectedCategory.value,
    );
  }
  // Filter by price
  if (priceFilter.value !== "all") {
    switch (priceFilter.value) {
      case "low":
        result = result.filter((product) => product.price < 20);
        break;
      case "medium":
        result = result.filter(
          (product) => product.price >= 20 && product.price <= 50,
        );
        break;
      case "high":
        result = result.filter((product) => product.price > 50);
        break;
    }
  }
  // Filter by stock
  if (stockFilter.value !== "all") {
    switch (stockFilter.value) {
      case "inStock":
        result = result.filter((product) => product.stock > 5);
        break;
      case "lowStock":
        result = result.filter(
          (product) => product.stock > 0 && product.stock <= 5,
        );
        break;
      case "outOfStock":
        result = result.filter((product) => product.stock === 0);
        break;
    }
  }
  // Sort results
  switch (sortBy.value) {
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "stock-asc":
      result.sort((a, b) => a.stock - b.stock);
      break;
    case "stock-desc":
      result.sort((a, b) => b.stock - a.stock);
      break;
  }
  return result;
});
// Open add product modal
const openAddProductModal = () => {
  editingProduct.value = false;
  currentProduct.value = {
    id: products.value.length + 1,
    name: "",
    categoryId: "skincare",
    price: 0,
    stock: 0,
    reference: `PROD-${String(products.value.length + 1).padStart(3, "0")}`,
    brand: "BeautéPro",
    description: "",
    image: getRandomProductImage(),
  };
  showProductModal.value = true;
};
// Edit product
const editProduct = (product: any) => {
  editingProduct.value = true;
  currentProduct.value = { ...product };
  showProductModal.value = true;
};
// Close product modal
const closeProductModal = () => {
  showProductModal.value = false;
};
// Save product
const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    const index = products.value.findIndex(
      (p) => p.id === currentProduct.value.id,
    );
    if (index !== -1) {
      products.value[index] = { ...currentProduct.value };
    }
  } else {
    // Add new product
    products.value.push({ ...currentProduct.value });
  }
  showProductModal.value = false;
};
// Confirm delete product
const confirmDeleteProduct = (product: any) => {
  productToDelete.value = product;
  showDeleteModal.value = true;
};
// Close delete modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};
// Delete product
const deleteProduct = () => {
  if (productToDelete.value) {
    products.value = products.value.filter(
      (p) => p.id !== productToDelete.value.id,
    );
    closeDeleteModal();
  }
};
// Helper function to get random product image for new products
const getRandomProductImage = () => {
  const imageUrls = [
    "https://readdy.ai/api/search-image?query=elegant%252520beauty%252520product%252520in%252520premium%252520packaging%25252C%252520luxury%252520cosmetic%252520product%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520skincare%252520or%252520makeup%252520item%252520with%252520professional%252520lighting%25252C%252520minimalist%252520beauty%252520product%252520showcase&width=600&height=600&seq=110&orientation=squarish",
    "https://readdy.ai/api/search-image?query=premium%252520beauty%252520product%252520in%252520elegant%252520glass%252520container%25252C%252520luxury%252520cosmetic%252520photography%252520with%252520soft%252520pink%252520background%25252C%252520high-end%252520skincare%252520item%252520with%252520professional%252520lighting%252520and%252520subtle%252520reflections%25252C%252520minimalist%252520product%252520presentation&width=600&height=600&seq=111&orientation=squarish",
    "https://readdy.ai/api/search-image?query=luxury%252520cosmetic%252520product%252520in%252520elegant%252520packaging%25252C%252520premium%252520beauty%252520item%252520photography%252520on%252520soft%252520pink%252520background%25252C%252520high-end%252520makeup%252520or%252520skincare%252520with%252520professional%252520lighting%252520and%252520clean%252520aesthetic%25252C%252520minimalist%252520product%252520showcase&width=600&height=600&seq=112&orientation=squarish",
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};
</script>


<template>
  <!-- Main Content -->
  <div class="ml-64 flex-1">
    <!-- Header -->
    <header class="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-5">
      <div class="flex items-center">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Rechercher un produit..."
            class="pl-10 pr-4 py-2 border-none rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm" />
          <Search class="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <button class="text-gray-500 hover:text-pink-500 transition-colors duration-200 cursor-pointer">
            <Bell class="text-xl" />
            <span
              class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
        </div>
        <div class="flex items-center space-x-3 cursor-pointer">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img :src="userAvatar" alt="Avatar utilisateur" class="w-full h-full object-cover" />
          </div>
          <div>
            <p class="font-medium text-sm">Dominique Ngueussie</p>
            <p class="text-xs text-gray-500">Esthéticien</p>
          </div>
        </div>
      </div>
    </header>
    <!-- Products Content -->
    <main class="p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Mes produits</h1>
          <p class="text-gray-600">
            Gérez les produits que vous proposez à vos clients
          </p>
        </div>
        <button @click="openAddProductModal"
          class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
          <Plus class="mr-2" /> Ajouter un produit
        </button>
      </div>
      <!-- Filters and Categories -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-wrap gap-4 mb-6">
          <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" :class="[
            'px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap',
            selectedCategory === category.id
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]">
            <component :is="category.icon" class="w-5 h-5 mr-2" />
            {{ category.name }}
          </button>
        </div>
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex gap-4">
            <div class="relative">
              <button @click="toggleFilterDropdown('price')"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                <Euro class="mr-2 h-4 w-4" />
                Prix
                <ChevronDown class="ml-2 text-xs w-4 h-4" />
              </button>
              <div v-if="openDropdown === 'price'"
                class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
                <div class="space-y-2">
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="priceFilter" value="all" class="mr-2" />
                    <span>Tous les prix</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="priceFilter" value="low" class="mr-2" />
                    <span>Moins de 20€</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="priceFilter" value="medium" class="mr-2" />
                    <span>20€ - 50€</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="priceFilter" value="high" class="mr-2" />
                    <span>Plus de 50€</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="relative">
              <button @click="toggleFilterDropdown('stock')"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                <Clock9 class="mr-2 w-4 h-4" />
                Stock
                <ChevronDown class="mr-2 w-4 h-4" />
              </button>
              <div v-if="openDropdown === 'stock'"
                class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
                <div class="space-y-2">
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="stockFilter" value="all" class="mr-2" />
                    <span>Tous les stocks</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="stockFilter" value="inStock" class="mr-2" />
                    <span>En stock</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="stockFilter" value="lowStock" class="mr-2" />
                    <span>Stock faible (≤ 5)</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input type="radio" v-model="stockFilter" value="outOfStock" class="mr-2" />
                    <span>Rupture de stock</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <button @click="toggleFilterDropdown('sort')"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
              <ArrowDownNarrowWide class="mr-2 w-4 h-4" />
              Trier par
              <ChevronDown class="ml-1 w-4 h-4" />
            </button>
            <div v-if="openDropdown === 'sort'"
              class="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
              <div class="space-y-2">
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="name-asc" class="mr-2" />
                  <span>Nom (A-Z)</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="name-desc" class="mr-2" />
                  <span>Nom (Z-A)</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="price-asc" class="mr-2" />
                  <span>Prix (croissant)</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="price-desc" class="mr-2" />
                  <span>Prix (décroissant)</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="stock-asc" class="mr-2" />
                  <span>Stock (croissant)</span>
                </label>
                <label class="flex items-center cursor-pointer">
                  <input type="radio" v-model="sortBy" value="stock-desc" class="mr-2" />
                  <span>Stock (décroissant)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div v-for="product in filteredProducts" :key="product.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <div class="h-48 overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover object-top" />
          </div>
          <div class="p-5">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-lg text-gray-800">
                {{ product.name }}
              </h3>
              <span class="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{{
                getCategoryName(product.categoryId) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 mb-2">
              <span class="font-medium text-pink-600 mr-4">{{ product.price }} €</span>
              <span class="flex items-center">
                <Package2 class="mr-2 w-4 h-4" />
                <span :class="getStockStatusClass(product.stock)">{{ getStockStatusText(product.stock) }}</span>
              </span>
            </div>
            <div class="flex items-center text-xs text-gray-500 mb-3">
              <span class="mr-2">Réf: {{ product.reference }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex justify-end space-x-2">
              <button @click="editProduct(product)"
                class="text-gray-600 hover:text-pink-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                <SquarePen class="w-4 h-4" />
              </button>
              <button @click="confirmDeleteProduct(product)"
                class="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-sm p-10 text-center">
        <div class="mb-4 text-gray-400 flex justify-center items-center">
          <ShoppingBag class="text-5xl" />
        </div>
        <h3 class="text-xl font-medium text-gray-800 mb-2">
          Aucun produit trouvé
        </h3>
        <p class="text-gray-600 mb-6">
          {{ searchQuery ? "Aucun produit ne correspond à votre recherche." :
            "Vous n'avez pas encore ajouté de produits dans cette catégorie." }}
        </p>
        <button @click="openAddProductModal"
          class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
          <Plus class="mr-2" /> Ajouter un produit
        </button>
      </div>
    </main>
  </div>
  <!-- Add/Edit Product Modal -->
  <div v-if="showProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-gray-800">
          {{ editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit' }}
        </h2>
      </div>
      <div class="p-6">
        <form @submit.prevent="saveProduct">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
              <input v-model="currentProduct.name" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                placeholder="Ex: Crème hydratante visage" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <div class="relative">
                <select v-model="currentProduct.categoryId" required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm appearance-none">
                  <option v-for="category in categories.filter(c => c.id !== 'all')" :key="category.id"
                    :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i class="fas fa-chevron-down text-gray-400"></i>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
              <input v-model.number="currentProduct.price" type="number" required min="0" step="0.01"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                placeholder="Ex: 29.99" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input v-model.number="currentProduct.stock" type="number" required min="0" step="1"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                placeholder="Ex: 25" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Référence</label>
              <input v-model="currentProduct.reference" type="text" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                placeholder="Ex: PROD-001" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Marque</label>
              <input v-model="currentProduct.brand" type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                placeholder="Ex: BeautéPro" />
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="currentProduct.description" rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
              placeholder="Décrivez ce produit en détail..."></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" @click="closeProductModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              Annuler
            </button>
            <button type="submit"
              class="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              {{ editingProduct ? 'Enregistrer les modifications' : 'Ajouter le produit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md" @click.stop>
      <div class="p-6">
        <div class="text-center mb-6">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <TriangleAlert class="text-red-600 text-2xl" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Confirmer la suppression
          </h3>
          <p class="text-gray-600">
            Êtes-vous sûr de vouloir supprimer le produit
            <span class="font-medium">{{ productToDelete?.name }}</span> ?
            Cette action est irréversible.
          </p>
        </div>
        <div class="flex justify-center space-x-3">
          <button @click="closeDeleteModal"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
            Annuler
          </button>
          <button @click="deleteProduct"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
            Supprimer
          </button>
        </div>
      </div>
    </div>
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
/* Line clamp for descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
