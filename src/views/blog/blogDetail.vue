<template>
  <b-jumbotron
    v-show="blog != null"
    style="height: 100vh"
    :header="blog && blog.title"
    class="mb-0"
  >
    <div v-html="blog && blog.content"></div>
  </b-jumbotron>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      blog: null,
    };
  },

  mounted() {
    let id = this.$route.params.id;
    this.blog = this?.$store?.state?.blog?.blogs?.find(blog => blog.id == id)
  },
};
</script>

<style>
</style>