<template>
  <div class="relative">
    <!-- Grain Overlay -->
    <div class="grain-overlay"></div>
    
    <!-- Cursor Glow -->
    <div class="cursor-glow" id="cursorGlow"></div>

    <CommonLandingNavigationBar />

    <SectionLandingHero />
    <CommonLandingMarquee />
    <SectionLandingAiMentor />
    <SectionLandingFinancialIntelligence />
    <SectionLandingCommunity />
    <SectionLandingIntegrationFlow />
    <SectionLandingCTA />

    <CommonLandingFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    initAnimations()
  }, 100)
})

function initAnimations() {
  if (typeof (window as any).gsap === 'undefined') return setTimeout(initAnimations, 100);

  const gsap = (window as any).gsap
  const ScrollTrigger = (window as any).ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Cursor Glow Effect
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  };
  document.addEventListener('mousemove', handleMouseMove);

  function animateCursor() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      if (cursorGlow) {
          cursorGlow.style.left = currentX + 'px';
          cursorGlow.style.top = currentY + 'px';
      }
      requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach((btn: any) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
      });
  });

  // Generic Glass Cards Animation (exclude specifically animated timelines)
  gsap.utils.toArray('.glass-card:not(.finance-card):not(.dashboard-wrapper)').forEach((card: any) => {
      gsap.from(card, {
          scrollTrigger: {
              trigger: card,
              start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
      });
  });

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (href) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
      });
  });

  // Text Scramble Effect on Hover for Headers
  class TextScramble {
      el: HTMLElement;
      chars: string;
      queue: any[];
      frame: number;
      frameRequest: number;
      resolve: any;

      constructor(el: HTMLElement) {
          this.el = el;
          this.chars = '!<>-_\\/[]{}\u2014=+*^?#________';
          this.queue = [];
          this.frame = 0;
          this.frameRequest = 0;
          this.update = this.update.bind(this);
      }
      
      setText(newText: string) {
          const oldText = this.el.innerText;
          const length = Math.max(oldText.length, newText.length);
          const promise = new Promise((resolve) => this.resolve = resolve);
          this.queue = [];
          for (let i = 0; i < length; i++) {
              const from = oldText[i] || '';
              const to = newText[i] || '';
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              this.queue.push({ from, to, start, end, char: '' });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
      }
      
      update() {
          let output = '';
          let complete = 0;
          for (let i = 0, n = this.queue.length; i < n; i++) {
              let { from, to, start, end, char } = this.queue[i];
              if (this.frame >= end) {
                  complete++;
                  output += to;
              } else if (this.frame >= start) {
                  if (!char || Math.random() < 0.28) {
                      char = this.randomChar();
                      this.queue[i].char = char;
                  }
                  output += `<span class="text-syn-accent">${char}</span>`;
              } else {
                  output += from;
              }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
              if (this.resolve) this.resolve();
          } else {
              this.frameRequest = requestAnimationFrame(this.update);
              this.frame++;
          }
      }
      
      randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
  }

  // Initialize scramble on hover for specific elements
  document.querySelectorAll('h2').forEach(el => {
      const element = el as HTMLElement;
      const fx = new TextScramble(element);
      const originalText = element.innerText;
      
      element.addEventListener('mouseenter', () => {
          fx.setText(originalText);
      });
  });
}
</script>