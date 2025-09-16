
<template>
  <div class="crt-bg min-h-screen">
    <!-- ゲーム画面本体のみ -->
    <div class="crt-pc-frame">
      <div class="crt-card p-8 flex flex-col items-center relative overflow-hidden">
        <div class="crt-game-header text-center z-10">
          <span class="crt-mini-icon">⌨️</span>
          <div class="crt-ready-text">Extreme Typing Ready!</div>
        </div>
        <div class="crt-guide-box z-10">
          <pre class="crt-terminal">


│  <span class="crt-guide-strong">操作方法</span>
│  ・表示された単語やコードを正確に入力
│  ・スペースや記号も正確にタイプしてください
│  ・制限時間内にできるだけ多く正解しよう
          </pre>
        </div>
        <button class="crt-btn crt-btn-main mt-auto mb-2" @click="startChallenge">
          <span class="crt-blink">█</span> ゲームスタート！
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* タイトル・説明文：左上に固定配置 */
.crt-titlebox {
  position: absolute;
  top: 2.5vh;
  left: 0.5vw;
  z-index: 10;
  background: rgba(0,0,0,0.65);
  border-radius: 12px;
  padding: 1.2em 1.8em 1.2em 1.2em;
  box-shadow: 0 0 8px #0f0a, 0 0 32px #0f08;
  pointer-events: none;
  min-width: 260px;
  max-width: 330px;
   /* タブレット以下は中央寄せ・幅調整 */

@media (max-width: 1024px) {
  .crt-titlebox {
    position: static;
    margin: 2vh auto 0 auto;
    left: 0;
    right: 0;
    min-width: 180px;
    max-width: 90vw;
    width: auto;
    display: block;
    pointer-events: auto;
    z-index: 20;
    margin-bottom: 2vh;
  }
  .crt-pc-frame {
    position: static;
    margin: 4vh auto 0 auto;
    margin-top: 0;
    width: 98vw;
    min-width: 260px;
    max-width: 700px;
    height: auto;
    min-height: 340px;
    max-height: 90vh;
    left: 0;
    top: 0;
    display: flex;
    align-items: stretch;
    justify-content: center;
    pointer-events: none;
  }
}
}
.crt-titlebox .crt-title {
  margin-bottom: 0.1em;
}
.crt-titlebox .crt-desc {
  margin-top: 0.5em;
}
.crt-titlebox .crt-meta {
  margin-top: 0.4em;
}

html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* ゲーム画面UI/UXリッチ化 */
.crt-game-header {
  margin-top: 0.5em;
  margin-bottom: 0.7em;
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
  font-size: 1.3rem;
  color: #7fff7f;
  font-weight: bold;
  letter-spacing: 0.08em;
  margin-bottom: 0.2em;
  text-shadow: 0 0 8px #0f0, 0 0 16px #0f08;
}
.crt-btn-main {
  font-size: 1.18rem;
  padding: 0.8em 2.8em;
  background: #111;
  color: #0f0;
  border: 2.5px solid #0f0;
  border-radius: 8px;
  box-shadow: 0 0 12px #0f0a, 0 0 32px #0f08;
  font-weight: bold;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.crt-btn-main:hover {
  background: #222;
  color: #b6ffb6;
  box-shadow: 0 0 24px #0f0, 0 0 64px #0f08;
}

/* パソコン画面部分にゲームUIを重ねる */
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
/* ゲーム画面本体 */
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
  justify-content: flex-start;
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

/* 各要素の余白・フォントサイズを縮小 */
.crt-subtitle {
  font-size: 1.05rem;
  margin-top: 0.7em;
}
.crt-desc {
  font-size: 0.92rem;
  margin-top: 0.5em;
}
.crt-meta {
  font-size: 0.75rem;
  margin-top: 0.4em;
}
.crt-icon {
  font-size: 2rem;
}
.crt-terminal {
  font-size: 0.95rem;
  padding: 0.7em 0.3em;
  max-width: 360px;
  margin-bottom: 0.7em;
}

.crt-bg {
  min-height: 100vh;
  width: 100vw;
  background: url('../public/Gemini_Generated_Image_88gx288gx288gx28.png') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  overflow: hidden;
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
.crt-card {
  background: rgba(20,32,20,0.92);
  border-radius: 18px;
  box-shadow: 0 0 0 2px #0f0, 0 0 24px 2px #0f08, 0 0 80px 0 #0f04;
  border: 2px solid #0f0;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  color: #b6ffb6;
  text-shadow: 0 0 2px #0f0, 0 0 8px #0f08;
  filter: contrast(1.1) brightness(1.1);
  position: relative;
  overflow: auto;
}
.crt-title {
  font-size: 1.9rem;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  color: #7fff7f;
  text-shadow: 0 0 4px #0f0, 0 0 12px #0f08;
  letter-spacing: 0.04em;
  font-weight: bold;
  margin-bottom: 0.2em;
}
.crt-subtitle {
  font-size: 1.2rem;
  color: #b6ffb6;
  text-shadow: 0 0 2px #0f0;
  font-family: inherit;
}
.crt-desc {
  font-size: 1rem;
  color: #a0ffa0;
  font-family: inherit;
}
.crt-meta {
  font-size: 0.85rem;
  color: #7fff7f;
  opacity: 0.7;
  font-family: inherit;
}
.crt-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 6px #0f0);
  text-shadow: 0 0 8px #0f0, 0 0 16px #0f08;
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
  margin-top: 0.5em;
  background: #111;
  color: #0f0;
  font-family: 'IBM Plex Mono', 'Consolas', 'Menlo', 'monospace';
  font-size: 1.2rem;
  border: 2px solid #0f0;
  border-radius: 6px;
  box-shadow: 0 0 8px #0f0a, 0 0 32px #0f08;
  padding: 0.7em 2.5em;
  font-weight: bold;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 1;
}
.crt-btn:hover {
  background: #222;
  color: #b6ffb6;
  box-shadow: 0 0 16px #0f0, 0 0 48px #0f08;
}
.crt-blink {
  animation: crt-blink 1.1s steps(1) infinite;
  font-weight: bold;
  margin-right: 0.5em;
}
@keyframes crt-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.crt-wpm {
  color: #0f0;
  font-size: 0.9em;
  font-family: inherit;
}
/* CRTスキャンライン効果 */
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
<script setup>
const router = useRouter()

const startChallenge = () => {
  router.push('/name-input')
}
</script>