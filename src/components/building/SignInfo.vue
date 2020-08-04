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
        <a-input v-else :placeholder="item.placeholder" :disabled="item.disabled" />
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
const items = [
  {
    label: "Marketing Manager(Select)",
    placeholder: "Marketing Manager",
    type: "select",
    required: true,
  },
  {
    label: "Status(Select)",
    placeholder: "Follow-Maintenace-Complete-Cancel",
    type: "select",
    required: true,
  },
  {
    label: "Sign Date(DatePicker)",
    placeholder: "From ... To",
    type: "rangePicker",
  },
  { label: "Total Rental", placeholder: "Rental?? unit" },
  { label: "Rental Per Month", placeholder: "Rental", disabled: true },
  { label: "Bonus(percent)", placeholder: "Bonus" },
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