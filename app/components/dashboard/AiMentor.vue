<template>
  <div class="flex flex-col h-full text-left">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-syn-cream flex items-center gap-2">
        Saran Mentor AI
      </h2>
      <Icon name="heroicons:sparkles" class="w-5 h-5 text-syn-accent" />
    </div>

    <div class="bg-syn-dark border border-syn-border rounded-2xl flex-1 flex flex-col relative overflow-hidden group hover:border-syn-accent/20 transition-colors glow-border">
      <div class="absolute top-0 right-0 w-32 h-32 bg-syn-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div v-if="isLoading" class="p-6 flex-1 flex items-center justify-center text-syn-muted">
        Membuat saran AI...
      </div>
      <div v-else-if="sessionResult && sessionResult.resume" class="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
        <!-- Advice Item -->
        <div>
          <p class="text-[10px] font-bold text-syn-gold tracking-wider uppercase mb-1.5">Ringkasan AI</p>
          <h3 class="text-syn-cream font-semibold text-[15px] mb-2 leading-snug">Analisis Bisnis Komprehensif</h3>
          <p class="text-sm text-syn-muted leading-relaxed">
            {{ sessionResult.resume }}
          </p>
        </div>
      </div>
      <div v-else class="p-6 flex-1 flex flex-col items-center justify-center text-syn-muted text-center px-4 space-y-4">
        <Icon name="heroicons:light-bulb" class="w-8 h-8 text-syn-accent/20" />
        <p class="text-sm">Gunakan AI Audit untuk mendapatkan analisis mendalam tentang performa bisnis Anda secara otomatis.</p>
      </div>

      <div class="p-4 border-t border-syn-border bg-syn-darker/50 backdrop-blur-sm mt-auto">
        <NuxtLink 
          :to="businessId ? `/dashboard/audit/${businessId}` : '#'" 
          class="w-full bg-syn-accent hover:bg-syn-gold text-syn-darker font-bold text-sm py-2.5 rounded-xl transition-all shadow-sm inline-flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': !businessId }"
        >
          <Icon name="heroicons:document-magnifying-glass" class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          Buat Audit Lengkap
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAI } from '~/composables/useAI';

const props = defineProps<{
  businessId: number | null;
}>();

const { isLoading, sessionResult, initSession, closeAndGetResult } = useAI();

const generateAdvice = async () => {
  if (!props.businessId || sessionResult.value) return;
  
  // Initial summary sequence (if not already fetched)
  await initSession(props.businessId, 'strategy');
  if (useAI().currentSessionId.value) {
    await closeAndGetResult();
  }
};

onMounted(() => {
  if (props.businessId) {
    generateAdvice();
  }
});

watch(() => props.businessId, (newId) => {
  if (newId) {
    generateAdvice();
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(196, 167, 125, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(196, 167, 125, 0.4);
}
</style>
