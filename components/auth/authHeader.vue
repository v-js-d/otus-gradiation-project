<template>
  <div class="p-2 md:p-3 flex items-center justify-between">
    <NuxtLink type="primary" :to="{ path: '/app' }">
      <NuxtImg v-show="$colorMode.value === 'dark'" class="max-w-[200px] md:max-w-[250px]" src="/img/logo-black.svg" alt="logo" />
      <NuxtImg v-show="$colorMode.value === 'light'" class="max-w-[200px] md:max-w-[250px]" src="/img/logo-white.svg" alt="logo" />
    </NuxtLink>

    <div class="flex items-center gap-2">
      <el-button circle size="large" @click="() => $colorMode.preference = $colorMode.value === 'light' ? 'dark' : 'light'">
        <Icon :name="$colorMode.value === 'dark' ? 'fxemoji:whitesun' : 'fxemoji:crescentmoon'" class="text-2xl" />
      </el-button>
      <div class="relative">
        <el-button circle size="large" @click="switchLocal">
          <Icon name="mdi:earth" class="text-2xl" />
        </el-button>
        <div class="rounded-full bg-red-400 text-center text-xs absolute -top-1 -right-1 px-1">
          {{ locale.toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

function switchLocal () {
  locale.value === 'en' ? setLocale('ru') : setLocale('en')
}
</script>
