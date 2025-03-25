<script setup lang="ts">
import { ref, watch, onBeforeMount, h } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { NConfigProvider, lightTheme, darkTheme, zhCN, dateZhCN } from 'naive-ui';
import { NButton, NSpace, NCard, NTabPane, NTabs, NLayout, NLayoutSider, NMenu, type MenuOption } from 'naive-ui';
import HADS from './views/HADS.vue';
import type { Key } from 'naive-ui/es/menu/src/interface';
import { Info24Regular, Scales24Regular } from '@vicons/fluent';

const route = useRoute();
const route_name = ref(route.name);
// 根据当前路由设置高亮
watch(() => route.name, newRouteName => route_name.value = newRouteName);

const currentTheme = ref();

onBeforeMount(() => {
  currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () =>
      currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme); // 监听系统主题
});


const collapseMenu = ref(false);

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'help',
          }
        },
        { default: () => 'Help' }
      ),
    key: 'help',
    icon: () => h(Info24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'hads',
          }
        },
        { default: () => 'HADS' }
      ),
    key: 'hads',
    icon: () => h(Scales24Regular),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'dass21',
          }
        },
        { default: () => 'DASS-21' }
      ),
    key: 'dass21',
    icon: () => h(Scales24Regular),
  },
];
</script>


<template>
  <n-config-provider :theme="currentTheme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout has-sider style="width: 100vw;height: 100vh;">

      <!-- 左侧菜单栏 -->
      <n-layout-sider bordered collapse-mode="width" :width="160" :collapsed="collapseMenu" show-trigger
        @collapse="collapseMenu = true" @expand="collapseMenu = false">
        <n-menu :collapsed="collapseMenu" :options="menuOptions" :value="(route_name as Key)" />
      </n-layout-sider>

      <!-- 右侧编辑区 -->
      <n-layout style="width: 100%;height: 100%;text-align: center;">
        <RouterView />
      </n-layout>

    </n-layout>
  </n-config-provider>
</template>

<style scoped></style>
