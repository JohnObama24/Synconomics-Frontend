<template>
  <div class="space-y-8 pb-20">
    <div>
      <h1 class="text-3xl font-serif text-syn-cream mb-2 tracking-tight">Sentra Audit AI</h1>
      <p class="text-syn-muted text-[15px]">Lihat dan buat audit mendalam untuk semua bisnis yang Anda kelola.</p>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="h-52 bg-syn-dark border border-syn-border rounded-3xl animate-pulse"></div>
    </div>
    
    <div v-else-if="businesses.length === 0" class="p-12 bg-syn-dark border border-syn-border rounded-3xl text-center border-dashed">
      <div class="w-16 h-16 bg-syn-surface rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="heroicons:building-storefront" class="w-8 h-8 text-syn-muted" />
      </div>
      <p class="text-syn-cream font-medium">Belum ada bisnis terdaftar.</p>
      <p class="text-syn-muted text-sm mb-6">Daftarkan bisnis Anda terlebih dahulu untuk memulai audit AI.</p>
      <NuxtLink to="/dashboard/business" class="px-6 py-2 bg-syn-accent text-syn-dark font-bold rounded-xl hover:bg-syn-gold transition-colors">
        Kelola Bisnis
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="business in businesses" 
        :key="business.id"
        class="bg-syn-dark border border-syn-border rounded-3xl p-6 flex flex-col hover:border-syn-accent/30 transition-all glass-card group relative"
      >
        <div class="absolute top-0 right-0 w-24 h-24 bg-syn-accent/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div class="flex items-start justify-between mb-6">
          <div class="w-12 h-12 rounded-2xl bg-syn-accent/10 border border-syn-accent/20 flex items-center justify-center group-hover:bg-syn-accent/20 transition-colors">
            <Icon name="heroicons:building-storefront" class="w-6 h-6 text-syn-accent" />
          </div>
          <div class="text-right">
            <p class="text-[10px] font-bold text-syn-muted uppercase tracking-widest mb-1">Terakhir Audit</p>
            <p class="text-xs font-semibold text-syn-gold">
               {{ getDaysAgo(business.id) }}
            </p>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-syn-cream mb-2 group-hover:text-syn-gold transition-colors">{{ business.name }}</h3>
        <p class="text-syn-muted text-sm mb-8 line-clamp-2 leading-relaxed">{{ business.description || 'Bisnis siap untuk di audit secara mendalam oleh AI Synconomics.' }}</p>

        <NuxtLink 
          :to="`/dashboard/audit/${business.id}`"
          class="mt-auto w-full py-3 bg-syn-surface border border-syn-border rounded-xl text-syn-cream font-bold text-sm flex items-center justify-center gap-2 hover:bg-syn-accent hover:text-syn-dark hover:border-syn-accent transition-all group/btn shadow-sm"
        >
          <Icon name="heroicons:document-magnifying-glass" class="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          Buat Audit Lengkap
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBusiness } from '~/composables/useBusiness';
import { onMounted } from 'vue';

definePageMeta({
  layout: 'dashboard'
});

const { businesses, isLoading, fetchBusinesses } = useBusiness();

const getDaysAgo = (businessId: number) => {
  if (!import.meta.client) return 'Belum Pernah';
  const lastAudit = localStorage.getItem(`syn_last_audit_${businessId}`);
  if (!lastAudit) return 'Belum Pernah';
  
  const lastDate = new Date(lastAudit);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hari Ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays > 30) return '> 30 Hari';
  return `${diffDays} Hari Lalu`;
};

onMounted(() => {
  fetchBusinesses();
});
</script>
