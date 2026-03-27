<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="glass-card max-w-lg w-full p-8 rounded-3xl relative">
      <button @click="$emit('close')" class="absolute top-6 right-6 text-syn-muted hover:text-white transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <h2 class="font-display text-2xl mb-2 text-white tracking-tight">
        {{ initialData ? 'Edit Supply Request' : 'Buat Supply Request' }}
      </h2>
      <p v-if="targetBusinessName" class="text-syn-accent text-sm mb-6 flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 0 00-2-2H7a2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 0 011-1h2a1 0 011 1v5m-4 0h4"></path></svg>
        Untuk: {{ targetBusinessName }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-sm text-syn-muted mb-2 font-medium">Nama Produk</label>
          <input 
            v-model="form.product_name" 
            placeholder="Misal: Biji Kopi Arabica"
            type="text" 
            required 
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-syn-accent outline-none text-white placeholder-white/20 transition-colors"
          >
        </div>

        <div>
          <label class="block text-sm text-syn-muted mb-2 font-medium">Jumlah</label>
          <input 
            v-model.number="form.quantity" 
            type="number" 
            required 
            min="1"
            placeholder="Kuantitas yang dibutuhkan"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-syn-accent outline-none text-white placeholder-white/20 transition-colors"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-syn-muted mb-2">Deskripsi / Catatan</label>
          <textarea 
            v-model="form.description"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-syn-accent/50 focus:border-syn-accent/50 transition-all placeholder:text-white/20"
            placeholder="Tambahkan catatan atau detail tambahan..."
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm text-syn-muted mb-2 font-medium">Status</label>
          <select 
            v-model="form.status"
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-syn-accent outline-none text-white transition-colors appearance-none"
          >
            <option value="open" class="bg-syn-darker">Open</option>
            <option value="matched" class="bg-syn-darker">Matched</option>
            <option value="closed" class="bg-syn-darker">Closed</option>
          </select>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" class="text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-xl border border-red-400/20">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full py-4 mt-6 bg-syn-accent text-syn-dark rounded-xl font-display font-medium hover:bg-white transition-colors disabled:opacity-50"
        >
          {{ isSubmitting ? 'Menyimpan...' : (initialData ? 'Update Request' : 'Kirim Request') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SupplyRequest, SupplyRequestStatus, CreateSupplyRequestReq } from '~/types/supply.types';

const props = defineProps<{
  businessId: number;
  initialData?: SupplyRequest | null;
  targetBusinessName?: string | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const { createSupplyRequest, updateSupplyRequest } = useSupplyNetwork();

const isSubmitting = ref(false);
const errorMsg = ref('');

const form = ref<CreateSupplyRequestReq>({
  business_id: props.businessId,
  product_name: props.initialData?.product_name || '',
  quantity: props.initialData?.quantity || 1,
  status: props.initialData?.status || 'open',
  description: props.initialData?.description || (props.targetBusinessName ? `[@${props.targetBusinessName}] ` : '')
});

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.value = {
      business_id: props.businessId,
      product_name: newVal.product_name,
      quantity: newVal.quantity,
      status: newVal.status,
      description: props.initialData?.description || (props.targetBusinessName ? `[@${props.targetBusinessName}] ` : '')
    };
  }
}, { immediate: true });

const handleSubmit = async () => {
  if (!form.value.product_name || !form.value.quantity || !props.businessId) return;
  
  isSubmitting.value = true;
  errorMsg.value = '';
  try {
    let success: boolean;
    if (props.initialData?.id) {
      success = await updateSupplyRequest(props.initialData.id, {
        product_name: form.value.product_name,
        quantity: form.value.quantity,
        status: form.value.status
      });
    } else {
      success = await createSupplyRequest({
        business_id: props.businessId,
        product_name: form.value.product_name,
        quantity: form.value.quantity,
        status: form.value.status,
        description: form.value.description
      });
    }
    
    if (success) {
      emit('saved');
    } else {
      errorMsg.value = 'Gagal menyimpan supply request.';
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Terjadi kesalahan.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
