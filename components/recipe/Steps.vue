<template>
  <div>
    <draggable
      v-if="orderedSteps !== []"
      v-model="orderedSteps"
      @start="start"
      @end="end"
    >
      <div
        v-for="(step, index) in orderedSteps"
        :key="step.id"
        class="step flex flex-row justify-between"
      >
        {{ step.description }}<button @click="removeStep(index)">x</button>
      </div>
    </draggable>

    <button @click="showAddStep = true">Lägg till steg</button>
    <Recipe-AddStep
      v-show="showAddStep"
      @hideAddStep="showAddStep = false"
      @addStep="addStep"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag' // Don't forget to import gql
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },

  data() {
    return {
      orderedSteps: [],
      oldOrder: [],
      oldIndex: 0,
      showAddStep: false,
    }
  },
  mounted() {
    this.getSteps()
  },
  methods: {
    async start(event) {
      this.oldOrder = await [...this.orderedSteps]
      this.drag = true
      this.oldIndex = event.oldIndex
    },
    end(event) {
      this.drag = false
      const newIndex = event.newIndex
      // TODO Graphqlfråga - Uppdatera både oldIndex och newIndex med next step
      if (newIndex === this.oldIndex) {
        return null
      }
      const oldPointingStep = () => {
        if (this.oldIndex === 0) {
          return null
        }
        if (this.oldIndex === this.oldOrder.length - 1) {
          return {
            id: this.oldOrder[this.oldIndex - 1].id,
            next_step: null,
          }
        }
        return {
          id: this.oldOrder[this.oldIndex - 1].id,
          next_step: this.oldOrder[this.oldIndex + 1].id,
        }
      }

      const newPointingStep = () => {
        if (newIndex === 0) {
          return null
        }

        return {
          id: this.orderedSteps[newIndex - 1].id,
          next_step: this.orderedSteps[newIndex].id,
        }
      }

      const draggedStep = () => {
        if (newIndex === this.orderedSteps.length - 1) {
          return {
            id: this.oldOrder[this.oldIndex].id,
            next_step: null,
          }
        }
        return {
          id: this.oldOrder[this.oldIndex].id,
          next_step: this.orderedSteps[newIndex + 1].id,
        }
      }
      // console.log('oldPointingStep', oldPointingStep())
      // console.log('newPointingStep', newPointingStep())
      // console.log('dragged', draggedStep())
      if (oldPointingStep() !== null) {
        this.updateStep(oldPointingStep().id, oldPointingStep().next_step)
      }
      if (newPointingStep() !== null) {
        this.updateStep(newPointingStep().id, newPointingStep().next_step)
      }

      this.updateStep(draggedStep().id, draggedStep().next_step)
    },

    async addStep(title) {
      const newStep = await this.$apollo.mutate({
        mutation: gql`
          mutation ($description: String!, $recipe_id: Int!) {
            insert_step(
              objects: {
                description: $description
                next_step: null
                recipe_id: $recipe_id
              }
            ) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          description: title,
          recipe_id: this.$route.params.id,
        },
      })

      this.updateStep(
        this.orderedSteps[this.orderedSteps.length - 1].id,
        newStep.data.insert_step.returning[0].id
      )

      this.showAddStep = false
      location.reload()
    },
    async updateStep(id, nextStep) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!, $nextStep: Int!) {
            update_step(
              where: { id: { _eq: $id } }
              _set: { next_step: $nextStep }
            ) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id,
          nextStep,
        },
      })
    },
    async getSteps() {
      await this.$apollo
        .query({
          query: gql`
            query ($id: Int!) {
              step(where: { recipe_id: { _eq: $id } }) {
                id
                description
                next_step
              }
            }
          `,
          variables: {
            id: this.$route.params.id,
          },
        })
        .then((data) => {
          const steps = data.data.step
          if (steps === undefined) {
            return
          }
          // Sortera i linked list ordning
          const orderedSteps = []
          const lastStep = steps.find((el) => el.next_step === null)
          orderedSteps.push(lastStep)
          for (let step = 0; step < steps.length - 1; step++) {
            const nextStep = steps.find(
              (el) => el.next_step === orderedSteps[0].id
            )
            orderedSteps.unshift(nextStep)
          }
          this.orderedSteps = orderedSteps
        })
    },
    async removeStep(index) {
      // Uppdatera steget före med nytt nästa steg
      if (this.orderedSteps.length === index + 1) {
        await this.updateStep(this.orderedSteps[index - 1].id, null)
      } else {
        const beforeStep = index - 1
        const afterStep = index + 1
        await this.updateStep(
          this.orderedSteps[beforeStep].id,
          this.orderedSteps[afterStep].id
        )
      }

      // Radera befintligt steg
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($id: Int!) {
            delete_step(where: { id: { _eq: $id } }) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id: this.orderedSteps[index].id,
        },
      })
      location.reload()
    },
  },
}
</script>

<style scoped>
.step {
  /* border: 1px solid black;
  padding: 5px; */
}
</style>
