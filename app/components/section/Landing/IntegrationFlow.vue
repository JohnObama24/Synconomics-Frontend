<template>
  <!-- Integration Flow -->
  <section class="py-32 bg-syn-darker relative">
      <div class="max-w-5xl mx-auto px-6">
          <div class="text-center mb-20">
              <h2 class="font-display text-3xl md:text-5xl mb-4">Alur Ekosistem</h2>
              <p class="text-syn-muted">Dari ide hingga komunitas yang terhubung</p>
          </div>

          <div class="relative">
              <!-- Connecting Line -->
              <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-syn-accent via-syn-gold to-syn-accent/30 md:-translate-x-1/2"></div>

              <!-- Steps -->
              <div class="space-y-24">
                  <!-- Step 1 -->
                  <div class="relative flex flex-col md:flex-row items-center gap-8">
                      <div class="md:w-1/2 md:text-right md:pr-12 order-2 md:order-1">
                          <h3 class="font-display text-2xl mb-2 text-syn-accent">Discovery</h3>
                          <p class="text-syn-muted">Brainstorming dengan AI untuk menemukan niche bisnis yang cocok dengan skill dan pasar lokal</p>
                      </div>
                      <div class="w-16 h-16 rounded-full bg-syn-dark border-2 border-syn-accent flex items-center justify-center relative z-10 order-1 md:order-2 shadow-[0_0_30px_rgba(196,167,125,0.3)]">
                          <span class="font-display text-xl text-syn-accent">01</span>
                      </div>
                      <div class="md:w-1/2 md:pl-12 order-3">
                          <div class="glass-card p-4 rounded-xl inline-block">
                              <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-syn-accent/20 flex items-center justify-center">
                                      <svg class="w-4 h-4 text-syn-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                  </div>
                                  <span class="text-sm font-display">AI Ideation</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Step 2 -->
                  <div class="relative flex flex-col md:flex-row items-center gap-8">
                      <div class="md:w-1/2 md:text-right md:pr-12 order-2 md:order-1">
                          <div class="glass-card p-4 rounded-xl inline-block">
                              <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-syn-gold/20 flex items-center justify-center">
                                      <svg class="w-4 h-4 text-syn-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                  </div>
                                  <span class="text-sm font-display">Smart ERP</span>
                              </div>
                          </div>
                      </div>
                      <div class="w-16 h-16 rounded-full bg-syn-dark border-2 border-syn-gold flex items-center justify-center relative z-10 order-1 md:order-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                          <span class="font-display text-xl text-syn-gold">02</span>
                      </div>
                      <div class="md:w-1/2 md:pl-12 order-3">
                          <h3 class="font-display text-2xl mb-2 text-syn-gold">Validation</h3>
                          <p class="text-syn-muted">Analisis finansial dan market validation untuk memastikan ide bisnis feasible</p>
                      </div>
                  </div>

                  <!-- Step 3 -->
                  <div class="relative flex flex-col md:flex-row items-center gap-8">
                      <div class="md:w-1/2 md:text-right md:pr-12 order-2 md:order-1">
                          <h3 class="font-display text-2xl mb-2 text-purple-400">Operation</h3>
                          <p class="text-syn-muted">Manajemen inventory, keuangan, dan operasional dengan dashboard terintegrasi</p>
                      </div>
                      <div class="w-16 h-16 rounded-full bg-syn-dark border-2 border-purple-400 flex items-center justify-center relative z-10 order-1 md:order-2 shadow-[0_0_30px_rgba(192,132,252,0.3)]">
                          <span class="font-display text-xl text-purple-400">03</span>
                      </div>
                      <div class="md:w-1/2 md:pl-12 order-3">
                          <div class="glass-card p-4 rounded-xl inline-block">
                              <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center">
                                      <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                  </div>
                                  <span class="text-sm font-display">Management</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Step 4 -->
                  <div class="relative flex flex-col md:flex-row items-center gap-8">
                      <div class="md:w-1/2 md:text-right md:pr-12 order-2 md:order-1">
                          <div class="glass-card p-4 rounded-xl inline-block">
                              <div class="flex items-center gap-3">
                                  <div class="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                                      <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                  </div>
                                  <span class="text-sm font-display">Network</span>
                              </div>
                          </div>
                      </div>
                      <div class="w-16 h-16 rounded-full bg-syn-dark border-2 border-green-400 flex items-center justify-center relative z-10 order-1 md:order-2 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                          <span class="font-display text-xl text-green-400">04</span>
                      </div>
                      <div class="md:w-1/2 md:pl-12 order-3">
                          <h3 class="font-display text-2xl mb-2 text-green-400">Connection</h3>
                          <p class="text-syn-muted">Terhubung dengan ekosistem bisnis lokal untuk supply chain dan kolaborasi</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script setup lang="ts">
</script>
