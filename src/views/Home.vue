<!--
 * @Author: xush
 * @Date: 2021-06-20 18:39:13
 * @Description:
-->
<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    // HelloWorld
  }
})
export default class Home extends Vue {
  created () {
    console.log(12346465)
  }
}
</script>
