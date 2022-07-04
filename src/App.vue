<template>
  <div id="app">
    <nav-bar />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import navBar from "./components/navBar.vue";

export default {
  components: {
    navBar,
  },
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.ql-editor {
  min-height: 100px !important;
  max-height: 200px !important;
  overflow: auto;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}

.ql-editor:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}

.ql-tooltip {
  min-width: 50px;
  text-align: center;
  padding: 5px;
}

.ql-container {
  font-family: inherit !important;
  font-size: inherit !important;
  color: #5b6268 !important;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.ql-blank::before {
  font-style: unset !important;
}

mark {
  background-color: orange !important;
  color: black;
}
</style>
