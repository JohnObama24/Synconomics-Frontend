<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="glass-card max-w-lg w-full p-8 rounded-3xl relative">
      <button @click="$emit('close')" class="absolute top-6 right-6 text-syn-muted hover:text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <h2 class="font-display text-2xl mb-6 text-white tracking-tight">
        Buat Supply Match
      </h2>

      <p class="text-syn-muted text-sm mb-6">
        Hubungkan Supply Request dengan Supply Offer yang cocok untuk membuat deal.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Supply Request Selection -->
        <div>
          <label class="block text-sm text-syn-muted mb-2 font-medium">Supply Request</label>
          <select 
            v-model.number="form.supply_request_id" 
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-syn-accent outline-none text-white transition-colors appearance-none"
          >
            <option value="" disabled class="bg-syn-darker">Pilih Request...</option>
            <option 
              v-for="req in availableRequests" 
              :key="req.id" 
              :value="req.id"
              class="bg-syn-darker"
            >
              {{ req.product_name }} (qty: {{ req.quantity }}) — #{{ req.id }}
            </option>
          </select>
        </div>

        <!-- Supply Offer Selection -->
        <div>
          <label class="block text-sm text-syn-muted mb-2 font-medium">Supply Offer</label>
          <select 
            v-model.number="form.supply_offer_id" 
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-syn-accent outline-none text-white transition-colors appearance-none"
          >
            <option value="" disabled class="bg-syn-darker">Pilih Offer...</option>
            <option 
              v-for="offer in availableOffers" 
              :key="offer.id" 
              :value="offer.id"
              class="bg-syn-darker"
            >
              {{ offer.product_name }} (qty: {{ offer.quantity }}) — #{{ offer.id }}
            </option>
          </select>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" class="text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting || !form.supply_request_id || !form.supply_offer_id"
          class="w-full py-4 mt-6 bg-blue-500 text-white rounded-xl font-display font-medium hover:bg-blue-400 transition-colors disabled:opacity-50"
        >
          {{ isSubmitting ? 'Memproses...' : 'Buat Match' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SupplyRequest, SupplyOffer } from '~/types/supply.types';

const props = defineProps<{
  availableRequests: SupplyRequest[];
  availableOffers: SupplyOffer[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const { createSupplyMatch } = useSupplyNetwork();

const isSubmitting = ref(false);
const errorMsg = ref('');

const form = ref({
  supply_request_id: '' as unknown as number,
  supply_offer_id: '' as unknown as number
});

const handleSubmit = async () => {
  if (!form.value.supply_request_id || !form.value.supply_offer_id) return;

  isSubmitting.value = true;
  errorMsg.value = '';
  try {
    const success = await createSupplyMatch({
      supply_request_id: form.value.supply_request_id,
      supply_offer_id: form.value.supply_offer_id
    });
    
    if (success) {
      emit('saved');
    } else {
      errorMsg.value = 'Gagal membuat supply match.';
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Terjadi kesalahan.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
