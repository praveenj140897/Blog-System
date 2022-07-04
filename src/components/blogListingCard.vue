<template>
  <b-card border-variant="dark" tag="article" class="m-3">
    <b-card-title class="font-weight-bold">
      <router-link :to="{ name: 'blogDetail', params: { id: blog.id } }">
        {{ blog.title }}
      </router-link>
    </b-card-title>

    <b-card-text
      class="blog-list-content"
      v-html="getBlogContent(blog.content)"
    />

    <div class="d-flex justify-content-between">
      <div>
        <span v-b-tooltip.hover.v-primary title="Edit">
          <b-icon
            class="h5 mb-0 mr-2"
            icon="pencil-fill"
            variant="primary"
            @click="$emit('editBlog', blog)"
          ></b-icon>
        </span>

        <span v-b-tooltip.hover.v-danger title="Delete">
          <b-icon
            class="h5 mb-0"
            icon="trash2-fill"
            variant="danger"
            @click="deleteBlog(blog)"
          ></b-icon>
        </span>
      </div>
    </div>
  </b-card>
</template>

<script>

export default {
  props: {
    blog: Object,
    currentlyHighlitedWord: {
      type: String,
      default: "",
    },
  },
  methods: {
    deleteBlog(blog) {
      this.$swal({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch("deleteBlog", blog);
          this.$bvToast.toast(`Blog deleted successfully`, {
            title: "yup deleted",
            variant: "success",
            solid: true,
          });
        }
      });
    },
    getBlogContent(blogContent) {
      if (this.currentlyHighlitedWord) {
        let indexOfCurrentlyHighlitedWord = blogContent.indexOf(
          this.currentlyHighlitedWord
        );

        let trimmedBlogContent;

        trimmedBlogContent = blogContent.substring(
          indexOfCurrentlyHighlitedWord - 45,
          indexOfCurrentlyHighlitedWord + 90
        );
        trimmedBlogContent = trimmedBlogContent.substr(
          Math.min(
            indexOfCurrentlyHighlitedWord,
            trimmedBlogContent.indexOf(" ")
          ),
          Math.min(
            trimmedBlogContent.length,
            trimmedBlogContent.lastIndexOf(" ")
          )
        );
        return trimmedBlogContent;
      } else {
        return blogContent;
      }
    },
  }
};
</script>

<style scoped>
.blog-list-content {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>