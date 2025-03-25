<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { NRadioGroup, NRadio, NSpace, NForm, NFormItem } from 'naive-ui';

onMounted(() => document.title = 'DASS-21 - 抑郁-焦虑-压力量表');

const radios = ["不符合", "有时符合", "常常符合", "总是符合"];

interface Selector {
    label: string;
    val: number | null;
    type: 'D' | 'A' | 'S';
}
const selecters = ref<Selector[]>([
    {
        'label': "我发现很难放松下来",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我意识到我的口腔干燥",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我似乎根本体会不到任何积极的感觉",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我感到呼吸困难（例如，呼吸过快、没有体力活动时呼吸困难）",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我发现很难主动去做事",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我倾向于对情况反应过度",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我感到颤抖（例如手抖）",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我觉得自己消耗了很多精力去焦虑",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我担心一些可能让自己恐慌或出丑的场合",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我觉得我没有什么可期待的",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我发现自己变得焦虑不安",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我感到很难放松自己",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我感到消沉和忧郁",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我无法容忍打断我做事的行为",
        'val': null,
        'type': 'S'
    },
    {
        'label': "我觉得我很恐慌",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我对任何事情都不能产生热情",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我觉得我作为一个人没什么价值",
        'val': null,
        'type': 'D'
    },
    {
        'label': "我觉得我易怒",
        'val': null,
        'type': 'S'
    },
    {
        'label': "无体力活动时，我也感到心律不正常（例如心率加快、心跳漏拍）",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我无缘无故地感到害怕",
        'val': null,
        'type': 'A'
    },
    {
        'label': "我觉得生活毫无意义",
        'val': null,
        'type': 'D'
    },
]);

const scoreD = computed(
    () => selecters.value.reduce((acc, selector) => {
        if (selector.val !== null && selector.type === 'D') {
            return acc + selector.val;
        }
        return acc;
    }, 0)
)

const scoreA = computed(
    () => selecters.value.reduce((acc, selector) => {
        if (selector.val !== null && selector.type === 'A') {
            return acc + selector.val;
        }
        return acc;
    }, 0)
)

const scoreS = computed(
    () => selecters.value.reduce((acc, selector) => {
        if (selector.val !== null && selector.type === 'S') {
            return acc + selector.val;
        }
        return acc;
    }, 0)
)

const showScore = computed(() => selecters.value.every(selector => selector.val !== null))
</script>


<template>
    <h1>DASS-21</h1>
    <p>根据最近一周的自身情况选择</p>
    <NForm class="form" style="margin: auto;width: fit-content;">
        <NFormItem v-for="(selecter, i) in selecters" :label="`${i + 1}. ${selecter.label}`">
            <n-radio-group v-model:value="selecter.val">
                <n-space>
                    <n-radio v-for="(radio, score) in radios" :value="score">
                        {{ radio }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </NFormItem>
    </NForm>

    <p style="color: red;" v-show="!showScore"><strong>存在未选项</strong></p>
    <p v-show="showScore">
        <strong>
            总分: {{ scoreD }} 抑郁 | {{ scoreA }} 焦虑 | {{ scoreS }} 压力
        </strong>
    </p>
    <p v-show="showScore">
        <strong>
            判定: {{ scoreD <= 9 ? '正常' : scoreD <= 13 ? '轻度' : scoreD <= 20 ? '中度' : scoreD <= 27 ? '重度' : '极重' }} 抑郁 | {{
                scoreA <= 7 ? '正常' : scoreA <= 9 ? '轻度' : scoreA <= 14 ? '中度' : scoreA <= 19 ? '重度' : '极重' }} 焦虑 | {{ scoreS
                    <= 14 ? '正常' : scoreS <= 18 ? '轻度' : scoreS <= 25 ? '中度' : scoreS <= 33 ? '重度' : '极重' }} 压力 </strong>
    </p>
</template>
