<script setup>
import {
  User,
  Signature,
  CircleCheck,
  ChevronsRight,
  ChevronsLeft,
  Loader,
  Mail,
  Lock,
  MapPin,
  MapPlus,
  Home,
  Building2,
  DraftingCompass,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  Eye,
  EyeClosed,
} from "lucide-vue-next";
// Configuration des étapes
const steps = [
  { label: "Informations personnelles" },
  { label: "Localisation" },
  { label: "Documents" },
];

const { isSubmitting } = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false,
  },
});
// Données du formulaire
const form = ref({
  fullName: "",
  firstName: "",
  email: "",
  password: "",
  experience: null,
  establishment: "",
  neighborhood: "",
  description: "",
  street: "",
  city: "",
  landmark: "",
  diploma: null,
  locationImage: null,
  portfolio: null,
  termsAccepted: false,
  is_independent: false,
});

// États
const currentStep = ref(0);
const showPassword = ref(false);
const errors = ref({});

// Gestion des fichiers
const handleFileUpload = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    form.value[field] = file;
    clearError(field);
  }
}; // Validation des étapes
const validateStep = (step) => {
  let isValid = true;
  errors.value = {};

  if (step === 0) {
    if (!form.value.fullName) {
      errors.value.fullName = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.description) {
      errors.value.description = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.firstName) {
      errors.value.firstName = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.email) {
      errors.value.email = "Ce champ est requis";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
      errors.value.email = "Veuillez entrer un email valide";
      isValid = false;
    }
    if (!form.value.password) {
      errors.value.password = "Ce champ est requis";
      isValid = false;
    } else if (form.value.password.length < 8) {
      errors.value.password = "Minimum 8 caractères";
      isValid = false;
    }
    if (form.value.experience === null || form.value.experience === "") {
      errors.value.experience = "Ce champ est requis";
      isValid = false;
    }
  } else if (step === 1) {
    if (!form.value.establishment) {
      errors.value.establishment = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.neighborhood) {
      errors.value.neighborhood = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.street) {
      errors.value.street = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.city) {
      errors.value.city = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.landmark) {
      errors.value.landmark = "Ce champ est requis";
      isValid = false;
    }
  } else if (step === 2) {
    if (!form.value.diploma) {
      errors.value.diploma = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.portfolio) {
      errors.value.portfolio = "Ce champ est requis";
      isValid = false;
    }
    if (!form.value.termsAccepted) {
      errors.value.termsAccepted = "Vous devez accepter cette condition";
      isValid = false;
    }
  }

  return isValid;
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

// Navigation entre les étapes
const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value++;
  }
};

const prevStep = () => {
  currentStep.value--;
};

// Soumission du formulaire
const emit = defineEmits(["submit", "becomeProvider"]);

// Fonction pour convertir un fichier en objet avec les propriétés demandées
const convertFileToObject = async (file) => {
  if (!file) return null;

  const base64 = await fileToBase64(file);
  return {
    base64: base64.split(",")[1], // Retire le préfixe "data:*/*;base64,"
    mime_type: file.type,
    file_name: file.name,
    size: file.size.toString(),
  };
};

const submitForm = async () => {
  if (!validateStep(currentStep.value)) {
    //isSubmitting.value = false;
    return;
  }

  try {
    // Conversion des fichiers en objets avec les propriétés demandées
    const diplomaFile = form.value.diploma
      ? await convertFileToObject(form.value.diploma)
      : null;
    const portfolioFile = form.value.portfolio
      ? await convertFileToObject(form.value.portfolio)
      : null;

    // Création de l'objet à envoyer
    const formDataToSend = {
      ...form.value,
      diploma: diplomaFile,
      portfolio: portfolioFile,
    };

    emit("submit", formDataToSend); // Envoi vers le parent
    emit("becomeProvider", formDataToSend); // Envoi vers le parent
  } catch (error) {
    console.error("Erreur lors de la conversion des fichiers :", error);
  }
};

// Fonction pour convertir un fichier en base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="form-container max-w-4xl w-full bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-slate-600 to-slate-800 p-6 text-white">
        <h1 class="text-2xl font-bold">Inscription Professionnelle</h1>
        <p class="text-blue-100 mt-1">
          Remplissez les informations requises pour finaliser votre inscription
        </p>
      </div>

      <!-- Étapes -->
      <div class="px-8 pt-6 pb-2">
        <div class="flex items-center justify-between relative">
          <div
            class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"
          ></div>

          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center"
          >
            <div
              class="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium mb-2"
              :class="{
                'bg-green-500': index < currentStep,
                'bg-slate-700': index === currentStep,
                'bg-gray-300': index > currentStep,
              }"
            >
              {{ index + 1 }}
            </div>
            <span
              class="text-sm font-medium"
              :class="{
                'text-gray-500': index !== currentStep,
                'text-slate-500': index === currentStep,
              }"
            >
              {{ step.label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Formulaires -->
      <div class="px-8 py-6">
        <form @submit.prevent="submitForm">
          <!-- Étape 1 -->
          <div
            v-show="currentStep === 0"
            class="space-y-5"
            :class="{ 'fade-in': currentStep === 0 }"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Nom complet *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <User class="text-gray-500 w-5 h-5" />
                  </div>
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Jean Dupont"
                  />
                </div>
                <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">
                  {{ errors.fullName }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Prénom *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Signature class="text-gray-500 w-5 h-5" />
                  </div>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Jean"
                  />
                </div>
                <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                  {{ errors.firstName }}
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email *</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Mail class="text-gray-500 w-5 h-5" />
                </div>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="jean.dupont@exemple.com"
                />
              </div>
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Mot de passe *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Lock class="text-gray-500 w-5 h-5" />
                  </div>
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <component
                      :is="showPassword ? Eye : EyeClosed"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">Minimum 8 caractères</p>
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                  {{ errors.password }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Années d'expérience *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <BriefcaseBusiness class="text-gray-500 w-5 h-5" />
                  </div>
                  <input
                    v-model.number="form.experience"
                    type="number"
                    min="0"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="5"
                  />
                </div>
                <p v-if="errors.experience" class="text-red-500 text-xs mt-1">
                  {{ errors.experience }}
                </p>
              </div>
            </div>

            <!-- Checkbox "Êtes-vous indépendant" ajoutée ici -->
            <div
              class="block items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div class="dark:bg-black/10">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="form.is_independent"
                    class="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-5 h-5"
                    type="checkbox"
                  />
                  <span class="text-sm font-medium text-gray-700"
                    >Êtes-vous indépendant ?</span
                  >
                </label>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Si vous cochez cette case, vous confirmez que votre entreprise
                ne dispose pas de plus de deux employés.
              </p>
            </div>

            <div class="w-full">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Description *</label
              >
              <div>
                <textarea
                  v-model="form.description"
                  type="text"
                  required
                  class="input w-full pl-2 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Décrivez en quelques lignes votre entreprise"
                ></textarea>
              </div>
              <p v-if="errors.description" class="text-red-500 text-xs mt-1">
                {{ errors.description }}
              </p>
            </div>
          </div>

          <!-- Étape 2 -->
          <div
            v-show="currentStep === 1"
            class="space-y-5"
            :class="{ 'fade-in': currentStep === 1 }"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nom de l'établissement *</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <Home class="text-gray-500 w-5 h-5" />
                </div>
                <input
                  v-model="form.establishment"
                  type="text"
                  required
                  class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Entreprise XYZ"
                />
              </div>
              <p v-if="errors.establishment" class="text-red-500 text-xs mt-1">
                {{ errors.establishment }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Quartier *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <MapPin class="text-gray-500 h-5 w-5" />
                  </div>
                  <input
                    v-model="form.neighborhood"
                    type="text"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Quartier des affaires"
                  />
                </div>
                <p v-if="errors.neighborhood" class="text-red-500 text-xs mt-1">
                  {{ errors.neighborhood }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Rue/Avenue *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <MapPlus class="text-gray-500 h-5 w-5" />
                  </div>
                  <input
                    v-model="form.street"
                    type="text"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Avenue des Champs-Élysées"
                  />
                </div>
                <p v-if="errors.street" class="text-red-500 text-xs mt-1">
                  {{ errors.street }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Ville *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Building2 class="text-gray-500 w-5 h-5" />
                  </div>
                  <select
                    v-model="form.city"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Sélectionnez une ville
                    </option>
                    <option value="Paris">Douala</option>
                    <option value="Lyon">Yaoundé</option>
                    <option value="Marseille">Bafoussam</option>
                    <option value="Toulouse">Nkongsamba</option>
                    <option value="Nice">Bafang</option>
                  </select>
                </div>
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">
                  {{ errors.city }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Point de repère *</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <DraftingCompass class="text-gray-500 w-5 h-5" />
                  </div>
                  <input
                    v-model="form.landmark"
                    type="text"
                    required
                    class="input w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="À côté de tourisique voyage"
                  />
                </div>
                <p v-if="errors.landmark" class="text-red-500 text-xs mt-1">
                  {{ errors.landmark }}
                </p>
              </div>
            </div>
          </div>

          <!-- Étape 3 -->
          <div
            v-show="currentStep === 2"
            class="space-y-5 max-w-2xl text-center"
            :class="{ 'fade-in': currentStep === 2 }"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Diplôme (PDF ou DOCX) *</label
              >
              <div class="file-input">
                <label class="file-input-label">
                  <FileText class="text-red-500 mr-2 w-5 h-5" />
                  <span>Téléverser un fichier</span>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'diploma')"
                    accept=".pdf,.docx"
                    class="hidden"
                  />
                </label>
                <span class="file-name">{{
                  form.diploma?.name || "Aucun fichier sélectionné"
                }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Taille maximale : 5MB</p>
              <p v-if="errors.diploma" class="text-red-500 text-xs mt-1">
                {{ errors.diploma }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Portfolio (PDF ou DOCX) *</label
              >
              <div class="file-input">
                <label class="file-input-label">
                  <FolderOpen class="text-yellow-500 mr-2 w-5 h-5" />
                  <span>Téléverser un portfolio</span>
                  <input
                    required
                    type="file"
                    @change="handleFileUpload($event, 'portfolio')"
                    accept=".pdf,.docx"
                    class="hidden"
                  />
                </label>
                <span class="file-name">{{
                  form.portfolio?.name || "Aucun fichier sélectionné"
                }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Formats acceptés : PDF, DOCX, ZIP
              </p>
              <p class="text-xs text-gray-500 mt-1">Taille maximale : 5MB</p>
              <p v-if="errors.portfolio" class="text-red-500 text-xs mt-1">
                {{ errors.portfolio }}
              </p>
            </div>

            <div class="flex items-start mt-4">
              <div class="flex items-center h-5">
                <input
                  v-model="form.termsAccepted"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <p class="text-gray-500">
                  En cochant cette case, vous confirmez que toutes les
                  informations fournies sont exactes et complètes.
                </p>
              </div>
            </div>
            <p v-if="errors.termsAccepted" class="text-red-500 text-xs mt-1">
              {{ errors.termsAccepted }}
            </p>
          </div>

          <!-- Boutons de navigation -->
          <div class="flex justify-between mt-8 pt-5 border-t border-gray-200">
            <button
              type="button"
              @click="prevStep"
              class="btn px-6 flex items-center py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="currentStep === 0"
            >
              <ChevronsLeft class="mr-2 w-5 h-5" /> Retour
            </button>
            <button
              type="button"
              @click="nextStep"
              v-if="currentStep < steps.length - 1"
              class="btn px-6 flex items-center py-2.5 rounded-lg bg-slate-600 text-white font-medium hover:bg-slate-800"
            >
              Suivant
              <ChevronsRight class="ml-2 w-5 h-5" />
            </button>
            <button
              type="submit"
              v-else
              class="btn px-6 flex items-center py-2.5 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 text-white font-medium"
              :disabled="isSubmitting"
            >
              <Component
                :is="isSubmitting ? Loader : CircleCheck"
                class="mr-2 w-5 h-5"
                :class="{ 'animate-spin': isSubmitting }"
              />
              {{ isSubmitting ? "Envoi en cours..." : "Soumettre" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.form-container:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.input {
  transition: all 0.2s ease;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.file-input-label:hover {
  background-color: #e5e7eb;
}

.file-name {
  margin-left: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
