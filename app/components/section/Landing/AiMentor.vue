<template>
  <!-- AI Mentor Section -->
  <section id="ai-mentor" class="py-32 relative">
      <div class="max-w-7xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-16 items-center">
              <div class="order-2 md:order-1">
                  <div class="inline-block mb-4 px-3 py-1 rounded-full border border-syn-accent/30 text-syn-accent text-xs tracking-widest uppercase">
                      AI Business Mentor
                  </div>
                  <h2 class="font-display text-4xl md:text-6xl mb-6 leading-tight">
                      Dari <span class="text-syn-accent italic font-serif">Nol</span> hingga Menemukan Niche
                  </h2>
                  <p class="text-syn-cream/60 text-lg mb-8 leading-relaxed">
                      Belum punya ide bisnis? AI kami akan mengajukan serangkaian pertanyaan mendalam untuk 
                      mengungkap passion, skill, dan opportunity market-mu. Outputnya: niche bisnis yang 
                      personalized dan roadmap konkret.
                  </p>
                  
                  <div class="space-y-4">
                      <div class="flex items-start gap-4 p-4 rounded-xl glass-card glow-border group cursor-pointer">
                          <div class="w-12 h-12 rounded-full bg-syn-accent/10 flex items-center justify-center text-syn-accent group-hover:bg-syn-accent group-hover:text-syn-dark transition-all duration-300">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                          </div>
                          <div>
                              <h3 class="font-display text-lg mb-1">Ideation Engine</h3>
                              <p class="text-sm text-syn-muted">Brainstorming interaktif dengan AI yang memahami konteks lokal</p>
                          </div>
                      </div>
                      
                      <div class="flex items-start gap-4 p-4 rounded-xl glass-card glow-border group cursor-pointer">
                          <div class="w-12 h-12 rounded-full bg-syn-accent/10 flex items-center justify-center text-syn-accent group-hover:bg-syn-accent group-hover:text-syn-dark transition-all duration-300">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                          </div>
                          <div>
                              <h3 class="font-display text-lg mb-1">Market Validator</h3>
                              <p class="text-sm text-syn-muted">Analisis pasar mikro dalam radius komunitas-mu</p>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div class="order-1 md:order-2 relative">
                  <div class="relative aspect-square max-w-md mx-auto">
                      <div class="absolute inset-0 bg-gradient-to-br from-syn-accent/20 to-syn-gold/20 rounded-3xl blur-3xl"></div>
                      <div class="relative glass-card rounded-3xl p-6 h-full flex flex-col justify-between glow-border">
                          <div class="flex items-center gap-3 mb-6">
                              <div class="w-10 h-10 rounded-full bg-syn-accent flex items-center justify-center">
                                  <svg class="w-5 h-5 text-syn-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                              </div>
                              <div>
                                  <div class="font-display text-sm">SynAI Mentor</div>
                                  <div class="text-xs text-syn-accent">Online</div>
                              </div>
                          </div>
                          
                          <div class="space-y-4 flex-1">
                              <div class="bg-white/5 rounded-2xl p-4 rounded-tl-none max-w-[80%]">
                                  <p class="text-sm text-syn-cream/90">Halo! Saya melihat kamu tertarik dengan F&B. Bisa ceritakan skill memasak apa yang kamu kuasai?</p>
                              </div>
                              <div class="bg-syn-accent/20 rounded-2xl p-4 rounded-tr-none ml-auto max-w-[80%] border border-syn-accent/30">
                                  <p class="text-sm text-syn-cream">Saya jago masak makanan tradisional Jawa, tapi bingung cara memasarkannya</p>
                              </div>
                              <div class="bg-white/5 rounded-2xl p-4 rounded-tl-none max-w-[85%]">
                                  <p class="text-sm text-syn-cream/90">Menarik! Berdasarkan lokasi-mu di Solo, ada peluang niche "Catering Authentic Solo Cuisine untuk event korporat". Tertarik eksplorasi lebih?</p>
                              </div>
                          </div>
                          
                          <div class="mt-6 flex gap-2">
                              <input type="text" placeholder="Ketik pesan..." class="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-syn-accent/50">
                              <button class="w-10 h-10 rounded-full bg-syn-accent flex items-center justify-center text-syn-dark">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                              </button>
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
