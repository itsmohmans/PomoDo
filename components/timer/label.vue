<template>
  <div>
    <v-chip
      variant="outlined"
      :color="
        stats().stats[timer().currentLabel]
          ? stats().stats[timer().currentLabel].color
          : timer().settings[timer().currentSession].color
      "
      @click="state.dialog = true"
    >
      {{ timer().currentLabel ? timer().currentLabel : "No label" }}
    </v-chip>
    <v-dialog
      v-model="state.dialog"
      scrollable
      width="auto"
      :scrim="false"
      close-on-back
      retain-focus
    >
      <v-card title="Select Session Label">
        <v-divider class="mt-2"></v-divider>
        <v-card-text style="width: 400px">
          <v-form>
            <div v-if="state.newLabel.active" class="new-label-container">
              <v-text-field
                variant="underlined"
                label="Label title"
                :color="timer().settings[timer().currentSession].color"
                v-model="state.newLabel.title"
                required
                @update:focused="state.noTitleAlert = false"
              ></v-text-field>
              <v-color-picker
                hide-inputs
                show-swatches
                hide-canvas
                :swatches="state.swatches"
                mode="rgb"
                v-model="state.newLabel.color"
              ></v-color-picker>
              <v-alert
                v-if="state.noTitleAlert"
                density="compact"
                type="error"
                text="Please write the label title"
              ></v-alert>
            </div>
            <div class="add-label-btns">
              <v-btn
                :icon="state.newLabel.active ? 'mdi-check' : 'mdi-plus'"
                :color="timer().settings[timer().currentSession].color"
                :variant="state.newLabel.active ? 'flat' : 'outlined'"
                size="small"
                @click="addNewLabel"
              />
              <v-btn
                v-if="state.newLabel.active"
                icon="mdi-close"
                :color="timer().settings[timer().currentSession].color"
                variant="tonal"
                size="small"
                @click="state.newLabel.active = !state.newLabel.active"
              />
            </div>
          </v-form>
          <!------------ Labels list ---------------->
          <v-radio-group
            v-if="!state.newLabel.active"
            v-model="timer().currentLabel"
            column
          >
            <div
              v-for="(label, idx) in stats().getLabels"
              :key="idx"
              class="label-radio"
            >
              <v-radio
                :label="label"
                :value="label"
                :color="stats().stats[label].color"
              ></v-radio>
              <v-btn
                icon="mdi-delete-outline"
                size="x-small"
                variant="text"
                @click="deleteLabel(label)"
              ></v-btn>
            </div>
          </v-radio-group>
          <!----------------------------------------->
          <!--------- Confirm delete dialog --------->
          <v-dialog v-model="state.deleteLabel.dialog" width="auto">
            <v-card>
              <v-card-text
                >Are you sure you want to delete the label
                <b>"{{ state.deleteLabel.label }}"</b>?</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :color="timer().settings[timer().currentSession].color"
                  variant="text"
                  @click="state.deleteLabel.dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  :color="timer().settings[timer().currentSession].color"
                  variant="text"
                  @click="deleteLabel(state.deleteLabel.label)"
                >
                  Confirm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!----------------------------------------->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="timer().settings[timer().currentSession].color"
            variant="text"
            @click="state.dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { useTimerStore as timer } from "~~/stores/timer";
import { useStatsStore as stats } from "~~/stores/stats";

const state = reactive({
  dialog: false,
  newLabel: {
    active: false,
    title: "",
    color: "",
  },
  swatches: [
    ["#F44336", "#E91E63", "#9C27B0", "#673AB7"],
    ["#3F51B5", "#2196F3", "#03A9F4", "#00BCD4"],
    ["#009688", "#4CAF50", "#8BC34A", "#CDDC39"],
    ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722"],
    ["#795548", "#607D8B", "#9E9E9E", "#212121"],
  ],
  noTitleAlert: false,
  deleteLabel: {
    dialog: false,
    label: "",
  },
});

const addNewLabel = () => {
  if (state.newLabel.active) {
    if (state.newLabel.title !== "") {
      stats().addNewLabel(state.newLabel.title, state.newLabel.color);
      state.newLabel.active = false;
      state.newLabel.title = "";
      state.newLabel.color = "";
    }
    // if the label text is empty
    else state.noTitleAlert = true;
  } else state.newLabel.active = true;
};
const deleteLabel = (label) => {
  if (state.deleteLabel.dialog) {
    stats().removeLabel(label);
    state.deleteLabel.dialog = false;
    timer().currentLabel = stats().getLabels[0]
      ? stats().getLabels[0]
      : "No label";
  } else {
    state.deleteLabel.dialog = true;
    state.deleteLabel.label = label;
  }
};
watch(
  () => state.dialog,
  (dialog) => {
    if (!dialog) {
      // if dialog is closed
      state.newLabel.active = false;
      storeSettings();
    }
  }
);
</script>
<style scoped>
.add-label-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.new-label-container {
  margin-bottom: 2rem;
}
.label-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
