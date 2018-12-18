<template>
    <div class="text-xs-left">
        <v-layout row wrap>
            <v-flex xs9>
                <h1 class="title">{{ test.name }}</h1>
            </v-flex>
            <v-flex xs3 text-xs-right>
                <back-button :route="{ name: 'reports-id', params: { id: test.report } }" text="Back to report" />
            </v-flex>
        </v-layout>
        <span class="subheading">Test history</span>
        <v-expansion-panel
                popout
                v-model="panel">
            <v-expansion-panel-content
                v-for="(t, index) in tests"
                :key="t.startTime"
                v-bind:class="{
                    'error-mark': t.errs.length > 0,
                    'skipped-mark': t.skipped,
                }"
                :id="'a' + t._id"
            >
                <div slot="header">
                    <span>{{ formatDate(t.startTime) }}</span>
                    <span v-if="$route.params.id === t._id" style="float: right; padding-right: 10px;">
                         <v-icon right title="Current">stars</v-icon>
                    </span>
                </div>
                <v-layout row wrap style="padding: 0 0 20px 20px;">
                    <v-flex xs12>
                        <template v-for="(tag, tagIndex) in t.tags">
                            <span class="tag">{{ tag }}</span>
                        </template>

                        <div v-for="(step, stepIndex) in t.description.steps">
                            <span class="keyWord">{{ step.keyword }}</span> <span>{{ step.text }}</span>
                        </div>
                    </v-flex>
                    <v-flex xs12>
                        <span>Fixture name:</span><span> {{ t.fixtureName }}</span> <br />
                        <span>Fixture path:</span><span> {{ t.fixturePath }}</span> <br />
                        <span>Time duration:</span><span> {{ execTime(t.durationMs) }}</span> <br />
                        <span>Status: </span
                        ><span>{{ t.skipped ? 'Skipped' : t.errs.length === 0 ? 'Passed' : 'Error' }}</span>
                    </v-flex>
                    <v-flex xs12 v-if="t.errs.length > 0">
                        <span>Error text:</span>
                        <span v-on:click="handlerErrorVisible"> ({{ errorsVisible ? 'Скрыть' : 'Показать' }}) </span>
                        <transition name="fade">
                            <v-flex v-for="(err, errIndex) in t.errs" v-if="errorsVisible" :key="errIndex">
                                <code>{{ err }}</code>
                            </v-flex>
                        </transition>
                    </v-flex>
                </v-layout>
                <v-divider :key="index"></v-divider>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script lang="ts" src="./_id.vue.ts"></script>

<style scoped lang="postcss">
:root {
    --tagColor: #bbb529;
    --keyWordColor: #cb6c2e;
}
.title {
    margin-top: 30px;
}

code {
    width: 100%;
}
.button {
    margin-top: 30px;
}
.tag {
    color: var(--tagColor);
    padding-right: 7px;
}
.keyWord {
    color: var(--keyWordColor);
}
.fade-enter-active,
.fade-leave-active {
    max-height: 500px;
    transition: max-height 0.25s ease-in;
    overflow: hidden;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    max-height: 0;
    transition: max-height 0.15s ease-out;
}

.skipped-mark {
    border-left: 5px solid #f1c40f;
}
.error-mark {
    position: relative;
    &::after {
        content: '';
        border-left: 5px solid #e84c3d;
        position: absolute;
        top: 1px;
        bottom: 1px;
    }
}
.passed-mark {
    border-left: 5px solid #2dcc70;
}
</style>
