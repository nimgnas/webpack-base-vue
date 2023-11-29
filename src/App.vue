<template>
  <h1>
    {{ msg }}
  </h1>
  <Hello />
</template>

<script>
import Hello from "~/components/HelloComponent";

export default {
  components: {
    Hello,
  },
  data() {
    return {
      msg: "app.vue",
    };
  },
};
</script>
