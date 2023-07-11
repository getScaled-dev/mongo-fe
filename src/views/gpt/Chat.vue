<template>
  <div class="d-flex justify-spac-between">
    <div style="width: 20%">
      <h4>Previous Chats</h4>
      <v-divider></v-divider>
      <div class="mt-3 mb-3 d-flex justify-space-between">
        <div>Write 10 Emails for...</div>
        <div>
          <v-btn small color="rgb(7, 2, 83)" dark>View</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="mt-3 mb-3 d-flex justify-space-between">
        <div>Write 10 Emails for...</div>
        <div>
          <v-btn small color="rgb(7, 2, 83)" dark>View</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    <v-divider vertical class="ml-2" inset></v-divider>
    <div style="width: 70%" class="ml-8">
      <v-card style="height: 80%;" class="mb-4">
        <v-expand-transition>
          <v-card
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
            color="blue-grey lighten-5"
          >
            <v-card-text class="pb-0">
            
              <p style="color: black">
                late 16th century (as a noun denoting a place where alms were
                distributed): from medieval Latin eleemosynarius, from late
                Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
              </p>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-card>
      <h4 class="mb-3">What would you like to work on?</h4>
      <v-textarea
        outlined
        name="input-7-4"
        label="Write Prompt Here..."
        v-model="gptPrompt"
      ></v-textarea>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn small color="rgb(7, 2, 83)" dark>Enter Here</v-btn>
          <v-btn small class="ml-3" @click="gptPrompt = ''">Clear</v-btn>
          <v-btn small class="ml-3" @click="gptPrompt = ''">Save</v-btn>

        </div>
        <div>
          <v-btn small color="rgb(215, 93, 63)" dark
            >Approve and send to GetScaled account</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gptPrompt: "",
    };
  },
};
</script>

<style scoped>
::v-deep .v-input__slot {
  background: white !important;
}
</style>
