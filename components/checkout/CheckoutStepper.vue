<script lang="ts" setup>
import { ref, computed } from "vue";
import DeliveryInformation from "./DeliveryInformation.vue";
import DeliveryPaymentMethods from "./DeliveryPaymentMethods.vue";
import OrderSummary from "./OrderSummary.vue";
import ProductCart from "../cart/ProductCart.vue";
const { productCart, productTotal, removeProduct, incrementProduct, decrementProduct, formattedPrice } = useCart()

// Cart data
const cart = productCart;

// Shipping information
const shippingInfo = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    notes: "",
});

// Shipping methods
const shippingMethods = ref([
    {
        id: "standard",
        name: "Livraison Standard",
        description: "Livraison en 3-5 jours ouvrés",
        price: "1000 Fcfa",
    },
    {
        id: "express",
        name: "Livraison Express",
        description: "Livraison en 1-2 jours ouvrés",
        price: "2000 Fcfa",
    },
    {
        id: "relay",
        name: "Point Relais",
        description: "Récupération en point relais sous 3-4 jours",
        price: "3000 Fcfa",
    },
]);

// Payment methods
const paymentMethods = ref([
    {
        id: "card",
        name: "Carte bancaire",
        icon: "fas fa-credit-card",
    },
    {
        id: "paypal",
        name: "PayPal",
        icon: "fab fa-paypal",
    },
    {
        id: "applepay",
        name: "Apple Pay",
        icon: "fab fa-apple-pay",
    },
]);

// Payment information
const paymentInfo = ref({
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    saveCard: false,
});

// Selected methods
const selectedShippingMethod = ref("standard");
const selectedPaymentMethod = ref("card");
const promoCode = ref("");

// Counts for header display
/* const serviceCount = ref(0);
const productCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
}); */

// Price calculations
/*  const subtotal = computed(() => {
    const productTotal = cart.value.reduce((sum, item) => {
        const price = parseInt(item.price.replace(" Fcfa", ""));
        return sum + price * item.quantity;
    }, 0);
    return `${total} Fcfa`;
});  */

const shippingCost = computed(() => {
    const method = shippingMethods.value.find(
        (m) => m.id === selectedShippingMethod.value,
    );
    return method ? method.price : "0 Fcfa";
});

/* const tax = computed(() => {
    const subtotalValue = parseInt(subtotal.value.replace(" €", ""));
    return `${Math.round(subtotalValue * 0.2)} €`;
}); */

/*  const total = computed(() => {
    const subtotalValue = parseInt(subtotal.value.replace(" €", ""));
    const shippingValue = parseInt(
        shippingCost.value.replace(" €", "").replace(",", "."),
    );
    const taxValue = parseInt(tax.value.replace(" €", ""));
    return `${subtotalValue + shippingValue + taxValue} €`;
});  */


// Methods
const selectShippingMethod = (methodId: string) => {
    selectedShippingMethod.value = methodId;
};

const selectPaymentMethod = (methodId: string) => {
    selectedPaymentMethod.value = methodId;
};

const confirmOrder = () => {
    showPaymentMethod.value = true
};

const showLoading = ref(false)
const showPaymentMethod = ref(false)
const showConfirmationModal = ref(false)
const handlerLoading = () => {
    showLoading.value = true
    setTimeout(() => {
        showPaymentMethod.value = false
        showLoading.value = false
    }, 3000);
}
</script>

<template>
    < class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-md fixed w-full top-0 z-50">
            <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                <div class="flex items-center">
                    <a href="#" data-readdy="true" class="text-2xl font-bold text-slate-900 cursor-pointer">Allo Beauté
                        Panier</a>
                </div>
                <div class="flex items-center space-x-6">
                    <div class="relative cursor-pointer">
                        <i class="fas fa-user-circle text-xl text-gray-600"></i>
                    </div>
                </div>
            </div>
        </nav>
        <!-- Main Content -->
        <main class="container mx-auto px-6 pt-24 pb-12">
            <!-- Checkout Progress -->
            <div class="mb-10">
                <div class="flex justify-between items-center mb-2">
                    <h1 class="text-md md:text-2xl xl:text-3xl font-bold text-gray-800">
                        Finalisation de votre commande
                    </h1>
                    <NuxtLink to="/store" data-readdy="true"
                        class="text-slate-600 hover:text-slate-900 flex items-center cursor-pointer text-md lg:text-md xl:text-lg">
                        <i class="fas fa-arrow-left mr-2"></i> Retour au panier
                    </NuxtLink>
                </div>
                <div class="relative">
                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                            class="progress-bar-animation w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-900">
                        </div>
                    </div>
                    <div class="flex justify-between text-sm font-medium text-gray-500">
                        <div class="flex flex-col items-center">
                            <div
                                class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white mb-1">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                            <span>Panier</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div
                                class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white mb-1">
                                <i class="fas fa-truck"></i>
                            </div>
                            <span class="text-gray-500">Livraison</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div
                                class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white mb-1">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <span>Paiement</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div
                                class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 text-white mb-1">
                                <i class="fas fa-check"></i>
                            </div>
                            <span>Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Left Column - Forms -->
                <div class="w-full lg:w-2/3">
                    <DeliveryInformation :shipping-info="shippingInfo" />
                    <DeliveryPaymentMethods :shipping-methods="shippingMethods" :payment-methods="paymentMethods"
                        :selected-shipping-method="selectedShippingMethod"
                        :selected-payment-method="selectedPaymentMethod" :payment-info="paymentInfo"
                        @select-shipping-method="selectShippingMethod" @select-payment-method="selectPaymentMethod" />
                </div>

                <!-- Right Column - Order Summary -->
                <div class="w-full lg:w-1/3">
                    <OrderSummary :cart="cart" :subtotal="productTotal" :shipping-cost="shippingCost"
                        v-model:promo-code="promoCode" @confirm-order="confirmOrder" />
                </div>
            </div>
        </main>
        <Trasition class="fade-in" appear>
            <PaymentMethodModal v-if="showPaymentMethod" @close="showPaymentMethod = false"
                @showLoading="handlerLoading" :showLoading="showLoading" />
        </Trasition>
        <!-- Footer -->
        <Footer />
</template>


<style scoped>
.progress-bar-animation {
    animation: progress 2s ease-in-out;
}

@keyframes progress {
    0% {
        width: 0%;
    }

    100% {
        width: 50%;
    }
}
</style>