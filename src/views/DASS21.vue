<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from 'vue';
import { NRadioGroup, NRadio, NSpace, NForm, NFormItem } from 'naive-ui';

const currentTheme = inject<Ref<any, any>>('currentTheme');

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
    }, 0) * 2
)

const scoreA = computed(
    () => selecters.value.reduce((acc, selector) => {
        if (selector.val !== null && selector.type === 'A') {
            return acc + selector.val;
        }
        return acc;
    }, 0) * 2
)

const scoreS = computed(
    () => selecters.value.reduce((acc, selector) => {
        if (selector.val !== null && selector.type === 'S') {
            return acc + selector.val;
        }
        return acc;
    }, 0) * 2
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
    <!-- <p v-show="showScore">
        <strong>
            总分: {{ scoreD }} 抑郁 | {{ scoreA }} 焦虑 | {{ scoreS }} 压力
        </strong>
    </p>
    <p v-show="showScore">
        <strong>
            判定: {{ scoreD <= 9 ? '正常' : scoreD <= 13 ? '轻度' : scoreD <= 20 ? '中度' : scoreD <= 27 ? '重度' : '极重' }} 抑郁 | {{
                scoreA <= 7 ? '正常' : scoreA <= 9 ? '轻度' : scoreA <= 14 ? '中度' : scoreA <= 19 ? '重度' : '极重' }} 焦虑 | {{ scoreS
                    <= 14 ? '正常' : scoreS <= 18 ? '轻度' : scoreS <= 25 ? '中度' : scoreS <= 33 ? '重度' : '极重' }} 压力 </strong>
    </p> -->

    <table>
        <thead>
            <tr>
                <th>情绪状态</th>
                <th>正常</th>
                <th>轻度</th>
                <th>中度</th>
                <th>重度</th>
                <th>极重</th>
                <th>分数</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>抑郁</td>
                <td :class="scoreD && scoreD <= 9 ? 'highlight' : ''">0-9</td>
                <td :class="scoreD >= 10 && scoreD <= 13 ? 'highlight' : ''">10-13</td>
                <td :class="scoreD >= 14 && scoreD <= 20 ? 'highlight' : ''">14-20</td>
                <td :class="scoreD >= 21 && scoreD <= 27 ? 'highlight' : ''">21-27</td>
                <td :class="scoreD >= 28 ? 'highlight' : ''">≥28</td>
                <td>{{ scoreD }}</td>
            </tr>
            <tr>
                <td>焦虑</td>
                <td :class="scoreA && scoreA <= 7 ? 'highlight' : ''">0-7</td>
                <td :class="scoreA == 8 || scoreA == 9 ? 'highlight' : ''">8-9</td>
                <td :class="scoreA >= 10 && scoreA <= 14 ? 'highlight' : ''">10-14</td>
                <td :class="scoreA >= 15 && scoreA <= 19 ? 'highlight' : ''">15-19</td>
                <td :class="scoreA >= 20 ? 'highlight' : ''">≥20</td>
                <td>{{ scoreA }}</td>
            </tr>
            <tr>
                <td>压力</td>
                <td :class="scoreS && scoreS <= 14 ? 'highlight' : ''">0-14</td>
                <td :class="scoreS >= 15 && scoreS <= 18 ? 'highlight' : ''">15-18</td>
                <td :class="scoreS >= 19 && scoreS <= 25 ? 'highlight' : ''">19-25</td>
                <td :class="scoreS >= 26 && scoreS <= 33 ? 'highlight' : ''">26-33</td>
                <td :class="scoreS >= 34 ? 'highlight' : ''">≥34</td>
                <td>{{ scoreS }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
    margin: 1rem auto 2rem auto;
    text-align: center;
}

th {
    background-color: v-bind('currentTheme.common.codeColor');
}

th,
td {
    border: 1px solid lightgray;
    padding: 8px;
}

td:first-child {
    background-color: v-bind('currentTheme.common.codeColor');
    font-weight: bold;
}

td.highlight {
    background-color: v-bind('currentTheme.common.errorColorHover');
}
</style>
