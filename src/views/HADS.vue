<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NRadioGroup, NRadio, NSpace, NForm, NFormItem } from 'naive-ui';

onMounted(() => document.title = 'HADS - 医院焦虑抑郁量表');

const selecters = [
    {
        'label': "123",
        'val': null,
        'radio': [
            {
                'label': "1",
                'score': 1,
            },
        ]
    },
]
</script>


<template>
    <h1>HADS</h1>
    <p>未制作</p>
    <!-- <NForm>
        <NFormItem v-for="(selecter, i) in selecters" :label="`${i + 1}. ${selecter.label}`">
            <n-radio-group v-model:value="selecter.val">
                <n-space>
                    <n-radio v-for="radio in selecter.radio" :value="radio.score">
                        {{ radio.label }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </NFormItem>
    </NForm> -->
</template>