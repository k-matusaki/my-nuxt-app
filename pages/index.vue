<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900">Extreme Typing</h1>
          <p class="text-gray-600 mt-2">エンジニア向けタイピングゲーム</p>
        </div>
      </template>

      <div class="space-y-4">
        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">ランキング</h2>
          <div class="space-y-2">
            <div class="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span class="font-medium">1. Player1</span>
              <span class="text-sm text-gray-600">120 WPM</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span class="font-medium">2. Player2</span>
              <span class="text-sm text-gray-600">115 WPM</span>
            </div>
            <div class="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span class="font-medium">3. Player3</span>
              <span class="text-sm text-gray-600">110 WPM</span>
            </div>
          </div>
        </div>

        <UButton 
          block 
          size="lg" 
          @click="startChallenge"
          class="mt-6"
        >
          チャレンジ開始
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const router = useRouter()

const startChallenge = () => {
  router.push('/name-input')
}
</script>