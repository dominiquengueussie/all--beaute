<script setup>
const props = defineProps({
    serviceCart: Array,
    selectedDate: Date,
    selectedTimes: Array
});

const emit = defineEmits(['select-date', 'select-time']);

const showTooltip = ref(false);
const tooltipDayIndex = ref(-1);

// Noms des jours et mois
const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']; // Dimanche en premier
const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

// Header du calendrier avec mois et année
const currentHeader = computed(() => {
    const today = new Date();
    return `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
});

const isSelectedDate = (date) => {
    if (!props.selectedDate) return false;
    const selected = new Date(props.selectedDate);
    selected.setHours(0, 0, 0, 0);
    const comparing = new Date(date);
    comparing.setHours(0, 0, 0, 0);
    return selected.getTime() === comparing.getTime();
};

const getUnavailabilityReason = () => {
    return "Cette date n'est pas disponible";
};

const showUnavailableMessage = (day) => {
    if (!day.isAvailable) {
        tooltipDayIndex.value = next7Days.value.findIndex(d => d.date.getTime() === day.date.getTime());
        showTooltip.value = true;
        setTimeout(() => {
            showTooltip.value = false;
            tooltipDayIndex.value = -1;
        }, 2000);
    }
};

// Calcul des 7 prochains jours à partir de demain
const next7Days = computed(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        days.push({
            date,
            dayNumber: date.getDate(),
            dayName: weekDays[date.getDay()], // Utilisation correcte du tableau weekDays
            month: monthNames[date.getMonth()],
            isToday: false,
            isAvailable: true, // Tous les jours sont disponibles
            isWeekend: date.getDay() === 0 || date.getDay() === 6 // Dimanche ou Samedi
        });
    }

    return days;
});

const selectDate = (date) => {
    emit('select-date', date);
};
</script>

<template>
    <div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div class="bg-slate-600 px-6 py-4">
                <h3 class="text-xl font-semibold text-white">Choisir une Date</h3>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <!-- En-tête avec mois et année -->
                    <div class="text-center mb-4">
                        <h4 class="text-lg font-medium text-gray-800">{{ currentHeader }}</h4>
                    </div>

                    <!-- Jours de la semaine -->
                    <div class="grid grid-cols-7 gap-1 text-center mb-2">
                        <div v-for="day in weekDays" :key="day" class="py-2 text-sm font-medium text-gray-600">
                            {{ day }}
                        </div>
                    </div>

                    <!-- Dates -->
                    <div class="grid grid-cols-7 gap-1">
                        <!-- Trouver le jour de la semaine de la première date (demain) -->
                        <template v-for="n in next7Days[0]?.date.getDay()" :key="'empty-' + n">
                            <div class="py-2 text-center opacity-0">0</div>
                        </template>

                        <!-- Afficher les 7 prochains jours -->
                        <div v-for="(day, index) in next7Days" :key="index" :class="[
                            'py-2 text-center rounded-md cursor-pointer transition-colors relative group',
                            day.isWeekend ? 'bg-purple-50' : '',
                            isSelectedDate(day.date) ? 'bg-slate-600 text-white hover:bg-slate-600' : 'hover:bg-purple-100'
                        ]" @click="selectDate(day.date)">
                            <div class="text-sm">{{ day.dayName }}</div>
                            <div class="font-medium">{{ day.dayNumber }}</div>
                            <div v-if="!day.isAvailable && showTooltip && tooltipDayIndex === index"
                                class="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {{ getUnavailabilityReason() }}
                                <div
                                    class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sélection des horaires -->
                <div v-if="selectedDate">
                    <h4 class="text-lg font-medium text-gray-800 mb-4">Choisir un Horaire</h4>
                    <div v-for="(service, index) in serviceCart" :key="index"
                        class="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                        <div class="flex items-center mb-3">
                            <div
                                class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-purple-600 mr-3">
                                {{ index + 1 }}
                            </div>
                            <h5 class="font-medium text-gray-800">{{ service.name }} ({{ service.duration }})</h5>
                        </div>
                        <div class="grid grid-cols-4 gap-2">
                            <button
                                v-for="time in ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']"
                                :key="time" :class="[
                                    'py-2 px-3 text-sm rounded-button whitespace-nowrap cursor-pointer border',
                                    selectedTimes[index] === time
                                        ? 'bg-slate-600 text-white border-slate-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                                ]" @click="emit('select-time', index, time)">
                                {{ time }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>