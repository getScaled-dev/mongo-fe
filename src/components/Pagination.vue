<template>
  <v-row no-gutters class="d-flex align-center justify-space-between my-2">
    <v-col cols="auto" v-if="showDropdown">
      <div class="no-text-transform d-flex align-baseline">
        <p class="font-12 font-weight-medium darkGrayText--text ma-3">
          Showing Records
          <span class="blackMain--text"> {{ commaSeparatedCount }} </span>
        </p>
      </div>
    </v-col>

    <v-col cols="6" class="d-flex align-center justify-end pr-0">
      <v-pagination
        :value="pagination.page"
        :length="paginationLength"
        :total-visible="6"
        @input="$emit('pageChangedEvent', $event)"
      ></v-pagination>
    </v-col>
  </v-row>
</template>
  
  <script>
export default {
  props: {
    pagination: {
      type: Object,
    },
    count: {
      type: Number,
      default: 0,
    },
    showDropdown: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      perPageChoices: [
        { text: "20", value: 20 },
        { text: "30", value: 30 },
        { text: "40", value: 40 },
      ],
    };
  },

  computed: {
    paginationLength() {
      return Math.ceil(this.count / this.pagination.itemPerPage);
    },
    commaSeparatedCount() {
      return this.count.toLocaleString();
    },
  },
};
</script>
  
  <style scoped>
.pagination-icon {
  margin-top: 6px;
  margin-right: 4px;
  height: 9px;
  width: 9px;
}
/* Selection */

::v-deep .theme--light.v-input {
  width: 50px !important;
}
::v-deep
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  padding: 0 6px !important;
}
::v-deep .v-input__slot {
  min-height: 25px !important;
  height: 25px !important;
}
/* unfold icon */
::v-deep
  .v-text-field--enclosed.v-input--dense:not(
    .v-text-field--solo
  ).v-text-field--outlined
  .v-input__append-inner {
  margin-top: 2px !important;
}
::v-deep .v-icon.v-icon {
  font-size: 20px !important;
}
/* Selection list */
::v-deep .v-list--dense .v-list-item,
::v-deep .v-list-item--link {
  min-height: 26px !important;
}
/* Pagination */
::v-deep .v-pagination__navigation {
  box-shadow: none !important;
  width: 16px !important;
}
::v-deep .v-pagination__item {
  box-shadow: none !important;

  margin: 0px !important;
  font-weight: 600;
  font-size: 12px;
  height: 20px !important;
  min-width: 20px !important;
}
::v-deep .v-pagination__more {
  font-weight: 300 !important;
}

p:first-letter {
  text-transform: capitalize;
}
</style>