<template>
  <div>
    <!-- <p>
      Category(楼宇等级) / gender / marriage / vehicle / Income / consumption / age / education
    </p> -->
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
          <a-input v-else-if="item.type === 'addonAfter'" addon-after="%"
                   :placeholder="item.placeholder" :disabled="item.disabled" />
          <a-input v-else :placeholder="item.placeholder" :disabled="item.disabled" />
        </a-form-item>
      </input-container>
    </a-row>

    <!-- <p>
      Income / consumption / age / education
    </p> -->
    <a-row :gutter="[16]">
      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
        <a-form-item label="Education">
          <a-input placeholder="Low Education" addon-after="%" />
          <a-input placeholder="Medium Education" addon-after="%" />
          <a-input placeholder="Height Education" addon-after="%" />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
        <a-form-item label="Income">
          <a-input placeholder="Low Income" addon-after="%" />
          <a-input placeholder="Medium Income" addon-after="%" />
          <a-input placeholder="Height Income" addon-after="%" />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
        <a-form-item label="Consumption">
          <a-input placeholder="Low Consumption" addon-after="%" />
          <a-input placeholder="Medium Consumption" addon-after="%" />
          <a-input placeholder="Height Consumption" addon-after="%" />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :xs="24" :sm="24" :md="12" :lg="8" :xl="6" :xxl="4">
        <a-form-item label="Age">
          <a-input placeholder="Children" addon-after="%" />
          <a-input placeholder="Young" addon-after="%" />
          <a-input placeholder="Middle-aged" addon-after="%" />
          <a-input placeholder="Elderly" addon-after="%" />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
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
    label: "Category(楼宇等级)",
    placeholder: "Male",
    type: "select",
  },
  {
    label: "Male",
    placeholder: "Male",
    type: "addonAfter",
  },
  {
    label: "Married",
    placeholder: "Married",
    type: "addonAfter",
  },
  {
    label: "Vehicle",
    placeholder: "Vehicle Ratio",
    type: "addonAfter",
  },
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