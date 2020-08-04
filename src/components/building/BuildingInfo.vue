<template>
  <a-row :gutter="[16]">
    <input-container v-for="(item, index) in items" :key="index">
      <!-- :label="item.label" -->
      <a-form-item :required="item.required">
        <a-range-picker v-if="item.type === 'rangePicker'" />
        <a-select v-else-if="item.type === 'select'" style="width: 100%;" default-value="option1"
                  :class="{'now-empty-border': item.required}">
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
        <a-input v-else :placeholder="item.placeholder" :disabled="item.disabled"
                 :style="{borderColor: item.required? 'pink':''}">
        </a-input>
        <template slot="label">
          {{ item.label }}
          <a-tooltip title="Input box border color set to pink 
                     if the value is null when editing building info.">
            <a-icon type="question-circle-o" v-if="item.required"
                    :style="{ verticalAlign: 'baseline' }" />
          </a-tooltip>
        </template>
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
  { label: "Building Name", placeholder: "Building Name", required: true },
  {
    label: "Building Type",
    placeholder: "C-R-H",
    required: true,
    type: "select",
  },
  {
    label: "Property Company Name",
    placeholder: "Property Company Name",
    // required: true,
  },
  {
    label: "Entry status",
    placeholder: "Rental?? unit",
    // required: true,
    type: "select",
  },
  { label: "Area(e.g: square feet)", placeholder: "---" },
  { label: "Towers", placeholder: "Towers Number" },
  { label: "Lowest Floor", placeholder: "Lowest Floor" },
  { label: "Hightest Floor", placeholder: "Hightest Floor" },
  { label: "Basement", placeholder: "Basement" },
  { label: "Lifts", placeholder: "Lifts" },
  {
    label: "Company staying(Commercial)",
    placeholder: "For commercial building",
    // required: true,
  },
  {
    label: "Flats(入住公司/住户数)(Residencial)",
    placeholder: "For residencial building",
    // required: true,
  },
  { label: "Occupancy rate(入住率)", placeholder: "%" },
  { label: "Building Age(楼龄)", placeholder: "number" },
  {
    label: "Selling Price Range(Residencial) ",
    placeholder: "From to",
    // required: true,
  },
  {
    label: "Rental (租金)(Commercial)",
    placeholder: "per square feet per month",
    // required: true,
  },
  {
    label: "HOA fee ",
    placeholder: "Homeowners Association Fee per square feet per month",
    // required: true,
  },
  { label: "Population(per day) ", placeholder: "number" },
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
.now-empty-border > .ant-select-selection {
  border-color: pink;
}
</style>