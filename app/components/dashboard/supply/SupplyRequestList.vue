<template>
  <div class="space-y-4">
    <!-- Header with Add button -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-display text-xl text-white">Supply Requests</h3>
        <p class="text-syn-muted text-sm mt-1">Permintaan supply dari bisnis Anda</p>
      </div>
      <button 
        @click="$emit('create')"
        class="px-5 py-2.5 bg-syn-accent text-syn-dark rounded-xl font-medium text-sm hover:bg-white transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Buat Request
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-syn-accent border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!requests || requests.length === 0" class="glass-card rounded-2xl border border-white/5 p-8 text-center">
      <div class="text-4xl mb-3">📋</div>
      <p class="text-syn-muted text-sm">Belum ada supply request. Buat request pertama Anda!</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <div 
        v-for="req in requests" 
        :key="req.id" 
        class="glass-card rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all group"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-2">
              <h4 class="font-display text-lg text-white truncate">{{ req.product_name }}</h4>
              <span v-if="getBusinessName(req.business_id)" class="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-syn-muted border border-white/10 uppercase tracking-tight">
                {{ getBusinessName(req.business_id) }}
              </span>
              <span :class="statusBadgeClass(req.status)" class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0">
                {{ req.status }}
              </span>
            </div>
            <div v-if="parseTarget(req.description).target" class="mt-2 flex items-center gap-1.5">
              <span class="text-[10px] font-bold text-syn-accent uppercase tracking-wider bg-syn-accent/10 px-2 py-0.5 rounded-md border border-syn-accent/20">
                Target: {{ parseTarget(req.description).target }}
              </span>
            </div>
            <p v-if="parseTarget(req.description).cleanDescription" class="text-xs text-syn-muted mt-2 italic">
              {{ parseTarget(req.description).cleanDescription }}
            </p>
            <div class="flex items-center gap-4 mt-3 text-sm text-syn-muted">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                Qty: {{ req.quantity }}
              </span>
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ formatDate(req.created_at) }}
              </span>
            </div>
            <p v-if="req.description" class="text-syn-muted text-sm mt-2 line-clamp-2">{{ req.description }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button @click="$emit('edit', req)" class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-syn-muted hover:text-white transition-colors" title="Edit">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button @click="$emit('delete', req.id)" class="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-syn-muted hover:text-red-400 transition-colors" title="Hapus">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SupplyRequest, SupplyRequestStatus } from '~/types/supply.types';
import type { Business } from '~/types/business.types';

const props = defineProps<{
  requests: SupplyRequest[];
  businesses: Business[];
  isLoading: boolean;
}>();

defineEmits<{
  (e: 'create'): void;
  (e: 'edit', req: SupplyRequest): void;
  (e: 'delete', id: number): void;
}>();

const getBusinessName = (id: number) => {
  const b = props.businesses.find(biz => biz.id === id);
  return b ? b.name : `Business #${id}`;
};

const parseTarget = (description: string = '') => {
  const match = description.match(/^\[@(.*?)\]\s*(.*)/);
  if (match) {
    return {
      target: match[1],
      cleanDescription: match[2]
    };
  }
  return {
    target: null,
    cleanDescription: description
  };
};

const statusBadgeClass = (status: SupplyRequestStatus) => {
  switch (status) {
    case 'open': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    case 'matched': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    case 'closed': return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    default: return 'bg-white/10 text-white/60';
  }
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};
</script>
