<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>Technical task</h1>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <NameInput v-model="usersName" />
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <TestChoice v-model="chosenQuizId" />
      </b-col>
    </b-row>

    <b-row class="mt-3" v-if="validationMessage.length > 0">
      <b-col>
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <span v-for="msg in validationMessage">{{msg}}</span>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
        <b-button variant="primary" :disabled="!isValid" @click="startQuiz">Start</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    NameInput: () => import('@/components/NameInput.vue'),
    TestChoice: () => import('@/components/TestChoice.vue')
  }
})
export default class Home extends Vue {
  private usersName: string = '';
  private chosenQuizId: number | null = null;

  private usersNameIsTouched = false;
  private chosenQuizIdTouched = false;

  private created (): void {
    this.watchForTouching('usersName', 'usersNameIsTouched')
    this.watchForTouching('chosenQuizId', 'chosenQuizIdTouched')
  }

  private watchForTouching (fieldName: string, touchFieldName: string): void {
    const unwatch = this.$watch(fieldName, () => {
      // @ts-ignore
      this[touchFieldName] = true
      unwatch()
    })
  }

  private get isValid (): boolean {
    if (this.usersName === '') {
      return false
    }

    if (this.chosenQuizId === null) {
      return false
    }

    return true
  }

  private get validationMessage (): string[] {
    const msgs: string[] = []
    if (this.usersName === '' && this.usersNameIsTouched) {
      msgs.push('please specify a user name')
    }

    if (this.chosenQuizId === null && this.chosenQuizIdTouched) {
      msgs.push('please choose a quiz')
    }

    return msgs
  }

  private startQuiz (): void {
    if (!this.isValid) {
      return
    }

    this.$router.push({
      name: 'quiz',
      params: {
        quizId: this.chosenQuizId!.toString(),
        userName: this.usersName
      }
    })
  }
}
</script>
