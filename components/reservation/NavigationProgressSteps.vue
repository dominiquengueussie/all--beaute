<script setup>
const { serviceCart, serviceTotal } = useCart();
const contactInfo = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    marketing: false
});

const selectedDate = ref(null);
const selectedTimes = ref([]);
const termsAccepted = ref(false);
const showConfirmationModal = ref(false);
const showPaymentMethod = ref(false);



const isFormValid = computed(() => {
    const allTimesSelected = selectedTimes.value.length === serviceCart.value.length &&
        !selectedTimes.value.some(time => time === '');

    /* const contactFilled = contactInfo.value.firstName.trim() !== '' &&
        contactInfo.value.lastName.trim() !== '' &&
        contactInfo.value.email.trim() !== '' &&
        contactInfo.value.phone.trim() !== '';
        contactInfo.value.email.includes(['@' , '.com']) */
    //contactInfo.value.phone.trim().length <= 13 && contactInfo.value.phone.trim().length >= 9;

    return allTimesSelected && termsAccepted.value && selectedDate.value !== null;
});

const selectDate = (date) => {
    selectedDate.value = new Date(date);
    selectedTimes.value = Array(serviceCart.value.length).fill('');
};

const selectTime = (index, time) => {
    selectedTimes.value[index] = time;
};

const submitReservation = () => {
    if (!isFormValid.value) return;

    console.log('Reservation submitted:', {
        services: serviceCart.value,
        date: selectedDate.value,
        times: selectedTimes.value,
        //contact: contactInfo.value
    });

    showPaymentMethod.value = true;
};

onMounted(() => {
    const today = new Date();
    if (today.getDay() !== 0) {
        selectedDate.value = today;
    }
});

const showLoading = ref(false)
const handlerLoading = () => {
    showLoading.value = true
    setTimeout(() => {
        showPaymentMethod.value = false
        showConfirmationModal.value = true
        showLoading.value = false
    }, 3000);
}

</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-md fixed w-full top-0 z-50">
            <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                <div class="flex items-center">
                    <NuxtLink to="/services" class="flex items-center">
                        <i class="fas fa-arrow-left text-slate-900 mr-3"></i>
                        <span class="text-gray-600">Retour</span>
                    </NuxtLink>
                </div>
                <h1 class="text-2xl font-bold text-slate-900 absolute left-1/2 transform -translate-x-1/2">Allô Beauté
                </h1>
                <div class="flex items-center space-x-6">
                    <div class="relative cursor-pointer">
                        <i class="fas fa-user-circle text-xl text-gray-600"></i>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Progress Steps -->
        <div class="container mx-auto px-6 pt-24 pb-6">
            <div class="flex items-center justify-center mb-8">
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="h-1 w-16 bg-slate-600"></div>
                </div>
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="h-1 w-16 bg-slate-300"></div>
                </div>
                <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-gray-500">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
            </div>
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-2">Confirmation de Réservation</h2>
            <p class="text-center text-gray-600 mb-8">Choisissez une date et heure pour vos services et complétez vos
                informations</p>
        </div>

        <!-- Main Content -->
        <main class="container mx-auto px-6 pb-12">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="lg:col-span-1">
                    <ServicesSummary :service-cart="serviceCart" :selected-times="selectedTimes"
                        :selected-date="selectedDate" :service-total-price="serviceTotal" :contact-info="contactInfo"
                        @submit="submitReservation" />
                </div>

                <!-- Right Column -->
                <div class="lg:col-span-2">
                    <CalendarTimeSlots :service-cart="serviceCart" :selected-date="selectedDate"
                        :selected-times="selectedTimes" @select-date="selectDate" @select-time="selectTime" />

                    <ImportantInfoConfirmation v-model:terms-accepted="termsAccepted" :is-form-valid="isFormValid"
                        @submit="submitReservation" />
                </div>
            </div>
        </main>

        <ConfirmationModal v-if="showConfirmationModal" :service-cart="serviceCart" :selected-date="selectedDate"
            :selected-times="selectedTimes" :contact-info="contactInfo" @close="showConfirmationModal = false" />

        <PaymentMethodModal v-if="showPaymentMethod" @close="showPaymentMethod = false" @showLoading="handlerLoading"
            :showLoading="showLoading" />
    </div>
</template>
