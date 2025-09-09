<template>
  <div class="min-h-screen bg-gray-900 p-4" tabindex="0" @keydown="onKeyDown" ref="gameContainer">
    <div class="max-w-4xl mx-auto">
      <!-- ヘッダー -->
      <div class="mb-6 text-center">
        <h1 class="text-3xl font-bold text-white mb-2">Extreme Typing</h1>
        <div class="flex justify-center space-x-6 text-sm text-gray-300">
          <div>プレイヤー: <span class="font-medium text-white">{{ playerName }}</span></div>
          <div>時間: <span class="font-medium text-white">{{ formatTime(timeRemaining) }}</span></div>
          <div>WPM: <span class="font-medium text-white">{{ wpm }}</span></div>
          <div v-if="gameState === 'playing'">進捗: <span class="font-medium text-white">{{ currentIndex }}/{{ currentProblem.length }}</span></div>
        </div>
      </div>

      <!-- ゲームエリア -->
      <UCard class="mb-6 bg-gray-800 border-gray-700">
        <div class="p-6">
          <div class="text-2xl font-mono leading-relaxed p-6 bg-gray-900 rounded-lg min-h-24 flex flex-wrap items-center">
            <span 
              v-for="(char, index) in currentProblem" 
              :key="index"
              :class="getCharClass(index)"
              class="transition-all duration-150"
            >{{ char }}</span>
          </div>
          
          <!-- エラー時の爆発エフェクト -->
          <div 
            v-if="showExplosion" 
            class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <div class="explosion-effect">
              <div class="explosion-ring"></div>
              <div class="explosion-flash"></div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- コントロール -->
      <div class="text-center space-x-2">
        <UButton 
          v-if="gameState === 'waiting'" 
          @click="startGame"
          size="lg"
          color="green"
        >
          ゲーム開始 (60秒)
        </UButton>
        
        <UButton 
          variant="ghost" 
          @click="goHome"
          color="gray"
        >
          ホームに戻る
        </UButton>
      </div>

      <!-- インストラクション -->
      <div v-if="gameState === 'waiting'" class="text-center mt-4 text-gray-400 text-sm">
        ゲーム開始後、キーボードで直接入力してください
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
const timeRemaining = ref(60)
const wpm = ref(0)
const showExplosion = ref(false)
let gameTimer = null
let startTime = null

// サンプル問題データ
const problems = [
  'RAILS_ENV=test bundle exec rails db:migrate',
  'bundle exec rspec spec/requests/api/v1/users_spec.rb',
  'docker compose up -d',
  'npm run dev',
  'git add . && git commit -m "Add new feature"',
  'class User < ActiveRecord::Base',
  'def initialize(name)',
  'bundle install --without production'
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
    return 'text-green-400 bg-green-900/30 rounded px-1'
  } else if (index === currentIndex.value) {
    return 'text-yellow-300 bg-yellow-900/50 rounded animate-pulse px-1'
  } else {
    return 'text-gray-400 px-1'
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
  if (gameState.value !== 'playing') return
  
  // 特殊キーは無視
  if (event.key === 'Tab' || event.key === 'Enter' || event.key === 'Escape' || 
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

const endGame = () => {
  gameState.value = 'finished'
  clearInterval(gameTimer)
  
  // 結果を保存
  const result = {
    playerName: playerName.value,
    wpm: wpm.value,
    accuracy: 100, // 間違いは進まないので100%
    timestamp: Date.now()
  }
  
  localStorage.setItem('gameResult', JSON.stringify(result))
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