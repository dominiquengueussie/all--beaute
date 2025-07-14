<script setup>
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
import { useToast } from "vue-toastification";
 const toast = useToast();
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { Input } from "@/components/ui/input";
const { renderRecaptcha, phoneSendAuth, verifyCode } = useFirebaseAuth();

const phoneNumber = ref("");
const error = ref("");
const errorMesage = ref("");
const sentSuccess = ref(false);
const successLogin = ref(false);
const showVerification = ref(false);
const sending = ref(false);
const verifying = ref(false);

const showModal = ref(false);
const verificationCode = ref([""]);
const pinInputArray = ref(["", "", "", "", "", ""]);

onMounted(() => {
  renderRecaptcha("recaptcha-container");
});

const sendCode = async () => {
  sending.value = true;
  error.value = "";
  sentSuccess.value = false;

  const { success, error: authError } = await phoneSendAuth(phoneNumber.value);
  if (success) {
    showModal.value = true;
    sentSuccess.value = true;
    showVerification.value = true;
  } else {
    error.value = authError;
  }
  sending.value = false;
};
const verify = async () => {
  error.value = "";
  verifying.value = true;
  //showModal.value = true;
  const {
    success,
    error: authError,
    user,
  } = await verifyCode(verificationCode.value);

  if (success) {
    sending.value = true;
    if (errorMesage) {
      successLogin.value = false;
      showModal.value = false;
      sending.value = false;
    } else {
      successRegister.value = true;
    }
    await loginUserWithLaravel(user);
  } else {
    error.value = authError;
  }

  verifying.value = false;
};

const loginUserWithLaravel = async (firebaseUser) => {
  try {
    const response = await $fetch(
      "https://demo-allobeaute.tikaplace.com/api/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phoneNumber.value,
        }),
      }
    );

    console.log("Réponse complète:", response); // Debug crucial

    // Vérification approfondie de la réponse
    if (response?.status === "success") {
      const auth = useAuthStore();
      
      // Vérification sécurisée des données
      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;

      if (!token) {
        throw new Error("Token non reçu dans la réponse");
      }

      auth.setAuthData({
        token: token,
        user: user || { phone: phoneNumber.value }, // Fallback minimal
      });

      toast.success("Connexion réussie !");
      navigateTo("/");
    } else {
      throw new Error(response?.message || "Réponse inattendue");
    }
  } catch (error) {
    console.error("Erreur complète:", error);

    let errorMessage = "Erreur de connexion";
    
    if (error.message.includes("Cannot read properties of undefined")) {
      errorMessage = "Problème avec la réponse du serveur";
    } else if (error.response) {
      // Gestion des erreurs HTTP structurées
      errorMessage = error.response.data?.message || 
                    error.response.statusText || 
                    `Erreur ${error.response.status}`;
    }

    errorMesage.value = errorMessage;
    toast.error(errorMessage);
  }
};

// Gestion de la saisie
const handleComplete = (value) => {
  verificationCode.value = value.join("");
};
</script>

<template>
  <Card class="mx-auto max-w-8xl md:w-1/3 lg:w-1/3 bg-slate-900">
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    <div v-if="errorMesage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ errorMesage }}
    </div>
    <CardHeader class="-mb-10">
      <CardTitle class="text-2xl text-center font-bold text-gold">
        Connectez-vous
      </CardTitle>
      <CardDescription class="text-center text-white">
        Saisir votre numéro de téléphone
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="sendCode">
        <div class="grid gap-4 mt-10">
          <div class="grid gap-1">
            <div class="flex mb-1">
              <Input class="w-full py-5 rounded-md text-white focus:border-gold focus:bg-black" id="tel"
                v-model="phoneNumber" type="phone" placeholder="+237 671657197" required />
            </div>
            <div id="recaptcha-container"></div>
          </div>
          <Button class="w-full bg-gold" :disabled="sending">
            <span class="flex items-center" v-if="sending">
              <div
                class="animate-spin ease-linear rounded-full w-5 h-5 border-t-2 border-b-2 border-white mr-3 text-black">
              </div>
              Patienter svp...
            </span>
            <span class="cursor-pointer text-black" v-else>Vérifier</span>
          </Button>
        </div>
      </form>

      <div class="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
        <span class="flex items-center text-blue-600 font-semibold text-sm">
          <ArrowLeft class="mr-1" />
          <NuxtLink to="/" class="text-sm text-gold">Accueil</NuxtLink>
        </span>
        <p class="text-sm text-white">
          Vous n'avez pas de compte ?
          <NuxtLink href="/auth/register" class="underline text-gold font-semibold">
            Créer un compte
          </NuxtLink>
        </p>
      </div>
    </CardContent>
  </Card>

  <!-- Modal animé -->
  <Transition name="slide-down">
    <form action="" @submit.prevent="verify">
      <div v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md modal-content">
          <div class="p-4 sm:p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Confirmation d'inscription
            </h3>
            <p class="text-gray-600 mb-6 text-sm">
              Un code de vérification a été envoyé au:
              <span class="font-bold">{{ phoneNumber }}. </span>Veuillez entrer
              ce code pour compléter votre inscription.
            </p>

            <div class="w-full">
              <PinInput required id="pin-input" v-model="pinInputArray" placeholder="○" @complete="handleComplete">
                <PinInputGroup class="flex justify-between gap-2 sm:gap-3">
                  <template v-for="(id, index) in 6" :key="id">
                    <PinInputInput
                      class="text-center text-xl rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      :index="index" />
                  </template>
                </PinInputGroup>
              </PinInput>
            </div>

            <div class="flex flex-col-reverse sm:flex-row sm:justify-between items-center mt-6 gap-3">
              <div class="text-sm sm:text-base">
                Vous n'avez rien reçu?
                <span @click="sendCode" class="text-blue-600 cursor-pointer hover:text-blue-800">Renvoyer le code</span>
              </div>

              <div class="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" @click="showModal = false" class="w-full sm:w-auto">
                  Fermer
                </Button>
                <Button type="submit" :disabled="verifying" class="w-full sm:w-auto">
                  <span class="flex items-center justify-center" v-if="verifying">
                    <div class="animate-spin ease-linear rounded-full w-5 h-5 border-t-2 border-b-2 border-white mr-3">
                    </div>
                    Vérification...
                  </span>
                  <span v-else>Vérifier</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </Transition>
</template>

<style scoped>
/* Animation douce pour le switch */
.switch-transition {
  transition: all 0.4s ease-out;
}

/* Animation d'entrée améliorée avec effet de ralentissement */
.slide-down-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Animation de sortie */
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

/* Animation spécifique pour le contenu du modal */
.slide-down-enter-active .modal-content,
.slide-down-leave-active .modal-content {
  transition: all 0.4s ease-out;
}

.slide-down-enter-from .modal-content,
.slide-down-leave-to .modal-content {
  transform: translateY(-20px);
  opacity: 0;
}

/* Style pour les inputs de code */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
