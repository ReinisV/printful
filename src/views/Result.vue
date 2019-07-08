<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Thanks, {{userName}}!</h1>
      </b-col>
    </b-row>

    <b-row class="mt-3" v-if="result">
      <b-col>
        <span>You responded correctly to {{result.correct}} out of {{result.total}} questions!</span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

type SubmitResponse = { correct: number, total: number }

@Component
export default class Result extends Vue {
  private result: SubmitResponse | null = null;

  private get quizId (): number {
    return parseInt(this.$route.params.quizId)
  }

  private get userName (): string {
    return this.$route.params.userName
  }

  private get answerIds (): number[] {
    return JSON.parse(this.$route.params.answerIds)
  }

  private created (): void {
    this.fetchResults()
  }

  private async fetchResults (): Promise<void> {
    const response = await axios.get(`https://printful.com/test-quiz.php?action=submit&quizId=${this.quizId}${this.answerIds.map(a => `&answers[]=${a}`).join()}`)
    this.result = response.data
  }
}
</script>
