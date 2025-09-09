<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">結果発表</h1>
          <p class="text-gray-600 mt-2">お疲れ様でした！</p>
        </div>
      </template>

      <div class="space-y-6">
        <div class="text-center">
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 rounded-lg">
              <div class="text-sm text-blue-600 font-medium">プレイヤー名</div>
              <div class="text-2xl font-bold text-blue-900">{{ result.playerName }}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-green-50 rounded-lg">
                <div class="text-sm text-green-600 font-medium">WPM</div>
                <div class="text-xl font-bold text-green-900">{{ result.wpm }}</div>
              </div>
              
              <div class="p-4 bg-purple-50 rounded-lg">
                <div class="text-sm text-purple-600 font-medium">正確性</div>
                <div class="text-xl font-bold text-purple-900">{{ result.accuracy }}%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center text-sm text-gray-600">
          <p v-if="result.wpm >= 60" class="text-green-600 font-medium">
            素晴らしい！上級エンジニアレベルです 🎉
          </p>
          <p v-else-if="result.wpm >= 40" class="text-blue-600 font-medium">
            Good! 中級エンジニアレベルです 👍
          </p>
          <p v-else-if="result.wpm >= 20" class="text-orange-600 font-medium">
            まずまず！練習でもっと早くなります 📝
          </p>
          <p v-else class="text-red-600 font-medium">
            がんばりましょう！練習あるのみです 💪
          </p>
        </div>

        <div class="flex space-x-2 pt-4">
          <UButton 
            variant="ghost" 
            block 
            @click="playAgain"
          >
            もう一度挑戦
          </UButton>
          <UButton 
            block 
            @click="goHome"
          >
            ホームに戻る
          </UButton>
        </div>
      </div>
    </UCard>
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