<template>
  <b-container>
    <b-row v-if="activeQuestion" class="mt-3">
      <b-col>
        <h1>{{ activeQuestion.title }}</h1>
      </b-col>
    </b-row>

    <AnswerChoice
      v-if="currentQuestionNo !== null"
      :question-id="activeQuestion.id"
      :quiz-id="quizId"
      v-model="activeAnswerId" />

    <b-row v-if="currentQuestionNo !== null" class="mt-3">
      <b-col>
        <b-progress
          :value="currentQuestionNo"
          :max="overallQuestionCount"
          class="mb-3"></b-progress>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <b-button
          @click="nextQuestion"
          variant="primary"
          :disabled="activeAnswerId === null">Next</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

type Question = { title: string, id: number };

@Component({
  components: {
    AnswerChoice: () => import('@/components/AnswerChoice.vue')
  }
})
export default class Quiz extends Vue {
  private get quizId (): number {
    return parseInt(this.$route.params.quizId)
  }

  private get overallQuestionCount (): number {
    return this.questions.length
  }

  private questions: Question[] = [];
  private quizAnswers: number[] = [];
  private get activeQuestion (): Question | null {
    return (this.currentQuestionNo !== null && this.questions[this.currentQuestionNo]) || null
  };
  private currentQuestionNo: number | null = null;
  private activeAnswerId: number | null = null;

  private created (): void {
    this.fetchQuestions()
  }

  private async fetchQuestions (): Promise<void> {
    const response = await axios.get(`https://printful.com/test-quiz.php?action=questions&quizId=${this.quizId}`)
    this.questions = response.data
    this.currentQuestionNo = 0
  }

  private nextQuestion (): void {
    if (this.activeAnswerId === null) {
      return
    }

    this.quizAnswers.push(this.activeAnswerId)
    this.activeAnswerId = null

    const nextQuestionNo = this.currentQuestionNo! + 1

    if (this.questions[nextQuestionNo]) {
      this.currentQuestionNo = nextQuestionNo
    } else {
      this.submitAnswers()
    }
  }

  private submitAnswers (): void {
    this.$router.push({
      name: 'result',
      params: {
        ...this.$route.params,
        answerIds: JSON.stringify(this.quizAnswers)
      }
    })
  }
}
</script>
