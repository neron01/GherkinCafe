<template>
    <v-container grid-list-md text-xs-left>
        <v-layout row wrap>
            <h1 class="title">{{ test.name }}</h1>
            <v-flex xs12>
                <template v-for="(tag, tagIndex) in test.tags">
                    <span class="tag">{{ tag }}</span>
                </template>

                <div v-for="(step, stepIndex) in test.description.steps">
                    <span class="keyWord">{{ step.keyword }}</span> <span>{{ step.text }}</span>
                </div>
            </v-flex>
            <v-flex xs12>
                <span>Fixture name:</span><span> {{ test.fixtureName }}</span> <br />
                <span>Fixture path:</span><span> {{ test.fixturePath }}</span> <br />
                <span>Time duration:</span><span> {{ test.durationMs }}</span> <br />
                <span>Status: </span
                ><span>{{ test.skipped ? 'Skipped' : test.errs.length === 0 ? 'Passed' : 'Error' }}</span>
            </v-flex>
            <v-flex xs12 v-if="test.errs.length > 0">
                <span>Error text:</span>
                <span v-on:click="handlerErrorVisible"> ({{ errorsVisible ? 'Скрыть' : 'Показать' }}) </span>
                <transition name="fade">
                    <v-flex v-for="(err, errIndex) in test.errs" v-if="errorsVisible" :key="errIndex">
                        <code>{{ err }}</code>
                    </v-flex>
                </transition>
            </v-flex>
            <nuxt-link class="button" :to="{ name: 'reports-id', params: { id: test.report } }">
                Back to report
            </nuxt-link>
        </v-layout>
        <span class="subheading">Tests history</span>
        <template v-for="(t, index) in tests">
            <v-layout row wrap>
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
                    <span>Time duration:</span><span> {{ t.durationMs }}</span> <br />
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
        </template>
    </v-container>
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
</style>
