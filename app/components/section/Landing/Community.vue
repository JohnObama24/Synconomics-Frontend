<template>
  <!-- Community & Supply Chain -->
  <section id="community" class="py-32 relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-syn-dark via-syn-darker to-syn-dark"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid md:grid-cols-2 gap-16 items-center">
              <div class="relative">
                  <div class="aspect-square relative">
                      <!-- Map Visualization -->
                      <div class="absolute inset-0 glass-card rounded-3xl overflow-hidden">
                          <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,167,125,0.1)_0%,transparent_70%)]"></div>
                          
                          <!-- Map Grid -->
                          <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(196,167,125,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,167,125,0.3) 1px, transparent 1px); background-size: 40px 40px;"></div>
                          
                          <!-- User Points -->
                          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                              <div class="w-4 h-4 bg-syn-accent rounded-full animate-pulse relative">
                                  <div class="absolute inset-0 bg-syn-accent rounded-full animate-ping"></div>
                              </div>
                              <div class="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-display">You</div>
                          </div>
                          
                          <div class="absolute top-1/3 left-1/3">
                              <div class="w-3 h-3 bg-syn-gold rounded-full"></div>
                              <div class="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-syn-gold">Toko A</div>
                          </div>
                          
                          <div class="absolute bottom-1/3 right-1/3">
                              <div class="w-3 h-3 bg-purple-400 rounded-full"></div>
                              <div class="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-purple-400">Supplier B</div>
                          </div>
                          
                          <div class="absolute top-20 right-20">
                              <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                              <div class="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-green-400">UMKM C</div>
                          </div>

                          <!-- Connection Lines -->
                          <svg class="absolute inset-0 w-full h-full pointer-events-none">
                              <line x1="50%" y1="50%" x2="33%" y2="33%" stroke="rgba(196,167,125,0.3)" stroke-width="1" stroke-dasharray="4"/>
                              <line x1="50%" y1="50%" x2="66%" y2="66%" stroke="rgba(196,167,125,0.3)" stroke-width="1" stroke-dasharray="4"/>
                              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(196,167,125,0.2)" stroke-width="1" stroke-dasharray="4"/>
                          </svg>

                          <!-- Radius Circle -->
                          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-syn-accent/20 rounded-full"></div>
                          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-syn-accent/10 rounded-full"></div>
                      </div>
                  </div>
                  
                  <!-- Floating Badge -->
                  <div class="absolute -bottom-6 -right-6 glass-card p-4 rounded-2xl border border-syn-accent/30">
                      <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-full bg-syn-accent/20 flex items-center justify-center">
                              <svg class="w-5 h-5 text-syn-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          </div>
                          <div>
                              <div class="text-xs text-syn-muted">Radius Aktif</div>
                              <div class="font-display text-lg">2.4 km</div>
                          </div>
                      </div>
                  </div>
              </div>

              <div>
                  <div class="inline-block mb-4 px-3 py-1 rounded-full border border-syn-gold/30 text-syn-gold text-xs tracking-widest uppercase">
                      Local Ecosystem
                  </div>
                  <h2 class="font-display text-4xl md:text-5xl mb-6 leading-tight">
                      Ekonomi <span class="text-syn-gold italic font-serif">Hyperlocal</span>
                  </h2>
                  <p class="text-syn-cream/60 text-lg mb-8 leading-relaxed">
                      Temukan supply dan demand dalam radius 1-5 kilometer. Sistem kami menghubungkan 
                      kebutuhan bisnis-mu dengan inventory tetangga. Stok habis? Cari di sekitar. 
                      Kebutuhan mendesak? Temukan supplier terdekat.
                  </p>

                  <div class="space-y-6">
                      <div class="flex gap-4 items-start">
                          <div class="w-8 h-8 rounded-full bg-syn-gold/10 flex items-center justify-center shrink-0 mt-1">
                              <span class="text-syn-gold text-sm font-bold">1</span>
                          </div>
                          <div>
                              <h4 class="font-display text-lg mb-1">Smart Inventory Matching</h4>
                              <p class="text-sm text-syn-muted">AI mendeteksi kebutuhan stok dan mencari supplier dalam radius yang bisa diatur</p>
                          </div>
                      </div>
                      
                      <div class="flex gap-4 items-start">
                          <div class="w-8 h-8 rounded-full bg-syn-gold/10 flex items-center justify-center shrink-0 mt-1">
                              <span class="text-syn-gold text-sm font-bold">2</span>
                          </div>
                          <div>
                              <h4 class="font-display text-lg mb-1">Resale Opportunity</h4>
                              <p class="text-sm text-syn-muted">Jemput barang dari supplier dekat dan resale ke customer-mu dengan margin yang transparan</p>
                          </div>
                      </div>
                      
                      <div class="flex gap-4 items-start">
                          <div class="w-8 h-8 rounded-full bg-syn-gold/10 flex items-center justify-center shrink-0 mt-1">
                              <span class="text-syn-gold text-sm font-bold">3</span>
                          </div>
                          <div>
                              <h4 class="font-display text-lg mb-1">Community Chat</h4>
                              <p class="text-sm text-syn-muted">Komunikasi real-time dengan bisnis lokal untuk kolaborasi dan support</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script setup lang="ts">
</script>
