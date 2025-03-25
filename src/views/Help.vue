<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NQrCode, NSpace } from 'naive-ui';

onMounted(() => document.title = 'ADS - Help');


const url = ref("https://github.com/op200/ADS");
</script>


<template>
    <h1>关于本网页</h1>
    <p>本网页是有关抑郁焦虑自测量表的中文自动统计分数的前端程序</p>
    <p>可以方便快捷地统计分数</p>
    <p>但这仅仅只是量表，不代表真正的病情诊断</p>

    <h1>量表</h1>
    <p>HADS - 医院焦虑抑郁量表</p>
    <p>DASS-21 - 抑郁-焦虑-压力量表</p>

    <h1>项目地址</h1>
    <p><a :href="url">{{ url }}</a></p>
    <n-space vertical>
        <n-qr-code :value="url" />
    </n-space>
</template>