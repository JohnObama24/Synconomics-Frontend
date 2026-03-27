<template>
  <div class="space-y-4">
    <!-- Header with Match button -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-display text-xl text-white">Supply Matches</h3>
        <p class="text-syn-muted text-sm mt-1">Deal antara request & offer supply</p>
      </div>
      <button 
        @click="$emit('create')"
        class="px-5 py-2.5 bg-blue-500 text-white rounded-xl font-medium text-sm hover:bg-blue-400 transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
        Buat Match
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!matches || matches.length === 0" class="glass-card rounded-2xl border border-white/5 p-8 text-center">
      <div class="text-4xl mb-3">🤝</div>
      <p class="text-syn-muted text-sm">Belum ada supply match. Hubungkan request dengan offer untuk membuat deal!</p>
    </div>

    <!-- List -->
    <div v-else class="space-y-3">
      <div 
        v-for="match in matches" 
        :key="match.id" 
        class="glass-card rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-3">
              <span class="font-display text-lg text-white">Match #{{ match.id }}</span>
              <span :class="matchStatusClass(match.status)" class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {{ match.status }}
              </span>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Request Info -->
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="text-[10px] text-syn-muted uppercase tracking-wider mb-1 font-bold">Request By</div>
                <div class="text-sm text-white">{{ getRequesterName(match.supply_request_id) }}</div>
                <div class="text-[10px] text-syn-muted mt-1">#{{ match.supply_request_id }}</div>
              </div>
              <!-- Offer Info -->
              <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                <div class="text-[10px] text-syn-muted uppercase tracking-wider mb-1 font-bold">Offer By</div>
                <div class="text-sm text-white">{{ getOffererName(match.supply_offer_id) }}</div>
                <div class="text-[10px] text-syn-muted mt-1">#{{ match.supply_offer_id }}</div>
              </div>
            </div>

            <div class="flex items-center gap-4 text-sm text-syn-muted mt-3">
              <span class="flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {{ formatDate(match.created_at) }}
              </span>
            </div>
          </div>

          <!-- Status Actions -->
          <div class="flex flex-col gap-2 shrink-0">
            <button 
              v-if="match.status === 'pending'"
              @click="$emit('accept', match.id)" 
              class="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors text-xs font-bold uppercase tracking-wider border border-emerald-500/30"
            >
              Accept
            </button>
            <button 
              v-if="match.status === 'pending'"
              @click="$emit('reject', match.id)" 
              class="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-xs font-bold uppercase tracking-wider border border-red-500/30"
            >
              Reject
            </button>
            <button 
              @click="$emit('delete', match.id)" 
              class="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-syn-muted hover:text-red-400 transition-colors" 
              title="Hapus"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SupplyMatch, SupplyMatchStatus, SupplyRequest, SupplyOffer } from '~/types/supply.types';
import type { Business } from '~/types/business.types';

const props = defineProps<{
  matches: SupplyMatch[];
  requests: SupplyRequest[];
  offers: SupplyOffer[];
  businesses: Business[];
  isLoading: boolean;
}>();

defineEmits<{
  (e: 'create'): void;
  (e: 'accept', id: number): void;
  (e: 'reject', id: number): void;
  (e: 'delete', id: number): void;
}>();

const getBusinessName = (id: number) => {
  const biz = props.businesses.find(b => b.id === id);
  return biz ? biz.name : `Business #${id}`;
};

const getRequesterName = (requestId: number) => {
  const req = props.requests.find(r => r.id === requestId);
  return req ? getBusinessName(req.business_id) : 'Unknown';
};

const getOffererName = (offerId: number) => {
  const off = props.offers.find(o => o.id === offerId);
  return off ? getBusinessName(off.business_id) : 'Unknown';
};

const matchStatusClass = (status: SupplyMatchStatus) => {
  switch (status) {
    case 'pending': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    case 'accepted': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    case 'rejected': return 'bg-red-500/20 text-red-400 border border-red-500/30';
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
