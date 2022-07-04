<template>
  <b-row class="d-flex blog-list" no-gutters>
    <b-col cols="3">
      <b-card
        v-b-modal.create-blog-modal
        border-variant="info"
        tag="article"
        class="m-3"
      >
        <b-card-text class="d-flex justify-content-center align-center">
          <span v-b-tooltip.hover.v-info title="Create New Blog">
            <b-icon
              class="h1 mb-0 outline-none"
              icon="plus-square-fill"
              variant="info"
              style="height: 153px; width: 153px"
            ></b-icon>
          </span>
        </b-card-text>
      </b-card>
    </b-col>

    <b-col
      cols="3"
      v-for="blog in getBlogs(currentlyHighlitedWord)"
      :key="blog.id"
    >
      <blog-listing-card
        :blog="blog"
        :currentlyHighlitedWord="currentlyHighlitedWord"
        @editBlog="editBlog(blog)"
      />
    </b-col>

    <b-modal
      id="create-blog-modal"
      ref="modal"
      :title="`${blog.isUpdating ? 'Update' : 'Create New'} Blog`"
      @hidden="resetModal"
      @ok="handleOk"
      ok-title-html="Submit"
    >
      <b-alert v-if="errorMessage != null" show variant="danger">
        {{ errorMessage }}
      </b-alert>

      <form ref="form" @submit.prevent="handleSubmit">
        <b-form-group>
          <b-form-input
            id="title-input"
            v-model="blog.title"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <quill-editor
            v-model="blog.content"
            ref="blogContentRef"
            :options="editorOption"
            required
            @blur="onEditorBlur($event)"
          >
          </quill-editor>
        </b-form-group>

        <div id="custom-toolbar">
          <b-icon
            @mousedown="highlighWordHandler"
            icon="lightbulb-fill"
            variant="light"
            class="h4 mb-0"
          ></b-icon>
        </div>

        <b-form-group v-if="blog.highlightedWords">
          <b-form-tags
            :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
            v-model="blog.highlightedWords"
            separator=","
            disabled
            placeholder=""
            remove-on-delete
            no-add-on-enter
            tag-pills
            tag-variant="primary"
          ></b-form-tags>
        </b-form-group>
      </form>
    </b-modal>
  </b-row>
</template>

<script>
import blogListingCard from "@/components/blogListingCard.vue";
import { mapGetters } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Mark from "mark.js";

import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      blog: {
        id: 0,
        title: "",
        content: "",
        isUpdating: false,
        highlightedWords: [],
      },
      errorMessage: null,
      editorOption: {
        theme: "bubble",
        placeholder: "Enter blog content",
        modules: {
          toolbar: "#custom-toolbar",
        },
      },
      currentlyHighlitedWord: "",
    };
  },

  components: {
    blogListingCard,
    quillEditor,
  },

  computed: {
    ...mapGetters(["getBlogs"]),
  },

  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },

    resetModal() {
      this.blog = {
        id: 0,
        title: "",
        content: "",
        isUpdating: false,
        highlightedWords: [],
      };
    },

    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      if (!this.checkFormValidity()) {
        this.errorMessage = "All the form fields are required.";
        return;
      }

      this.errorMessage = null;

      this.blog.id =
        this.blog.id == 0
          ? this.getBlogs(this.currentlyHighlitedWord).length + 1
          : this.blog.id;

      this.$store.dispatch("addEditBlog", this.blog);

      this.$bvToast.toast(
        `Blog ${this.blog.isUpdating ? "updated" : "created"} successfully`,
        {
          title: "Wohoo!",
          variant: "success",
          solid: true,
        }
      );

      this.$nextTick(() => {
        this.$bvModal.hide("create-blog-modal");
      });
    },

    editBlog(blog) {
      this.blog = JSON.parse(JSON.stringify(blog));
      this.blog.isUpdating = true;
      this.$bvModal.show("create-blog-modal");
    },

    highlighWordHandler() {
      let { index, length } = this.$refs.blogContentRef.quill.getSelection();
      let selectedText = this.$refs.blogContentRef.quill.getText(index, length);
      if (selectedText.match(/^[0-9a-zA-Z]+$/)) {
        this.errorMessage = null;
        this.blog.highlightedWords.push(selectedText);
      } else {
        this.errorMessage = "Only alphanumeric text can be highlighted";
      }
    },

    onEditorBlur(quill) {
      this.blog.content = quill.getText();
    },
  },
  mounted() {
    this.currentlyHighlitedWord = this.$route.query.highlightedWord;
    if (this.currentlyHighlitedWord) {
      setTimeout(() => {
        let markInstance = new Mark(document.querySelector(".blog-list"));
        markInstance.mark(this.currentlyHighlitedWord, {
          separateWordSearch: true,
          diacritics: true,
          acrossElements: true,
        });
      }, 100);
    }
  },
};
</script>

<style scoped>
.outline-none {
  outline: unset;
}
</style>