<template>
<div class="crt-bg min-h-screen">
  <div class="crt-pc-frame">
    <div class="crt-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div class="crt-game-header text-center z-10">
        <span class="crt-mini-icon">📝</span>
        <div class="crt-ready-text">プレイヤー名を入力してください</div>
      </div>
      <form class="w-full max-w-xs flex flex-col gap-4 z-10" @submit.prevent="startGame">
        <label class="crt-label" for="playerName">プレイヤー名</label>
        <input
          id="playerName"
          v-model="playerName"
          class="crt-input"
          placeholder="プレイヤー名を入力"
          autocomplete="off"
        />
        <div v-if="error" class="crt-error">{{ error }}</div>
        <div class="flex gap-2 pt-2">
          <button type="button" class="crt-btn" @click="goBack">戻る</button>
          <button type="submit" class="crt-btn crt-btn-main" :disabled="!playerName.trim()">ゲーム開始</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
const router = useRouter()
const playerName = ref('')
const error = ref('')

const goBack = () => {
  router.push('/')
}

const startGame = () => {
  if (!playerName.value.trim()) {
    error.value = 'プレイヤー名を入力してください'
    return
  }
  error.value = ''
  localStorage.setItem('playerName', playerName.value.trim())
  router.push('/game')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
.crt-bg {
  min-height: 100vh;
  width: 100vw;
  background: url('../public/Gemini_Generated_Image_88gx288gx288gx28.png') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.crt-pc-frame {
  position: absolute;
  top: 15%;
  left: 26%;
  width: 48vw;
  height: 57vh;
  min-width: 340px;
  min-height: 420px;
  max-width: 900px;
  max-height: 700px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  pointer-events: none;
}
.crt-card {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  min-width: 320px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1.2% 2% 1.2% 2%;
  box-sizing: border-box;
  pointer-events: auto;
  background: rgba(20,32,20,0.92);
  border-radius: 18px;
  box-shadow: 0 0 0 2px #0f0, 0 0 24px 2px #0f08, 0 0 80px 0 #0f04;
  border: 2px solid #0f0;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  color: #b6ffb6;
  text-shadow: 0 0 2px #0f0, 0 0 8px #0f08;
  filter: contrast(1.1) brightness(1.1);
  position: relative;
}
.crt-game-header {
  margin-bottom: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.crt-mini-icon {
  font-size: 2.2rem;
  margin-bottom: 0.2em;
  filter: drop-shadow(0 0 6px #0f0);
}
.crt-ready-text {
  font-size: 1.2rem;
  color: #7fff7f;
  font-weight: bold;
  letter-spacing: 0.08em;
  margin-bottom: 0.2em;
  text-shadow: 0 0 8px #0f0, 0 0 16px #0f08;
}
.crt-label {
  color: #7fff7f;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 0.2em;
}
.crt-input {
  width: 100%;
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 2px solid #0f0;
  background: #111;
  color: #b6ffb6;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  box-shadow: 0 0 8px #0f0a, 0 0 32px #0f08;
  margin-bottom: 0.2em;
  transition: border 0.2s, box-shadow 0.2s;
}
.crt-input:focus {
  border-color: #7fff7f;
  box-shadow: 0 0 16px #0f0, 0 0 48px #0f08;
}
.crt-error {
  color: #ff6;
  font-size: 0.95rem;
  margin-bottom: 0.2em;
}
.crt-btn {
  background: #111;
  color: #0f0;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  font-size: 1.1rem;
  border: 2px solid #0f0;
  border-radius: 6px;
  box-shadow: 0 0 8px #0f0a, 0 0 32px #0f08;
  padding: 0.7em 1.8em;
  font-weight: bold;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 1;
}
.crt-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.crt-btn-main {
  background: #111;
  color: #0f0;
  border: 2.5px solid #0f0;
  border-radius: 8px;
  box-shadow: 0 0 12px #0f0a, 0 0 32px #0f08;
}
.crt-btn-main:hover {
  background: #222;
  color: #b6ffb6;
  box-shadow: 0 0 24px #0f0, 0 0 64px #0f08;
}
.crt-bg:after {
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0px,
    rgba(0,0,0,0.08) 1px,
    transparent 1px,
    transparent 4px
  );
  z-index: 2;
}
.crt-card:after {
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,255,0,0.04) 0px,
    rgba(0,255,0,0.04) 1px,
    transparent 1px,
    transparent 4px
  );
  z-index: 2;
}
</style>