<script lang="ts" setup>
import { Search,X,Hourglass,CheckCheck, Clock8,ArrowDownWideNarrow, PhoneCall, Bell, Eye, ClockFading, CalendarClock, Plus, Check, CalendarDays, List, Euro, ChevronDown, Grid, Flame, Hand, Sparkles, Scissors, ArrowDownNarrowWide, SquarePen, Trash2, ConciergeBell, TriangleAlert, ChevronRight, ChevronLeft } from "lucide-vue-next";
// User avatar
const userAvatar =
    "https://readdy.ai/api/search-image?query=professional%25252520portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520short%25252520brown%25252520hair%2525252C%25252520warm%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520salon%25252520owner%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=1&orientation=squarish";
// State variables
const viewMode = ref("calendar");
const searchQuery = ref("");
const dateFilter = ref("all");
const selectedDate = ref("");
const openDropdown = ref("");
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAppointmentModal = ref(false);
const showAddModal = ref(false);
const showRescheduleModal = ref(false);
const showCancelModal = ref(false);
const appointmentNotes = ref("");
const cancelReason = ref("");
// Status filters
const statusFilters = ref({
    all: true,
    pending: true,
    confirmed: true,
    completed: true,
    cancelled: true,
});
// Service filters
const serviceFilters = ref({
    all: true,
});
// Week days
const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
// Selected appointment for details/actions
const selectedAppointment = ref({
    id: 0,
    clientId: 0,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAvatar:"https://readdy.ai/api/search-image?query=professional%2520portrait%2520of%2520a%2520beautiful%2520young%2520French%2520woman%2520with%2520short%2520brown%2520hair%252C%2520warm%2520smile%252C%2520natural%2520makeup%252C%2520beauty%2520salon%2520owner%252C%2520professional%2520headshot%252C%2520neutral%2520background%252C%2520high%2520quality%252C%2520photorealistic&width=200&height=200&seq=1&orientation=squarish",
    serviceId: 0,
    serviceName: "",
    date: "",
    time: "",
    duration: 0,
    price: 0,
    status: "",
    notes: "",
    statusLogs: [] as Array<{ status: string; date: Date; note: string }>,
});
const iconMap = {
  pending: Clock8,
  confirmed: Check,
  completed: Check,
  cancelled: X,
  created: Plus,
  rescheduled: CalendarDays
}
// New appointment data
const newAppointment = ref({
    clientId: "",
    serviceId: "",
    date: "",
    time: "",
    duration: 0,
    price: 0,
    notes: "",
});
// Reschedule data
const rescheduleData = ref({
    date: "",
    time: "",
    reason: "",
});
// Services data
const services = ref([
    { id: 1, name: "Soin du visage", duration: 60, price: 65 },
    { id: 2, name: "Massage relaxant", duration: 90, price: 85 },
    { id: 3, name: "Manucure", duration: 45, price: 35 },
    { id: 4, name: "Épilation jambes complètes", duration: 30, price: 40 },
    { id: 5, name: "Coupe et brushing", duration: 60, price: 55 },
]);
// Initialize service filters
services.value.forEach((service) => {
    serviceFilters.value[service.id] = true;
});
// Clients data
const clients = ref([
    {
        id: 1,
        name: "Marie Dupont",
        email: "marie.dupont@example.com",
        phone: "06 12 34 56 78",
        avatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520long%25252520brown%25252520hair%2525252C%25252520warm%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=201&orientation=squarish",
    },
    {
        id: 2,
        name: "Julien Martin",
        email: "julien.martin@example.com",
        phone: "06 23 45 67 89",
        avatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520young%25252520French%25252520man%25252520with%25252520short%25252520dark%25252520hair%2525252C%25252520friendly%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=202&orientation=squarish",
    },
    {
        id: 3,
        name: "Sophie Leroy",
        email: "sophie.leroy@example.com",
        phone: "06 34 56 78 90",
        avatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520middle-aged%25252520French%25252520woman%25252520with%25252520blonde%25252520hair%2525252C%25252520elegant%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=203&orientation=squarish",
    },
    {
        id: 4,
        name: "Thomas Petit",
        email: "thomas.petit@example.com",
        phone: "06 45 67 89 01",
        avatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520middle-aged%25252520French%25252520man%25252520with%25252520salt%25252520and%25252520pepper%25252520hair%2525252C%25252520confident%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=204&orientation=squarish",
    },
    {
        id: 5,
        name: "Camille Dubois",
        email: "camille.dubois@example.com",
        phone: "06 56 78 90 12",
        avatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520short%25252520blonde%25252520hair%2525252C%25252520bright%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=205&orientation=squarish",
    },
]);
// Appointments data
const appointments = ref([
    {
        id: 1,
        clientId: 1,
        clientName: "Marie Dupont",
        clientEmail: "marie.dupont@example.com",
        clientPhone: "06 12 34 56 78",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520long%25252520brown%25252520hair%2525252C%25252520warm%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=201&orientation=squarish",
        serviceId: 1,
        serviceName: "Soin du visage",
        date: "2025-05-01",
        time: "10:00",
        duration: 60,
        price: 65,
        status: "confirmed",
        notes: "Client régulier, préfère les produits bio.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-25T14:30:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-26T09:15:00"),
                note: "Confirmation par SMS",
            },
        ],
    },
    {
        id: 2,
        clientId: 2,
        clientName: "Julien Martin",
        clientEmail: "julien.martin@example.com",
        clientPhone: "06 23 45 67 89",
        clientAvatar:"https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520young%25252520French%25252520man%25252520with%25252520short%25252520dark%25252520hair%2525252C%25252520friendly%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=202&orientation=squarish",
        serviceId: 2,
        serviceName: "Massage relaxant",
        date: "2025-05-01",
        time: "14:30",
        duration: 90,
        price: 85,
        status: "pending",
        notes: "Première visite, a mentionné des douleurs au dos.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-28T18:45:00"),
                note: "Rendez-vous créé via le site web",
            },
        ],
    },
    {
        id: 3,
        clientId: 3,
        clientName: "Sophie Leroy",
        clientEmail: "sophie.leroy@example.com",
        clientPhone: "06 34 56 78 90",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520middle-aged%25252520French%25252520woman%25252520with%25252520blonde%25252520hair%2525252C%25252520elegant%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=203&orientation=squarish",
        serviceId: 3,
        serviceName: "Manucure",
        date: "2025-05-02",
        time: "11:15",
        duration: 45,
        price: 35,
        status: "confirmed",
        notes: "Préfère les couleurs pastel.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-20T10:30:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-21T11:20:00"),
                note: "Confirmation par téléphone",
            },
        ],
    },
    {
        id: 4,
        clientId: 4,
        clientName: "Thomas Petit",
        clientEmail: "thomas.petit@example.com",
        clientPhone: "06 45 67 89 01",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520middle-aged%25252520French%25252520man%25252520with%25252520salt%25252520and%25252520pepper%25252520hair%2525252C%25252520confident%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=204&orientation=squarish",
        serviceId: 5,
        serviceName: "Coupe et brushing",
        date: "2025-05-02",
        time: "16:00",
        duration: 60,
        price: 55,
        status: "pending",
        notes: "Souhaite un style moderne et facile à entretenir.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-29T09:10:00"),
                note: "Rendez-vous créé",
            },
        ],
    },
    {
        id: 5,
        clientId: 5,
        clientName: "Camille Dubois",
        clientEmail: "camille.dubois@example.com",
        clientPhone: "06 56 78 90 12",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520short%25252520blonde%25252520hair%2525252C%25252520bright%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=205&orientation=squarish",
        serviceId: 4,
        serviceName: "Épilation jambes complètes",
        date: "2025-05-03",
        time: "09:30",
        duration: 30,
        price: 40,
        status: "confirmed",
        notes: "Peau sensible, utiliser des produits doux.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-26T16:45:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-27T10:30:00"),
                note: "Confirmation par email",
            },
        ],
    },
    {
        id: 6,
        clientId: 1,
        clientName: "Marie Dupont",
        clientEmail: "marie.dupont@example.com",
        clientPhone: "06 12 34 56 78",
        clientAvatar:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.vecteezy.com%2Fpng-gratuit%2Favatar&psig=AOvVaw04FO0XNAEEzZu9dJEUMOv6&ust=1746380891666000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCHmPjth40DFQAAAAAdAAAAABAE",
        serviceId: 2,
        serviceName: "Massage relaxant",
        date: "2025-04-30",
        time: "15:00",
        duration: 90,
        price: 85,
        status: "completed",
        notes: "A beaucoup apprécié le massage aux huiles essentielles.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-15T11:30:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-16T09:45:00"),
                note: "Confirmation par SMS",
            },
            {
                status: "completed",
                date: new Date("2025-04-30T16:30:00"),
                note: "Service réalisé avec satisfaction",
            },
        ],
    },
    {
        id: 7,
        clientId: 3,
        clientName: "Sophie Leroy",
        clientEmail: "sophie.leroy@example.com",
        clientPhone: "06 34 56 78 90",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520middle-aged%25252520French%25252520woman%25252520with%25252520blonde%25252520hair%2525252C%25252520elegant%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=203&orientation=squarish",
        serviceId: 1,
        serviceName: "Soin du visage",
        date: "2025-04-29",
        time: "10:30",
        duration: 60,
        price: 65,
        status: "cancelled",
        notes: "Annulé pour cause de maladie.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-20T14:15:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-21T10:30:00"),
                note: "Confirmation par email",
            },
            {
                status: "cancelled",
                date: new Date("2025-04-28T09:15:00"),
                note: "Annulé par la cliente pour cause de maladie",
            },
        ],
    },
    {
        id: 8,
        clientId: 2,
        clientName: "Julien Martin",
        clientEmail: "julien.martin@example.com",
        clientPhone: "06 23 45 67 89",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520young%25252520French%25252520man%25252520with%25252520short%25252520dark%25252520hair%2525252C%25252520friendly%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=202&orientation=squarish",
        serviceId: 5,
        serviceName: "Coupe et brushing",
        date: "2025-05-05",
        time: "14:00",
        duration: 60,
        price: 55,
        status: "confirmed",
        notes: "A demandé des conseils pour l'entretien de ses cheveux.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-25T18:30:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-26T11:45:00"),
                note: "Confirmation par téléphone",
            },
        ],
    },
    {
        id: 9,
        clientId: 5,
        clientName: "Camille Dubois",
        clientEmail: "camille.dubois@example.com",
        clientPhone: "06 56 78 90 12",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520beautiful%25252520young%25252520French%25252520woman%25252520with%25252520short%25252520blonde%25252520hair%2525252C%25252520bright%25252520smile%2525252C%25252520natural%25252520makeup%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=205&orientation=squarish",
        serviceId: 1,
        serviceName: "Soin du visage",
        date: "2025-05-06",
        time: "11:00",
        duration: 60,
        price: 65,
        status: "pending",
        notes: "Souhaite des conseils pour sa routine de soins quotidienne.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-30T15:20:00"),
                note: "Rendez-vous créé via le site web",
            },
        ],
    },
    {
        id: 10,
        clientId: 4,
        clientName: "Thomas Petit",
        clientEmail: "thomas.petit@example.com",
        clientPhone: "06 45 67 89 01",
        clientAvatar:
            "https://readdy.ai/api/search-image?query=portrait%25252520of%25252520a%25252520handsome%25252520middle-aged%25252520French%25252520man%25252520with%25252520salt%25252520and%25252520pepper%25252520hair%2525252C%25252520confident%25252520smile%2525252C%25252520natural%25252520look%2525252C%25252520beauty%25252520client%2525252C%25252520professional%25252520headshot%2525252C%25252520neutral%25252520background%2525252C%25252520high%25252520quality%2525252C%25252520photorealistic&width=200&height=200&seq=204&orientation=squarish",
        serviceId: 2,
        serviceName: "Massage relaxant",
        date: "2025-05-07",
        time: "16:30",
        duration: 90,
        price: 85,
        status: "confirmed",
        notes: "A demandé une pression moyenne pour le massage.",
        statusLogs: [
            {
                status: "created",
                date: new Date("2025-04-28T10:15:00"),
                note: "Rendez-vous créé",
            },
            {
                status: "confirmed",
                date: new Date("2025-04-29T14:30:00"),
                note: "Confirmation par SMS",
            },
        ],
    },
]);
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
// Toggle all statuses
const toggleAllStatuses = () => {
    const allChecked = statusFilters.value.all;
    statusFilters.value.pending = allChecked;
    statusFilters.value.confirmed = allChecked;
    statusFilters.value.completed = allChecked;
    statusFilters.value.cancelled = allChecked;
};
// Toggle all services
const toggleAllServices = () => {
    const allChecked = serviceFilters.value.all;
    services.value.forEach((service) => {
        serviceFilters.value[service.id] = allChecked;
    });
};
// Get date filter label
const getDateFilterLabel = () => {
    switch (dateFilter.value) {
        case "today":
            return "Aujourd'hui";
        case "tomorrow":
            return "Demain";
        case "thisWeek":
            return "Cette semaine";
        case "thisMonth":
            return "Ce mois";
        default:
            return "Toutes les dates";
    }
};
// Format date
const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
};
// Format date with time
const formatDateWithTime = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};
// Get status text
const getStatusText = (status: string) => {
    switch (status) {
        case "pending":
            return "En attente";
        case "confirmed":
            return "Confirmé";
        case "completed":
            return "Terminé";
        case "cancelled":
            return "Annulé";
        default:
            return status;
    }
};
// Get status log text
const getStatusLogText = (status: string) => {
    switch (status) {
        case "pending":
            return "En attente de confirmation";
        case "confirmed":
            return "Rendez-vous confirmé";
        case "completed":
            return "Rendez-vous terminé";
        case "cancelled":
            return "Rendez-vous annulé";
        case "created":
            return "Rendez-vous créé";
        case "rescheduled":
            return "Rendez-vous reporté";
        default:
            return status;
    }
};
// Get status class for calendar
const getStatusClass = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "confirmed":
            return "bg-green-100 text-green-800";
        case "completed":
            return "bg-blue-100 text-blue-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};
// Change month
const changeMonth = (delta: number) => {
    let newMonth = currentMonth.value + delta;
    let newYear = currentYear.value;
    if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    }
    currentMonth.value = newMonth;
    currentYear.value = newYear;
};
// Get current month name
const currentMonthName = computed(() => {
    const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];
    return months[currentMonth.value];
});
// Get calendar days
const calendarDays = computed(() => {
    const days = [];
    const date = new Date(currentYear.value, currentMonth.value, 1);
    // Get the first day of the month
    const firstDayOfMonth = date.getDay();
    // Adjust for Monday as first day of week (0 is Sunday in JS)
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    // Get the last day of the month
    const lastDay = new Date(
        currentYear.value,
        currentMonth.value + 1,
        0,
    ).getDate();
    // Get the last day of the previous month
    const prevMonthLastDay = new Date(
        currentYear.value,
        currentMonth.value,
        0,
    ).getDate();
    // Fill in days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const dayDate = new Date(currentYear.value, currentMonth.value - 1, day);
        days.push({
            dayNumber: day,
            isCurrentMonth: false,
            isToday: isToday(dayDate),
            isSelected: isSelectedDate(dayDate),
            date: formatDateForComparison(dayDate),
        });
    }
    // Fill in days of current month
    const today = new Date();
    for (let i = 1; i <= lastDay; i++) {
        const dayDate = new Date(currentYear.value, currentMonth.value, i);
        days.push({
            dayNumber: i,
            isCurrentMonth: true,
            isToday: isToday(dayDate),
            isSelected: isSelectedDate(dayDate),
            date: formatDateForComparison(dayDate),
        });
    }
    // Fill in days from next month
    const daysNeeded = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysNeeded; i++) {
        const dayDate = new Date(currentYear.value, currentMonth.value + 1, i);
        days.push({
            dayNumber: i,
            isCurrentMonth: false,
            isToday: isToday(dayDate),
            isSelected: isSelectedDate(dayDate),
            date: formatDateForComparison(dayDate),
        });
    }
    return days;
});
// Check if date is today
const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};
// Check if date is selected
const isSelectedDate = (date: Date) => {
    if (!selectedDate.value) return false;
    const selected = new Date(selectedDate.value);
    return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
    );
};
// Format date for comparison (YYYY-MM-DD)
const formatDateForComparison = (date: Date) => {
    return date.toISOString().split("T")[0];
};
// Select date
const selectDate = (dateString: string) => {
    selectedDate.value = dateString;
    dateFilter.value = "all";
};
// Clear selected date
const clearSelectedDate = () => {
    selectedDate.value = "";
};
// Open date picker
const openDatePicker = () => {
    // In a real app, this would open a date picker
    // For now, we'll just close the dropdown
    openDropdown.value = "";
};
// Get appointments for a specific day
const getAppointmentsForDay = (dateString: string) => {
    return filteredAppointments.value.filter(
        (appointment) => appointment.date === dateString,
    );
};
// Get appointment count for a specific day
const getAppointmentCount = (dateString: string) => {
    return getAppointmentsForDay(dateString).length;
};
// Filter appointments based on search, date, status, and service
const filteredAppointments = computed(() => {
    let result = [...appointments.value];
    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (appointment) =>
                appointment.clientName.toLowerCase().includes(query) ||
                appointment.serviceName.toLowerCase().includes(query) ||
                appointment.clientPhone.includes(query),
        );
    }
    // Filter by selected date
    if (selectedDate.value) {
        result = result.filter(
            (appointment) => appointment.date === selectedDate.value,
        );
    }
    // Or filter by date range
    else if (dateFilter.value !== "all") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(
            today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1),
        ); // Monday
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        switch (dateFilter.value) {
            case "today":
                result = result.filter(
                    (appointment) => appointment.date === formatDateForComparison(today),
                );
                break;
            case "tomorrow":
                result = result.filter(
                    (appointment) =>
                        appointment.date === formatDateForComparison(tomorrow),
                );
                break;
            case "thisWeek":
                result = result.filter((appointment) => {
                    const appointmentDate = new Date(appointment.date);
                    return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
                });
                break;
            case "thisMonth":
                result = result.filter((appointment) => {
                    const appointmentDate = new Date(appointment.date);
                    return (
                        appointmentDate >= startOfMonth && appointmentDate <= endOfMonth
                    );
                });
                break;
        }
    }
    // Filter by status
    if (!statusFilters.value.all) {
        const activeStatuses: string[] = [];
        if (statusFilters.value.pending) activeStatuses.push("pending");
        if (statusFilters.value.confirmed) activeStatuses.push("confirmed");
        if (statusFilters.value.completed) activeStatuses.push("completed");
        if (statusFilters.value.cancelled) activeStatuses.push("cancelled");
        if (activeStatuses.length > 0) {
            result = result.filter((appointment) =>
                activeStatuses.includes(appointment.status),
            );
        }
    }
    // Filter by service
    if (!serviceFilters.value.all) {
        const activeServiceIds = services.value
            .filter((service) => serviceFilters.value[service.id])
            .map((service) => service.id);
        if (activeServiceIds.length > 0) {
            result = result.filter((appointment) =>
                activeServiceIds.includes(appointment.serviceId),
            );
        }
    }
    // Sort by date and time
    result.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });
    return result;
});
// Pagination
const paginatedAppointments = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredAppointments.value.slice(start, end);
});
const totalPages = computed(() => {
    return Math.ceil(filteredAppointments.value.length / itemsPerPage.value);
});
const paginationStart = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value + 1;
});
const paginationEnd = computed(() => {
    const end = currentPage.value * itemsPerPage.value;
    return end > filteredAppointments.value.length
        ? filteredAppointments.value.length
        : end;
});
// Open appointment details modal
const openAppointmentDetails = (appointment: any) => {
    selectedAppointment.value = { ...appointment };
    appointmentNotes.value = appointment.notes || "";
    showAppointmentModal.value = true;
};
// Close appointment details modal
const closeAppointmentModal = () => {
    showAppointmentModal.value = false;
};
// Save notes
const saveNotes = () => {
    const index = appointments.value.findIndex(
        (a) => a.id === selectedAppointment.value.id,
    );
    if (index !== -1) {
        appointments.value[index].notes = appointmentNotes.value;
        selectedAppointment.value.notes = appointmentNotes.value;
    }
};
// Open add appointment modal
const openAddAppointmentModal = () => {
    newAppointment.value = {
        clientId: "",
        serviceId: "",
        date: formatDateForComparison(new Date()),
        time: "10:00",
        duration: 0,
        price: 0,
        notes: "",
    };
    showAddModal.value = true;
};
// Close add appointment modal
const closeAddModal = () => {
    showAddModal.value = false;
};
// Update service details when service is selected
const updateServiceDetails = () => {
    const serviceId = parseInt(newAppointment.value.serviceId as string);
    const service = services.value.find((s) => s.id === serviceId);
    if (service) {
        newAppointment.value.duration = service.duration;
        newAppointment.value.price = service.price;
    }
};
// Save new appointment
const saveAppointment = () => {
    const clientId = parseInt(newAppointment.value.clientId as string);
    const serviceId = parseInt(newAppointment.value.serviceId as string);
    const client = clients.value.find((c) => c.id === clientId);
    const service = services.value.find((s) => s.id === serviceId);
    if (client && service) {
        const newId = Math.max(...appointments.value.map((a) => a.id)) + 1;
        const appointment = {
            id: newId,
            clientId,
            clientName: client.name,
            clientEmail: client.email,
            clientPhone: client.phone,
            clientAvatar: client.avatar,
            serviceId,
            serviceName: service.name,
            date: newAppointment.value.date,
            time: newAppointment.value.time,
            duration: newAppointment.value.duration,
            price: newAppointment.value.price,
            status: "pending",
            notes: newAppointment.value.notes,
            statusLogs: [
                { status: "created", date: new Date(), note: "Rendez-vous créé" },
            ],
        };
        appointments.value.push(appointment);
        closeAddModal();
    }
};
// Open reschedule modal
const openRescheduleModal = (appointment: any) => {
    selectedAppointment.value = { ...appointment };
    rescheduleData.value = {
        date: appointment.date,
        time: appointment.time,
        reason: "",
    };
    showRescheduleModal.value = true;
    if (showAppointmentModal.value) {
        showAppointmentModal.value = false;
    }
};
// Close reschedule modal
const closeRescheduleModal = () => {
    showRescheduleModal.value = false;
};
// Reschedule appointment
const rescheduleAppointment = () => {
    const index = appointments.value.findIndex(
        (a) => a.id === selectedAppointment.value.id,
    );
    if (index !== -1) {
        // Update appointment
        appointments.value[index].date = rescheduleData.value.date;
        appointments.value[index].time = rescheduleData.value.time;
        // Add status log
        appointments.value[index].statusLogs.push({
            status: "rescheduled",
            date: new Date(),
            note: `Rendez-vous reporté au ${formatDate(rescheduleData.value.date)} à ${rescheduleData.value.time}. Raison: ${rescheduleData.value.reason}`,
        });
        closeRescheduleModal();
    }
};
// Open cancel modal
const openCancelModal = (appointment: any) => {
    selectedAppointment.value = { ...appointment };
    cancelReason.value = "";
    showCancelModal.value = true;
    if (showAppointmentModal.value) {
        showAppointmentModal.value = false;
    }
};
// Close cancel modal
const closeCancelModal = () => {
    showCancelModal.value = false;
};
// Cancel appointment
const cancelAppointment = () => {
    const index = appointments.value.findIndex(
        (a) => a.id === selectedAppointment.value.id,
    );
    if (index !== -1) {
        // Update status
        appointments.value[index].status = "cancelled";
        // Add status log
        appointments.value[index].statusLogs.push({
            status: "cancelled",
            date: new Date(),
            note: `Rendez-vous annulé. Raison: ${cancelReason.value}`,
        });
        closeCancelModal();
    }
};
// Confirm appointment
const confirmAppointment = (appointment: any) => {
    const index = appointments.value.findIndex((a) => a.id === appointment.id);
    if (index !== -1) {
        // Update status
        appointments.value[index].status = "confirmed";
        // Add status log
        appointments.value[index].statusLogs.push({
            status: "confirmed",
            date: new Date(),
            note: "Rendez-vous confirmé",
        });
        if (showAppointmentModal.value) {
            selectedAppointment.value = { ...appointments.value[index] };
        }
    }
};
// Complete appointment
const completeAppointment = (appointment: any) => {
    const index = appointments.value.findIndex((a) => a.id === appointment.id);
    if (index !== -1) {
        // Update status
        appointments.value[index].status = "completed";
        // Add status log
        appointments.value[index].statusLogs.push({
            status: "completed",
            date: new Date(),
            note: "Rendez-vous terminé",
        });
        if (showAppointmentModal.value) {
            selectedAppointment.value = { ...appointments.value[index] };
        }
    }
};
// Reset filters
const resetFilters = () => {
    searchQuery.value = "";
    dateFilter.value = "all";
    selectedDate.value = "";
    statusFilters.value = {
        all: true,
        pending: true,
        confirmed: true,
        completed: true,
        cancelled: true,
    };
    serviceFilters.value = { all: true };
    services.value.forEach((service) => {
        serviceFilters.value[service.id] = true;
    });
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex">
        <!-- Main Content -->
        <div class="ml-64 flex-1">
            <!-- Header -->
            <header class="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-5">
                <div class="flex items-center">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Rechercher un rendez-vous..."
                            class="pl-10 pr-4 py-2 border-none rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm" />
                        <Search class="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <button
                            class="text-gray-500 hover:text-pink-500 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
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
            <!-- Appointments Content -->
            <main class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">Rendez-vous reçus</h1>
                        <p class="text-gray-600">
                            Gérez les rendez-vous pris par vos clients
                        </p>
                    </div>
                    <button @click="openAddAppointmentModal"
                        class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                        <Plus class="mr-2" /> Réserver un service
                    </button>
                </div>
                <!-- View Toggle and Filters -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div class="flex flex-wrap justify-between items-center mb-6">
                        <div class="flex items-center space-x-4">
                            <button @click="viewMode = 'calendar'" :class="[
                                'px-4 py-2 rounded-lg text-sm flex font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap',
                                viewMode === 'calendar'
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            ]">
                                <CalendarDays class="mr-2 h-5 w-5" />
                                Calendrier
                            </button>
                            <button @click="viewMode = 'list'" :class="[
                                'px-4 py-2 rounded-lg text-sm flex font-medium transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap',
                                viewMode === 'list'
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            ]">
                                <List class="mr-2 h-5 w-5" />
                                Liste
                            </button>
                        </div>
                        <div class="flex space-x-2 mt-4 sm:mt-0">
                            <div class="relative">
                                <button @click="toggleFilterDropdown('date')"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                                    <CalendarDays class="mr-2"/> 
                                    {{ getDateFilterLabel() }}
                                    <ChevronDown class="ml-2 text-xs"/>
                                </button>
                                <div v-if="openDropdown === 'date'"
                                    class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
                                    <div class="space-y-2">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" v-model="dateFilter" value="all" class="mr-2" />
                                            <span>Toutes les dates</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" v-model="dateFilter" value="today" class="mr-2" />
                                            <span>Aujourd'hui</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" v-model="dateFilter" value="tomorrow" class="mr-2" />
                                            <span>Demain</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" v-model="dateFilter" value="thisWeek" class="mr-2" />
                                            <span>Cette semaine</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="radio" v-model="dateFilter" value="thisMonth" class="mr-2" />
                                            <span>Ce mois</span>
                                        </label>
                                        <div class="pt-2 border-t mt-2">
                                            <button @click="openDatePicker"
                                                class="text-pink-600 hover:text-pink-700 text-sm flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                                                <CalendarDays class="mr-2 h-5 w-5" /> Date spécifique
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative">
                                <button @click="toggleFilterDropdown('status')"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                                    <ArrowDownWideNarrow class="mr-1 h-5 w-5"/>
                                    Statut
                                    <ChevronDown class="ml-2 text-xs h-5 w-5"/> 
                                </button>
                                <div v-if="openDropdown === 'status'"
                                    class="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
                                    <div class="space-y-2">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="statusFilters.all"
                                                @change="toggleAllStatuses" class="mr-2" />
                                            <span>Tous les statuts</span>
                                        </label>
                                        <div class="border-t my-2"></div>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="statusFilters.pending" class="mr-2" />
                                            <span class="flex items-center">
                                                <span class="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                                                En attente
                                            </span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="statusFilters.confirmed" class="mr-2" />
                                            <span class="flex items-center">
                                                <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                                Confirmé
                                            </span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="statusFilters.completed" class="mr-2" />
                                            <span class="flex items-center">
                                                <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                                Terminé
                                            </span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="statusFilters.cancelled" class="mr-2" />
                                            <span class="flex items-center">
                                                <span class="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                                Annulé
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="relative">
                                <button @click="toggleFilterDropdown('service')"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                                    <ConciergeBell class=" mr-2 h-5 w-5"/>
                                    Service
                                    <ChevronDown class="ml-2 text-xs h-5 w-5"/>
                                </button>
                                <div v-if="openDropdown === 'service'"
                                    class="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-3 z-10 w-48">
                                    <div class="space-y-2">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="serviceFilters.all"
                                                @change="toggleAllServices" class="mr-2" />
                                            <span>Tous les services</span>
                                        </label>
                                        <div class="border-t my-2"></div>
                                        <label v-for="service in services" :key="service.id"
                                            class="flex items-center cursor-pointer">
                                            <input type="checkbox" v-model="serviceFilters[service.id]" class="mr-2" />
                                            <span>{{ service.name }}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="selectedDate" class="bg-gray-50 p-3 rounded-lg mb-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <CalendarDays class=" text-pink-600 mr-2"/>
                            <span>Date sélectionnée:
                                <strong>{{ formatDate(selectedDate) }}</strong></span>
                        </div>
                        <button @click="clearSelectedDate"
                            class="text-gray-500 hover:text-red-600 cursor-pointer !rounded-button whitespace-nowrap">
                            <Clock8 class="h-5 w-5"/>
                        </button>
                    </div>
                </div>
                <!-- Calendar View -->
                <div v-if="viewMode === 'calendar'" class="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div class="flex justify-between items-center mb-6">
                        <button @click="changeMonth(-1)"
                            class="text-gray-600 hover:text-pink-600 p-2 cursor-pointer !rounded-button whitespace-nowrap">
                            <ChevronLeft />
                        </button>
                        <h2 class="text-xl font-bold text-gray-800">
                            {{ currentMonthName }} {{ currentYear }}
                        </h2>
                        <button @click="changeMonth(1)"
                            class="text-gray-600 hover:text-pink-600 p-2 cursor-pointer !rounded-button whitespace-nowrap">
                            <ChevronRight />
                        </button>
                    </div>
                    <div class="grid grid-cols-7 gap-1 mb-2">
                        <div v-for="day in weekDays" :key="day"
                            class="text-center text-sm font-medium text-gray-700 py-2">
                            {{ day }}
                        </div>
                    </div>
                    <div class="grid grid-cols-7 gap-1">
                        <div v-for="(day, index) in calendarDays" :key="index" :class="[
                            'min-h-24 border rounded-lg p-1 transition-colors',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400',
                            day.isToday ? 'border-pink-300 bg-pink-50' : 'border-gray-100',
                            day.isSelected ? 'border-pink-500 bg-pink-100' : '',
                            'cursor-pointer hover:bg-pink-50'
                        ]" @click="selectDate(day.date)">
                            <div class="flex justify-between items-start">
                                <span
                                    :class="['text-sm font-medium p-1 rounded-full w-6 h-6 flex items-center justify-center', day.isToday ? 'bg-pink-600 text-white' : '']">
                                    {{ day.dayNumber }}
                                </span>
                                <span v-if="getAppointmentCount(day.date) > 0"
                                    class="text-xs bg-pink-600 text-white rounded-full px-1.5 py-0.5">
                                    {{ getAppointmentCount(day.date) }}
                                </span>
                            </div>
                            <div class="mt-1 space-y-1 overflow-hidden">
                                <div v-for="appt in getAppointmentsForDay(day.date).slice(0, 2)" :key="appt.id" :class="[
                                    'text-xs p-1 rounded truncate',
                                    getStatusClass(appt.status)
                                ]" @click.stop="openAppointmentDetails(appt)">
                                    {{ appt.time }} - {{ appt.clientName }}
                                </div>
                                <div v-if="getAppointmentsForDay(day.date).length > 2"
                                    class="text-xs text-center text-gray-500">
                                    + {{ getAppointmentsForDay(day.date).length - 2 }} plus
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-center space-x-4">
                        <div class="flex items-center">
                            <span class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                            <span class="text-sm text-gray-600">En attente</span>
                        </div>
                        <div class="flex items-center">
                            <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            <span class="text-sm text-gray-600">Confirmé</span>
                        </div>
                        <div class="flex items-center">
                            <span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                            <span class="text-sm text-gray-600">Terminé</span>
                        </div>
                        <div class="flex items-center">
                            <span class="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            <span class="text-sm text-gray-600">Annulé</span>
                        </div>
                    </div>
                </div>
                <!-- List View -->
                <div v-if="viewMode === 'list'" class="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date & Heure
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Durée
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Prix
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="appointment in filteredAppointments" :key="appointment.id"
                                    class="hover:bg-gray-50 cursor-pointer"
                                    @click="openAppointmentDetails(appointment)">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ formatDate(appointment.date) }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ appointment.time }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                                                <img :src="appointment.clientAvatar" alt=""
                                                    class="h-full w-full object-cover" />
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">
                                                    {{ appointment.clientName }}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    {{ appointment.clientPhone }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="text-sm text-gray-900">
                                            {{ appointment.serviceName }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ appointment.duration }} min
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ appointment.price }} €
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span :class="[
                                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : '',
                                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : '',
                                            appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : '',
                                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''
                                        ]">
                                            {{ getStatusText(appointment.status) }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div class="flex justify-end space-x-2" @click.stop>
                                            <button v-if="appointment.status === 'pending'"
                                                @click="confirmAppointment(appointment)"
                                                class="text-green-600 hover:text-green-900 cursor-pointer !rounded-button whitespace-nowrap"
                                                title="Confirmer">
                                                <Check class="h-5 w-5" />
                                            </button>
                                            <button
                                                v-if="appointment.status === 'pending' || appointment.status === 'confirmed'"
                                                @click="openRescheduleModal(appointment)"
                                                class="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap"
                                                title="Reporter">
                                                <CalendarDays class="h-5 w-5" />
                                            </button>
                                            <button
                                                v-if="appointment.status === 'pending' || appointment.status === 'confirmed'"
                                                @click="openCancelModal(appointment)"
                                                class="text-red-600 hover:text-red-900 cursor-pointer !rounded-button whitespace-nowrap"
                                                title="Annuler">
                                                <ClockFading class="h-5 w-5" />
                                            </button>
                                            <button @click="openAppointmentDetails(appointment)"
                                                class="text-gray-600 hover:text-pink-600 cursor-pointer !rounded-button whitespace-nowrap"
                                                title="Détails">
                                                <Eye class="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Empty State -->
                    <div v-if="filteredAppointments.length === 0" class="py-12 text-center">
                        <div class="mb-4 text-gray-400">
                            <CalendarClock class="text-5xl" />
                        </div>
                        <h3 class="text-xl font-medium text-gray-800 mb-2">
                            Aucun rendez-vous trouvé
                        </h3>
                        <p class="text-gray-600 mb-6">
                            Aucun rendez-vous ne correspond à vos critères de recherche.
                        </p>
                        <button @click="resetFilters"
                            class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                            Réinitialiser les filtres
                        </button>
                    </div>
                    <!-- Pagination -->
                    <div v-if="filteredAppointments.length > 0"
                        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Affichage de
                                    <span class="font-medium">{{ paginationStart }}</span> à
                                    <span class="font-medium">{{ paginationEnd }}</span> sur
                                    <span class="font-medium">{{ filteredAppointments.length }}</span>
                                    rendez-vous
                                </p>
                            </div>
                            <div>
                                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination">
                                    <button @click="currentPage > 1 ? currentPage-- : null"
                                        :disabled="currentPage === 1" :class="[
                                            'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                                            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                        ]">
                                        <span class="sr-only">Précédent</span>
                                        <ChevronLeft />
                                    </button>
                                    <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                                        currentPage === page
                                            ? 'z-10 bg-pink-50 border-pink-500 text-pink-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    ]">
                                        {{ page }}
                                    </button>
                                    <button @click="currentPage < totalPages ? currentPage++ : null"
                                        :disabled="currentPage === totalPages" :class="[
                                            'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                                            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                                        ]">
                                        <span class="sr-only">Suivant</span>
                                        <ChevronRight />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <!-- Appointment Details Modal -->
        <div v-if="showAppointmentModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
                <div class="p-6 border-b flex justify-between items-center">
                    <h2 class="text-xl font-bold text-gray-800">
                        Détails du rendez-vous
                    </h2>
                    <button @click="closeAppointmentModal"
                        class="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
                        <X />
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex flex-col md:flex-row md:space-x-6">
                        <div class="md:w-1/3 mb-6 md:mb-0">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex items-center mb-4">
                                    <div class="h-16 w-16 rounded-full overflow-hidden mr-4">
                                        <img :src="selectedAppointment.clientAvatar" alt="Client"
                                            class="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-lg">
                                            {{ selectedAppointment.clientName }}
                                        </h3>
                                        <p class="text-gray-600 text-sm">
                                            {{ selectedAppointment.clientEmail }}
                                        </p>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="flex items-start">

                                        <PhoneCall class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Téléphone</p>
                                            <p class="text-sm text-gray-600">
                                                {{ selectedAppointment.clientPhone }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <CalendarDays class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Date</p>
                                            <p class="text-sm text-gray-600">
                                                {{ formatDate(selectedAppointment.date) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <Clock8 class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Heure</p>
                                            <p class="text-sm text-gray-600">
                                                {{ selectedAppointment.time }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <ConciergeBell class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Service</p>
                                            <p class="text-sm text-gray-600">
                                                {{ selectedAppointment.serviceName }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <Hourglass class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Durée</p>
                                            <p class="text-sm text-gray-600">
                                                {{ selectedAppointment.duration }} minutes
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <Euro class="text-gray-400 mt-1 w-5" />
                                        <div class="ml-2">
                                            <p class="text-sm font-medium">Prix</p>
                                            <p class="text-sm text-gray-600">
                                                {{ selectedAppointment.price }} €
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-2/3">
                            <div class="mb-6">
                                <div class="flex justify-between items-center mb-2">
                                    <h3 class="font-bold text-lg">Statut</h3>
                                    <span :class="[
                                        'px-3 py-1 text-sm rounded-full font-medium',
                                        selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : '',
                                        selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : '',
                                        selectedAppointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : '',
                                        selectedAppointment.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''
                                    ]">
                                        {{ getStatusText(selectedAppointment.status) }}
                                    </span>
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex items-center justify-between mb-4">
                                        <h4 class="font-medium">Historique des modifications</h4>
                                    </div>
                                    <div class="space-y-3">
                                        <div v-for="(log, index) in selectedAppointment.statusLogs" :key="index"
                                            class="flex items-start">
                                            <div class="flex-shrink-0 mt-1">
                                                <span :class="[
                                                    'w-8 h-8 rounded-full flex items-center justify-center',
                                                    log.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : '',
                                                    log.status === 'confirmed' ? 'bg-green-100 text-green-600' : '',
                                                    log.status === 'completed' ? 'bg-blue-100 text-blue-600' : '',
                                                    log.status === 'cancelled' ? 'bg-red-100 text-red-600' : '',
                                                    log.status === 'created' ? 'bg-gray-100 text-gray-600' : '',
                                                    log.status === 'rescheduled' ? 'bg-purple-100 text-purple-600' : ''
                                                ]">
                                                    <component :is="iconMap[log.status]"
                                                        class="w-5 h-5 text-gray-600" />
                                                </span>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-sm font-medium">
                                                    {{ getStatusLogText(log.status) }}
                                                </p>
                                                <p class="text-xs text-gray-500">
                                                    {{ formatDateWithTime(log.date) }}
                                                </p>
                                                <p v-if="log.note" class="text-sm text-gray-600 mt-1">
                                                    {{ log.note }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-6">
                                <h3 class="font-bold text-lg mb-2">Notes</h3>
                                <textarea v-model="appointmentNotes" rows="3"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                                    placeholder="Ajouter des notes concernant ce rendez-vous..."></textarea>
                                <div class="flex justify-end mt-2">
                                    <button @click="saveNotes"
                                        class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                        Enregistrer les notes
                                    </button>
                                </div>
                            </div>
                            <div class="border-t pt-6 flex flex-wrap gap-3">
                                <button v-if="selectedAppointment.status === 'pending'"
                                    @click="confirmAppointment(selectedAppointment)"
                                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                    <Check/> Confirmer
                                </button>
                                <button v-if="selectedAppointment.status === 'confirmed'"
                                    @click="completeAppointment(selectedAppointment)"
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                    <CheckCheck class="mr-2"/> Marquer comme terminé
                                </button>
                                <button
                                    v-if="selectedAppointment.status === 'pending' || selectedAppointment.status === 'confirmed'"
                                    @click="openRescheduleModal(selectedAppointment)"
                                    class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                 <CalendarDays class="mr-2"/> Reporter
                                </button>
                                <button
                                    v-if="selectedAppointment.status === 'pending' || selectedAppointment.status === 'confirmed'"
                                    @click="openCancelModal(selectedAppointment)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                   <ClockFading class="mr-2"/> Annuler
                                </button>
                                <button @click="closeAppointmentModal"
                                    class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm flex items-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                    <Clock8 class="mr-2"/> Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add Appointment Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" @click.stop>
                <div class="p-6 border-b">
                    <h2 class="text-xl font-bold text-gray-800">
                        Ajouter un nouveau rendez-vous
                    </h2>
                </div>
                <div class="p-6">
                    <form @submit.prevent="saveAppointment">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Client</label>
                                <div class="relative">
                                    <select v-model="newAppointment.clientId" required
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm appearance-none">
                                        <option value="" disabled>Sélectionner un client</option>
                                        <option v-for="client in clients" :key="client.id" :value="client.id">
                                            {{ client.name }}
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                       <ChevronDown class="w-4 h-4 text-gray-400"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Service</label>
                                <div class="relative">
                                    <select v-model="newAppointment.serviceId" required
                                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm appearance-none"
                                        @change="updateServiceDetails">
                                        <option value="" disabled>Sélectionner un service</option>
                                        <option v-for="service in services" :key="service.id" :value="service.id">
                                            {{ service.name }} ({{ service.duration }} min - {{
                                                service.price }} €)
                                        </option>
                                    </select>
                                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown class="w-4 h-4 text-gray-400"/>>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input v-model="newAppointment.date" type="date" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                                <input v-model="newAppointment.time" type="time" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Durée (minutes)</label>
                                <input v-model.number="newAppointment.duration" type="number" required min="15" step="5"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                                <input v-model.number="newAppointment.price" type="number" required min="0" step="0.01"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                            </div>
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                            <textarea v-model="newAppointment.notes" rows="3"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                                placeholder="Ajouter des notes concernant ce rendez-vous..."></textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeAddModal"
                                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                Annuler
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                Ajouter le rendez-vous
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Reschedule Modal -->
        <div v-if="showRescheduleModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md" @click.stop>
                <div class="p-6 border-b">
                    <h2 class="text-xl font-bold text-gray-800">
                        Reporter le rendez-vous
                    </h2>
                </div>
                <div class="p-6">
                    <form @submit.prevent="rescheduleAppointment">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nouvelle date</label>
                            <input v-model="rescheduleData.date" type="date" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nouvelle heure</label>
                            <input v-model="rescheduleData.time" type="time" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm" />
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Raison du report</label>
                            <textarea v-model="rescheduleData.reason" rows="3"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                                placeholder="Indiquez la raison du report..."></textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="closeRescheduleModal"
                                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                Annuler
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                                Confirmer le report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Cancel Modal -->
        <div v-if="showCancelModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md" @click.stop>
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                            <TriangleAlert class="text-red-600 text-2xl"/>    
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">
                            Confirmer l'annulation
                        </h3>
                        <p class="text-gray-600">
                            Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est
                            irréversible.
                        </p>
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Raison de l'annulation</label>
                        <textarea v-model="cancelReason" rows="3"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 text-sm"
                            placeholder="Indiquez la raison de l'annulation..."></textarea>
                    </div>
                    <div class="flex justify-center space-x-3">
                        <button @click="closeCancelModal"
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                            Retour
                        </button>
                        <button @click="cancelAppointment"
                            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
                            Confirmer l'annulation
                        </button>
                    </div>
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
</style>