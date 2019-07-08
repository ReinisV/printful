<template>
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axios from 'axios'

type Quiz = { title: string, id: number };
type Choice = { value: number | null, text: string };
const emptyChoice: Choice = { value: null, text: 'Choose test' }

@Component
export default class TestChoice extends Vue {
  @Prop() value!: number;

  private get selected (): number | null {
    const chosenChoice = this.options.find(opt => opt.value === this.value)
    return (chosenChoice && chosenChoice.value) || null
  }

  private set selected (value: number | null) {
    this.$emit('input', value || null)
  }

  private created (): void {
    this.fetchQuizzes()
  }

  private async fetchQuizzes (): Promise<void> {
    const response = await axios.get('https://printful.com/test-quiz.php?action=quizzes')
    const quizzes: Quiz[] = response.data
    this.options = [
      emptyChoice,
      ...quizzes.map(q => ({ value: q.id, text: q.title }))
    ]
  }

  private options: Choice[] = [];
}
</script>
