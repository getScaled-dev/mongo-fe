<template>
  <ValidationProvider :name="name" :rules="rules" v-slot="{ errors, valid }">
    <v-text-field
      v-model="innerValue"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      :name="name"
      height="34"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },
    name: {
      type: [String],
      default: "",
    },
    // must be included in props
    value: {
      type: null,
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style scoped>
::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 34px;
}
::v-deep .v-text-field__details .v-messages {
  margin-top: 3px;
}
</style>
