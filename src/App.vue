<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      collapsible
      :width="width"
      :collapsed-width="collapsedWidth"
      :trigger="null"
      :style="{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, boxShadow: '2px 0 6px rgba(0,21,41,.35)', zIndex: 1 }"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :default-selected-keys="[$route.path]"
      >
        <a-menu-item key="/create-order">
          <router-link :to="{path: 'create-order'}">
            <a-icon type="user" />
            <span>Create Order</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/building">
          <router-link :to="{path: 'building'}">
            <a-icon type="video-camera" />
            <span>Building Management</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0;
        z-index: 10;
        box-shadow: 0 .5px 0px rgba(0,21,41,.15);
        display: flex; justify-content: space-between; position: fixed; transition: all 0.2s"
        :style="{width: `calc(100% - ${collapsed ? collapsedWidth : width}px)`}"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="onCollapse"
        />

        <a-icon
          class="trigger"
          :type="'user'"
        />
      </a-layout-header>
      <a-layout-header />

      <a-layout-content :style="{ margin: '24px 24px 0' }">
        <router-view />
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      width: 240,
      collapsedWidth: 80,
    };
  },
  methods: {
    onCollapse() {
      this.collapsed = !this.collapsed;
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  padding: 23px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>