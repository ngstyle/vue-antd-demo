<template>
  <a-row :gutter="[16]">
    <input-container v-for="(item, index) in items" :key="index">
      <a-form-item :label="item.label" :required="item.required">
        <a-range-picker v-if="item.type === 'rangePicker'" />
        <a-select v-else-if="item.type === 'select'" style="width: 100%" default-value="option1">
          <a-select-option key="1">
            option1
          </a-select-option>
          <a-select-option key="2">
            option2
          </a-select-option>
          <a-select-option key="3">
            option3
          </a-select-option>
        </a-select>
        <a-input v-else type="number" :placeholder="item.placeholder" :disabled="item.disabled" />
      </a-form-item>
    </input-container>
  </a-row>
</template>

<script>
const inputContainer = {
  template: `<a-col
        class="gutter-row"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="6"
        :xxl="4"
      >
        <slot></slot>
      </a-col>
  `,
};

// Screens / Posters / Projectors / Magic posters / Standing Screen
const items = [
  { label: "Screens", placeholder: "Screen number" },
  { label: "Posters", placeholder: "Poster number" },
  { label: "Magic posters", placeholder: "Magic poster number" },
  { label: "Standing Screen", placeholder: "Standing Screen number" },
  { label: "Projectors", placeholder: "Projector number" },
];
export default {
  components: {
    "input-container": inputContainer,
  },
  data() {
    return {
      items,
    };
  },
};
</script>

<style>
div.ant-form-item {
  margin-bottom: 12px;
}
/* div.ant-form-item-label {
  line-height: 2;
} */
</style>