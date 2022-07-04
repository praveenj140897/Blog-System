import Vue from "vue";
import VueRouter from "vue-router";

import blogListing from "../views/blog/blogListing.vue";
import blogDetail from "../views/blog/blogDetail.vue";
import highlightedWord from "../views/blog/highlightedWord.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: blogListing,
        meta: {
            title: "Blog Listing"
        },
        name: 'blogListing'
    },

    {
        path: '/blog/:id',
        component: blogDetail,
        meta: {
            title: "Blog Detail"
        },
        name: 'blogDetail'
    },

    {
        path: '/highlited-words',
        component: highlightedWord,
        meta: {
            title: "highlited Words"
        },
        name: 'highlightedWord'
    },

]

export const router = new VueRouter({
    mode: 'history',
    routes
})