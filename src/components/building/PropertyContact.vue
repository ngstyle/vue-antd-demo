<template>
  <div>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <template
        v-for="col in ['name', 'position', 'phone', 'email']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key)"
            >
              <a>Cancel</a>
            </a-popconfirm>
            <a @click="del">Delete</a>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
              >Edit</a
            >
          </span>
        </div>
      </template>
    </a-table>

    <a-button
      type="dashed"
      :style="{ marginTop: '16px', width: '100%' }"
      @click="add"
    >
      Add +
    </a-button>
  </div>
</template>

<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Position",
    dataIndex: "position",
    width: "15%",
    scopedSlots: { customRender: "position" },
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: "25%",
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "25%",
    scopedSlots: { customRender: "email" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    position: 32,
    phone: 9354912130 + i,
    email: `${9354912130 + i}@abbieit.com`,
  });
}
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: "",
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    del() {
      console.log("delete...");
    },
    add() {
      const newData = [...this.data];
      newData.push({
        key: this.data.length.toString(),
        name: "",
        position: "",
        phone: "",
        email: "",
        editable: true,
      });

      this.data = newData;
      this.cacheData = this.data.map((item) => ({ ...item }));
    },
  },
};
</script>

<style>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
