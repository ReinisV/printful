<template>
  <div>
    <b-form-input v-model="enteredName" placeholder="Enter your name"></b-form-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NameInput extends Vue {
  @Prop() value!: string;
  private get enteredName (): string {
    return this.value
  }

  private set enteredName (value: string) {
    this.$emit('input', value)
  }
}
</script>
