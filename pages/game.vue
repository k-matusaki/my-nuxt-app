<template>
  <div class="crt-bg min-h-screen" tabindex="0" @keydown="onKeyDown" ref="gameContainer">
    <div class="crt-pc-frame">
      <div class="crt-card crt-game-outer flex flex-col items-center justify-center relative overflow-hidden h-full">
        <div class="crt-game-inner flex flex-col items-stretch justify-between w-full h-full gap-4 z-10" style="height:100%;min-height:100%;">
          <!-- タイトル -->
          <div class="crt-neonbox crt-titlebox-game flex flex-col items-center mb-2" style="flex:0 0 auto;">
            <span class="crt-mini-icon">⌨️</span>
            <div class="crt-ready-text">Extreme Typing</div>
          </div>
          <!-- ステータス -->
          <div class="crt-neonbox crt-statusbox flex flex-row flex-wrap items-center justify-center gap-6 px-8 py-2 mb-2" style="flex:0 0 auto;">
            <span class="crt-label">プレイヤー：</span><span class="crt-value">{{ playerName }}</span>
            <span class="crt-label">時間：</span><span class="crt-value">{{ formatTime(timeRemaining) }}</span>
            <span class="crt-label">WPM：</span><span class="crt-value">{{ wpm }}</span>
            <template v-if="gameState === 'playing'">
              <span class="crt-label">進捗：</span><span class="crt-value">{{ currentIndex }}/{{ currentProblem.length }}</span>
            </template>
          </div>
          <!-- 問題 -->
          <div class="crt-neonbox crt-problembox w-full flex items-center justify-center px-6 py-4 mb-2" style="flex:0 0 auto; min-height:120px; max-height:180px; height:150px;">
            <div class="crt-terminal-problem w-full text-center" style="overflow:auto; height:100%; display:flex; align-items:center; justify-content:center;">
              <span v-for="(char, index) in currentProblem" :key="index" :class="getCharClass(index)" class="crt-char">{{ char }}</span>
            </div>
          </div>
          <!-- エラー時の爆発エフェクト -->
          <div v-if="showExplosion" class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div class="explosion-effect">
              <div class="explosion-ring"></div>
              <div class="explosion-flash"></div>
            </div>
          </div>
          <!-- ボタン -->
          <div class="crt-neonbox crt-btnbox flex flex-row items-center justify-center gap-6 w-full px-6 py-3 mb-2" style="flex:0 0 auto;">
            <button v-if="gameState === 'waiting'" class="crt-btn crt-btn-main w-1/2" @click="startGame" type="button">ゲーム開始（60秒）</button>
            <button class="crt-btn w-1/2" @click="goHome" type="button" @keydown.esc="goHome">ホームに戻る</button>
          </div>
          <!-- ガイド -->
          <div v-if="gameState === 'waiting'" class="crt-neonbox crt-guidebox w-full px-6 py-3 mt-2" style="flex:1 1 30%;min-height:90px;">
            <pre class="crt-terminal-guide text-left">
│  <span class="crt-guide-strong">操作方法</span>
│  ・表示された単語やコードを正確に入力
│  ・スペースや記号も正確にタイプしてください
│  ・制限時間内にできるだけ多く正解しよう
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>

<script setup>
const router = useRouter()
const gameContainer = ref(null)

const playerName = ref('')
const gameState = ref('waiting') // waiting, playing, finished
const currentProblem = ref('')
const currentIndex = ref(0)
const totalTypedChars = ref(0)
const missTypedChars = ref(0)
const timeRemaining = ref(60)
const wpm = ref(0)
const showExplosion = ref(false)
let gameTimer = null
let startTime = null

// サンプル問題データ
const problems = [
  'bundle install',
  'bundle exec rails s -p 4000',
  'bundle exec rails c',
  'bundle exec rails g model User name:string admin:boolean',
  'bundle exec rails g migration AddIndexToUsersEmail',
  'bundle exec rails db:migrate',
  'bundle exec rails db:rollback STEP=1',
  'RAILS_ENV=test bundle exec rails db:prepare',
  'RAILS_ENV=test bundle exec rails db:migrate:reset',
  'RAILS_ENV=production bundle exec rails assets:precompile',
  'bundle exec rails db:seed',
  'RAILS_ENV=test bundle exec rails db:seed',
  'bundle exec rails db:migrate VERSION=20240101000000',
  'bundle exec rails routes | grep users',
  'bundle exec rails routes | grep admin',
  'curl -H "Authorization: Token token=SECRET" http://localhost:3000/api/v1/users',
  "User.find_by(email: 'admin@example.com')",
  'bundle exec rails c --sandbox',
  'bundle exec rspec spec/models/user_spec.rb',
  'bundle exec rspec spec/requests/users_spec.rb',
  'bundle exec rspec --format documentation',
  'bundle exec rake spec',
  'bundle exec rubocop -A',
  'bundle exec brakeman -q',
  'DISABLE_SPRING=1 bundle exec rails g job CleanupOldSessions',
  'DISABLE_SPRING=1 bundle exec rails g task maintenance:purge_tmp',
  'bundle exec sidekiq -q default -q mailers',
  'bundle exec whenever --update-crontab',
  'bundle exec rails tmp:cache:clear',
  'bundle exec rails log:clear',
  'bundle exec rails dbconsole',
  'PGPASSWORD=secret psql -h localhost -U postgres app_development',
  'class User < ActiveRecord::Base',
  'class Admin::UserPolicy < ApplicationPolicy',
  'FactoryBot.create_list(:user, 3)',
  'rails new demo_app -d postgresql',
  'bin/rails credentials:edit',
  'EDITOR=vim bin/rails credentials:edit',
  'bundle exec rails g migration CreateAuditLogs user:references action:string',
  'bundle exec rails g scaffold Post title:string body:text published:boolean',
  'bundle exec rails g migration AddDeletedAtToUsers deleted_at:datetime:index',
  'bundle exec rails db:migrate:status',
  'RAILS_ENV=production bundle exec rails db:version',
  'bundle exec rake -T db',
  'bundle exec rails about',
  'bundle exec rails stats',
  'RAILS_ENV=test bundle exec rails assets:clobber',
  'bundle exec rails middleware',
  'bundle exec rails initializers',
  'bundle exec rails zeitwerk:check',
  'bundle exec rails routes | wc -l',
  'bundle exec rails notes',
  'bundle exec rails notes:custom ANNOTATION=SECURITY',
  'bundle exec rails db:abort_if_pending_migrations',
  'bundle exec rails app:update',
  'BUNDLE_WITHOUT=production bundle install',
  'RAILS_MAX_THREADS=5 bundle exec puma -C config/puma.rb'
]

onMounted(() => {
  playerName.value = localStorage.getItem('playerName') || 'Unknown'
  currentProblem.value = problems[Math.floor(Math.random() * problems.length)]
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const getCharClass = (index) => {
  if (index < currentIndex.value) {
    return 'crt-char-done';
  } else if (index === currentIndex.value) {
    return 'crt-char-current';
  } else {
    return 'crt-char-rest';
  }
}

const startGame = () => {
  gameState.value = 'playing'
  startTime = Date.now()
  timeRemaining.value = 60
  currentIndex.value = 0
  totalTypedChars.value = 0
  
  gameTimer = setInterval(() => {
    timeRemaining.value--
    calculateWPM()
    
    if (timeRemaining.value <= 0) {
      endGame()
    }
  }, 1000)
  
  nextTick(() => {
    gameContainer.value?.focus()
  })
}

const onKeyDown = (event) => {
  // ゲーム待機中: Enterで開始
  if (gameState.value === 'waiting' && event.key === 'Enter') {
    event.preventDefault()
    startGame()
    return
  }

  // ゲーム終了: Enterでホームに戻る
  if (gameState.value === 'finished' && event.key === 'Enter') {
    event.preventDefault()
    goHome()
    return
  }

  if (gameState.value !== 'playing') return

  // 特殊キーは無視（Enterは上記で処理済み）
  if (event.key === 'Tab' || event.key === 'Escape' || 
      event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' ||
      event.key === 'Meta' || event.key.startsWith('Arrow') || event.key.startsWith('F')) {
    event.preventDefault()
    return
  }

  event.preventDefault()

  const expectedChar = currentProblem.value[currentIndex.value]

  if (event.key === expectedChar) {
    // 正解
    currentIndex.value++
    totalTypedChars.value++

    // 問題完了チェック
    if (currentIndex.value >= currentProblem.value.length) {
      nextProblem()
    }
  } else {
    // 間違い - 爆発エフェクト
    missTypedChars.value++
    totalTypedChars.value++
    triggerExplosion()
  }
}

const triggerExplosion = () => {
  showExplosion.value = true
  setTimeout(() => {
    showExplosion.value = false
  }, 300)
}

const nextProblem = () => {
  setTimeout(() => {
    currentProblem.value = problems[Math.floor(Math.random() * problems.length)]
    currentIndex.value = 0
  }, 500)
}

const calculateWPM = () => {
  if (!startTime) return
  
  const elapsed = (Date.now() - startTime) / 1000 / 60 // 分
  const wordsTyped = totalTypedChars.value / 5 // 5文字で1単語
  wpm.value = Math.round(wordsTyped / elapsed) || 0
}

const endGame = async () => {
  gameState.value = 'finished'
  if (gameTimer) {
    clearInterval(gameTimer)
    gameTimer = null
  }
  // 正確性計算
  let accuracy = 100
  if (totalTypedChars.value > 0) {
    accuracy = Math.round(100 * (totalTypedChars.value - missTypedChars.value) / totalTypedChars.value)
  }
  // 結果を保存
  const result = {
    playerName: playerName.value,
    wpm: wpm.value,
    accuracy,
    totalTypedChars: totalTypedChars.value,
    missTypedChars: missTypedChars.value,
    timestamp: Date.now()
  }
  localStorage.setItem('gameResult', JSON.stringify(result))
  await nextTick()
  router.push('/result')
}

const goHome = () => {
  if (gameTimer) {
    clearInterval(gameTimer)
  }
  router.push('/')
}

onUnmounted(() => {
  if (gameTimer) {
    clearInterval(gameTimer)
  }
})
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
}
.crt-value {
  color: #b6ffb6;
  font-size: 1.1rem;
  font-family: inherit;
  margin-right: 0.7em;
}
.crt-char {
  transition: all 0.15s;
  padding: 0 0.1em;
  border-radius: 3px;
  font-size: 1.18rem;
  line-height: 1.7;
  font-family: inherit;
}

/* 入力済み文字 */
.crt-char-done {
  color: #7fff7f;
  background: rgba(0,255,0,0.13);
  border-bottom: 2px solid #7fff7f;
  font-weight: bold;
}
/* 現在入力位置 */
.crt-char-current {
  color: #ffe066;
  background: rgba(255,255,0,0.18);
  border-bottom: 2.5px solid #ffe066;
  font-weight: bold;
  animation: crt-cursor-blink 0.7s steps(1) infinite;
}
@keyframes crt-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
/* 未入力文字 */
.crt-char-rest {
  color: #b6ffb633;
  background: none;
  border-bottom: 2px solid transparent;
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
.crt-guide-strong {
  color: #ffe066;
  font-weight: bold;
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
/* 爆発エフェクトは既存のまま */
.explosion-effect {
  position: relative;
  width: 200px;
  height: 200px;
}

.explosion-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 4px solid #ef4444;
  border-radius: 50%;
  animation: explosion-ring 0.3s ease-out forwards;
}

.explosion-flash {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #fbbf24, #ef4444, #dc2626);
  border-radius: 50%;
  animation: explosion-flash 0.3s ease-out forwards;
}

/* スペース用の強調 */
.crt-char-space {
  background: rgba(255,255,255,0.08) !important;
  color: #ffe066 !important;
  border-bottom: 2px dashed #ffe066 !important;
  font-style: italic;
  font-weight: bold;
  letter-spacing: 0.2em;
  text-shadow: 0 0 6px #ffe06699;
}

@keyframes explosion-ring {
  0% {
    width: 50px;
    height: 50px;
    opacity: 1;
    border-width: 4px;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
    border-width: 1px;
  }
}

@keyframes explosion-flash {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
    box-shadow: 0 0 20px #fbbf24;
  }
  50% {
    width: 60px;
    height: 60px;
    opacity: 0.8;
    box-shadow: 0 0 40px #ef4444;
  }
  100% {
    width: 100px;
    height: 100px;
    opacity: 0;
    box-shadow: 0 0 60px #dc2626;
  }
}

/* 画面全体を振動させるエフェクト */
.explosion-effect::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(239, 68, 68, 0.1);
  animation: screen-shake 0.3s ease-out forwards;
}

@keyframes screen-shake {
  0%, 100% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    transform: translateX(-2px);
    opacity: 1;
  }
  20% {
    transform: translateX(2px);
    opacity: 1;
  }
  30% {
    transform: translateX(-2px);
    opacity: 1;
  }
  40% {
    transform: translateX(2px);
    opacity: 1;
  }
  50% {
    transform: translateX(-1px);
    opacity: 0.5;
  }
  60% {
    transform: translateX(1px);
    opacity: 0.5;
  }
  70% {
    transform: translateX(-1px);
    opacity: 0.3;
  }
  80% {
    transform: translateX(1px);
    opacity: 0.1;
  }
  90% {
    transform: translateX(0);
    opacity: 0;
  }
}
</style>