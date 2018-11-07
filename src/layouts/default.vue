<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
            <v-list>
                <v-list-tile
                    router
                    :to="item.to"
                    :key="i"
                    v-for="(item, i) in items"
                    exact
                    v-if="!item.isAuth || (item.isAuth && $store.state.auth.authUser)"
                >
                    <v-list-tile-action> <v-icon v-html="item.icon"></v-icon> </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="$vuetify.breakpoint.lgAndUp">
            <v-toolbar-side-icon @click="drawer = !drawer;"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title" class="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <login-form></login-form>
        </v-toolbar>
        <v-content>
            <v-container fluid> <nuxt /> </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts" src="./default.vue.ts"></script>

<style>
.title {
    cursor: default;
}
.container {
    margin: 0;
    width: 100%;
    text-align: center;
}
</style>
