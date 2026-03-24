<template>
  <div class="space-y-8">
    <!-- Headernya biar ga lupa -->
    <div class="flex justify-between items-center bg-syn-darker border border-white/5 p-6 rounded-3xl relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-r from-syn-accent/5 to-transparent pointer-events-none"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-serif text-white mb-2 tracking-tight">Financial management</h1>
        <p class="text-syn-muted text-[15px]">Monitor the financial health of your core business.</p>
      </div>
      <div class="relative z-10 hidden sm:block">
        <button 
          @click="showModal = true"
          v-if="activeBusinessId"
          class="px-5 py-3 bg-syn-accent/10 text-syn-accent border border-syn-accent/20 rounded-xl font-medium hover:bg-syn-accent hover:text-syn-dark transition-all flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Record Transactions
        </button>
      </div>
    </div>

    <!-- ini alert -->
    <div v-if="!activeBusinessId && !businessesLoading" class="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <span class="text-red-400 font-medium">You haven't registered your business yet. Please create a business profile first.</span>
      </div>
    </div>

    <!-- stats ny biar ga lupa -->
    <div v-if="activeBusinessId" class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <DashboardStatCard 
        title="Total Income" 
        :value="formatCurrency(totalRevenue)" 
        :trend="0"
        icon="heroicons:arrow-trending-up"
        iconColor="success"
      />
      <DashboardStatCard 
        title="Total Expenditures" 
        :value="formatCurrency(totalCost)" 
        :trend="0"
        icon="heroicons:arrow-trending-down"
        iconColor="danger"
      />
      <DashboardStatCard 
        title="Net profit" 
        :value="formatCurrency(netProfit)" 
        :trend="0"
        icon="heroicons:banknotes"
        iconColor="accent"
      />
    </div>

    <!-- history transkassi biar ga lupa -->
    <div v-if="activeBusinessId" class="glass-card rounded-3xl overflow-hidden border border-white/5">
      <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
        <h2 class="font-display text-xl text-white">Transaction History</h2>
        <button 
          @click="showModal = true"
          class="sm:hidden p-2 bg-syn-accent/10 text-syn-accent rounded-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
      </div>
      
      <div v-if="expensesLoading" class="p-12 flex justify-center">
        <div class="w-8 h-8 border-4 border-syn-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <div v-else-if="expenses.length === 0" class="p-12 text-center">
        <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-syn-muted">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
        </div>
        <p class="text-syn-muted mb-2">No transactions yet</p>
        <button @click="showModal = true" class="text-sm font-medium text-syn-accent hover:text-white transition-colors">
          Record your first transaction
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-xs uppercase text-syn-muted bg-white/2 border-b border-white/5 tracking-wider">
              <th class="px-6 py-4 font-medium">Date</th>
              <th class="px-6 py-4 font-medium">Title</th>
              <th class="px-6 py-4 font-medium">Type</th>
              <th class="px-6 py-4 font-medium text-right">Amount</th>
              <th class="px-6 py-4 font-medium w-16">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedExpenses" :key="item.id" class="border-b border-white/5 hover:bg-white/2 transition-colors group">
              <td class="px-6 py-4 text-sm text-syn-cream/80">
                {{ formatDate(item.expense_date) }}
              </td>
              <td class="px-6 py-4 text-sm text-white font-medium">
                {{ item.title }}
              </td>
              <td class="px-6 py-4">
                <span 
                  :class="['px-2.5 py-1 text-xs rounded-full font-medium border', 
                    item.category === 'revenue' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20']"
                >
                  {{ item.category === 'revenue' ? 'Income' : 'Expenditure' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-right font-medium" :class="item.category === 'revenue' ? 'text-green-400' : 'text-red-400'">
                {{ item.category === 'revenue' ? '+' : '-' }} {{ formatCurrency(item.amount) }}
              </td>
              <td class="px-6 py-4">
                <button @click="handleDelete(item.id)" class="p-2 text-syn-muted hover:text-red-400 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all focus:opacity-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <DashboardExpenseFormModal 
      v-if="showModal" 
      :business-id="activeBusinessId" 
      @close="showModal = false"
      @saved="onExpenseSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

definePageMeta({
  layout: 'dashboard'
});

const { businesses, isLoading: businessesLoading, fetchBusinesses } = useBusiness();
const { expenses, isLoading: expensesLoading, fetchExpenses, deleteExpense } = useExpense();

const showModal = ref(false);

const activeBusinessId = computed(() => {
  return businesses.value[0]?.id ?? 0;
});

onMounted(async () => {
  await fetchBusinesses();
  if (activeBusinessId.value) {
    await fetchExpenses(activeBusinessId.value);
  }
});

const totalRevenue = computed(() => {
  return expenses.value
    .filter(e => e.category === 'revenue')
    .reduce((sum, e) => sum + Number(e.amount), 0);
});

const totalCost = computed(() => {
  return expenses.value
    .filter(e => e.category === 'cost' || e.category === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0);
});

const netProfit = computed(() => {
  return totalRevenue.value - totalCost.value;
});

const sortedExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => {
    return new Date(b.expense_date).getTime() - new Date(a.expense_date).getTime();
  });
});

const onExpenseSaved = async () => {
  showModal.value = false;
  if (activeBusinessId.value) {
    await fetchExpenses(activeBusinessId.value);
  }
};

const handleDelete = async (id: number) => {
  if (confirm('Anda yakin ingin menghapus transaksi ini?')) {
    await deleteExpense(id);
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};
</script>
