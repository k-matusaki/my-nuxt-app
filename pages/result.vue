<template>
<div class="crt-bg min-h-screen">
  <div class="crt-pc-frame">
    <div class="crt-card p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div class="crt-game-header text-center z-10">
        <span class="crt-mini-icon">🏁</span>
        <div class="crt-ready-text">結果発表</div>
      </div>
      <div class="w-full max-w-xs flex flex-col gap-4 z-10">
        <div class="crt-terminal mb-2">
          <div><span class="crt-label">プレイヤー名:</span> <span class="crt-value">{{ result.playerName }}</span></div>
          <div><span class="crt-label">WPM:</span> <span class="crt-value">{{ result.wpm }}</span></div>
          <div><span class="crt-label">正確性:</span> <span class="crt-value">{{ result.accuracy }}%</span></div>
          <div><span class="crt-label">入力キー数:</span> <span class="crt-value">{{ result.totalTypedChars }}</span></div>
          <div><span class="crt-label">ミスキー数:</span> <span class="crt-value">{{ result.missTypedChars }}</span></div>
        </div>
        <div class="crt-feedback">
          <template v-if="result.wpm >= 60">
            <span class="crt-feedback-good">素晴らしい！上級エンジニアレベルです 🎉</span>
          </template>
          <template v-else-if="result.wpm >= 40">
            <span class="crt-feedback-mid">Good! 中級エンジニアレベルです 👍</span>
          </template>
          <template v-else-if="result.wpm >= 20">
            <span class="crt-feedback-avg">まずまず！練習でもっと早くなります 📝</span>
          </template>
          <template v-else>
            <span class="crt-feedback-bad">がんばりましょう！練習あるのみです 💪</span>
          </template>
        </div>
        <div class="flex gap-2 pt-2">
          <button class="crt-btn" @click="playAgain">もう一度挑戦</button>
          <button class="crt-btn crt-btn-main" @click="goHome">ホームに戻る</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
const router = useRouter()

const result = ref({
  playerName: '',
  wpm: 0,
  accuracy: 0
})

onMounted(() => {
  const savedResult = localStorage.getItem('gameResult')
  if (savedResult) {
    result.value = JSON.parse(savedResult)
  } else {
    // 結果がない場合はホームに戻る
    router.push('/')
  }
})

const playAgain = () => {
  router.push('/name-input')
}

const goHome = () => {
  router.push('/')
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
.crt-value {
  color: #b6ffb6;
  font-size: 1.1rem;
  font-family: inherit;
}
.crt-terminal {
  background: rgba(0,0,0,0.7);
  color: #7fff7f;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  font-size: 1.05rem;
  border-radius: 8px;
  border: 1.5px solid #0f0;
  box-shadow: 0 0 8px #0f0a, 0 0 32px #0f08;
  padding: 1em 0.5em;
  margin: 0 auto;
  width: 100%;
  max-width: 420px;
  text-align: left;
  line-height: 1.5;
  white-space: pre-wrap;
  letter-spacing: 0.01em;
  position: relative;
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
.crt-feedback {
  text-align: center;
  margin-bottom: 0.5em;
}
.crt-feedback-good {
  color: #7fff7f;
  font-weight: bold;
}
.crt-feedback-mid {
  color: #4fd1ff;
  font-weight: bold;
}
.crt-feedback-avg {
  color: #ffe066;
  font-weight: bold;
}
.crt-feedback-bad {
  color: #ff6f6f;
  font-weight: bold;
}
</style>