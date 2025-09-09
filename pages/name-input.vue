<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">Extreme Typing</h1>
          <p class="text-gray-600 mt-2">プレイヤー名を入力してください</p>
        </div>
      </template>

      <div class="space-y-4">
        <UFormGroup label="プレイヤー名" required>
          <UInput
            v-model="playerName"
            placeholder="プレイヤー名を入力"
            size="lg"
            :error="!!error"
          />
          <template #error v-if="error">
            {{ error }}
          </template>
        </UFormGroup>

        <div class="flex space-x-2 pt-4">
          <UButton 
            variant="ghost" 
            block 
            @click="goBack"
          >
            戻る
          </UButton>
          <UButton 
            block 
            size="lg" 
            @click="startGame"
            :disabled="!playerName.trim()"
          >
            ゲーム開始
          </UButton>
        </div>
      </div>
    </UCard>
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
  // プレイヤー名をストレージに保存
  localStorage.setItem('playerName', playerName.value.trim())
  router.push('/game')
}
</script>