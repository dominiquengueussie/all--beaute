<script setup>
const paymentMethods = ref([
    {
        id: "mobile",
        name: "Mtn mobile Money",
        icon: "/img/mtn.png",
    },
    {
        id: "mobile_orange",
        name: "Orange Money",
        icon: "/img/orange.png",
    },
]);

// Payment information
const paymentInfo = ref({
    cardNumber: "",
    phoneNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    saveCard: false,
});

// Selected methods
//const selectedShippingMethod = ref("standard");
const selectedPaymentMethod = ref("mobile");

// Methods
/*const selectShippingMethod = (methodId) => {
    selectedShippingMethod.value = methodId;
};*/

const selectPaymentMethod = (methodId) => {
    selectedPaymentMethod.value = methodId;
};

defineEmits(["close", "showLoading"]);
const props = defineProps({
    showLoading: Boolean
});
</script>

<template>
    <!-- Payment Method -->
    <Transition class="fade-in" appear>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-2xl">
                <p class="text-2xl font-semibold flex justify-end cursor-pointer" @click="$emit('close')">
                    X
                </p>

                <h2 class="text-xl font-semibold text-gray-800 mb-4">
                    Méthode de paiement
                </h2>

                <div class="space-y-4">
                    <!-- Méthodes de paiement -->
                    <div v-for="(method, index) in paymentMethods" :key="index" :class="{
                        'bg-purple-50 border-purple-300':
                            selectedPaymentMethod === method.id,
                        'border-gray-200': selectedPaymentMethod !== method.id,
                    }" class="border rounded-lg p-4 cursor-pointer transition-colors duration-200"
                        @click="selectPaymentMethod(method.id)">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3" :class="{
                                    'border-purple-600': selectedPaymentMethod === method.id,
                                    'border-gray-400': selectedPaymentMethod !== method.id,
                                }">
                                    <div v-if="selectedPaymentMethod === method.id"
                                        class="w-3 h-3 rounded-full bg-purple-600"></div>
                                </div>
                                <div class="flex items-center">
                                    <img :src="method.icon" class="w-9 h-auto mr-3" :alt="method.name" />
                                    <h3 class="font-medium text-gray-900">{{ method.name }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Numéro de téléphone -->
                    <div class="mt-5">
                        <label class="text-sm text-gray-600 ml-1 mb-2 block">Saisir votre numéro de téléphone</label>
                        <input type="tel" name="phoneNumber" id="phoneNumber"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Ex: 6723587965" v-model="paymentInfo.phoneNumber" />
                    </div>

                    <!-- Bouton Payer -->
                    <div class="flex justify-center items-center mt-7">
                        <button @click.prevent="$emit('showLoading')" :disabled="!paymentInfo.phoneNumber" :class="['py-3 flex items-center justify-center bg-slate-900 w-full text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap mb-2', !paymentInfo.phoneNumber ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-900'
                        ]">
                            <div v-if="showLoading"
                                class="animate-spin ease-linear rounded-full w-6 h-6 border-t-2 border-b-2 border-gold ml-3 mr-4">
                            </div>
                            <span v-else>Payer</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <!-- Credit Card Form
                 <div v-if="selectedPaymentMethod === 'card'" class="mt-6 border-t border-gray-200 pt-6">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div class="md:col-span-2">
                             <label for="cardNumber" class="block text-[13px] font-medium text-gray-700 mb-1">Numéro de
                                 carte</label>
                             <div class="relative">
                                 <input type="text" id="cardNumber" v-model="paymentInfo.cardNumber"
                                     class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                     placeholder="1234 5678 9012 3456" />
                                 <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                     <i class="fab fa-cc-visa text-blue-700"></i>
                                     <i class="fab fa-cc-mastercard text-red-600"></i>
                                 </div>
                             </div>
                         </div>
                         <div>
                             <label for="cardName" class="block text- font-medium text-gray-700 mb-1">Nom sur la
                                 carte</label>
                             <input type="text" id="cardName" v-model="paymentInfo.cardName"
                                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                 placeholder="JEAN DUPONT" />
                         </div>
                         <div class="flex space-x-4">
                             <div class="w-1/2">
                                 <label for="cardExpiry" class="block text-[13px] font-medium text-gray-700 mb-1">Date
                                     d'expiration</label>
                                 <input type="text" id="cardExpiry" v-model="paymentInfo.cardExpiry"
                                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                     placeholder="MM/AA" />
                             </div>
                             <div class="w-1/2">
                                 <label for="cardCvc" class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                 <input type="text" id="cardCvc" v-model="paymentInfo.cardCvc"
                                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                     placeholder="123" />
                             </div>
                         </div>
                         
                     </div>
                     <div class="mt-4">
                         <label class="flex items-center">
                             <input type="checkbox" v-model="paymentInfo.saveCard"
                                 class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                             <span class="ml-2 text-sm text-gray-600">Sauvegarder cette carte pour mes prochains
                                 achats</span>
                         </label>
                     </div>
                     
                 </div> -->
</template>
