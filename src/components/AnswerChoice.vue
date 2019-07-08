<template>
  <b-row>
    <b-col
      lg="3"
      md="4"
      sm="6"
      cols="12"
      class="pb-2"
      v-for="answer in answers"
      :key="answer.id">
      <b-button
        block
        size="lg"
        @click="selectAnswer(answer.id)"
        :variant="answer.isSelected ? 'primary' : 'outline-secondary'">{{answer.title}}</b-button>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'

type AnswerDto = { title: string, id: number };
type Answer = { title: string, id: number, isSelected: boolean };

@Component
export default class AnswerChoice extends Vue {
  @Prop() private value!: number | null;
  @Prop() private quizId!: number;
  @Prop() private questionId!: number;

  private created (): void {
    this.fetchAnswers()
  }

  @Watch('questionId')
  private onQuestionIdChanged (): void {
    this.fetchAnswers()
  }

  private async fetchAnswers (): Promise<void> {
    const response = await axios.get(`https://printful.com/test-quiz.php?action=answers&quizId=${this.quizId}&questionId=${this.questionId}`)
    this.answers = response.data.map((a: AnswerDto) => ({
      ...a,
      isSelected: false
    }))
  }

  private selectAnswer (answerId: number): void {
    const selectedAnswer = this.answers.find(a => a.id === answerId)
    if (selectedAnswer === undefined) {
      throw new Error(`no answer with answerId '${answerId}' was found in answers list`)
    }

    for (const answer of this.answers) {
      answer.isSelected = false
    }

    selectedAnswer.isSelected = true
    this.$emit('input', selectedAnswer.id)
  }

  private answers: Answer[] = [];
}
</script>
