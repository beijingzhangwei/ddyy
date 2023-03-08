<template>
  <div>我爱BCC</div>
    <div v-for="(item, index) in items" :key="index" class="menu-item">
      <hr>
      <hr>
      <hr>
      <span @click="toggleChildren(item)">{{ item.name }}</span>
      <div v-if="isOpen(item)" class="children-container">
        <div v-for="(chilItem, chilIndex) in item.children" :key="chilIndex" class="menu-item">
          <span>{{ chilItem.name }}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MyMenu',
  data() {
    return {
      openMap: {
        1: true
      },
      items: [{
        id: 1,
        name: '一级菜单1',
        children: [{
          id: 11,
          name: '二级菜单1-1',
        }, {
          id: 12,
          name: '二级菜单1-2',
        }, {
          id: 13,
          name: '二级菜单1-3',
        }],
      }, {
        id: 2,
        name: '一级菜单2',
        children: [{
          id: 21,
          name: '二级菜单2-1',
        }, {
          id: 22,
          name: '二级菜单2-2',
        }, {
          id: 23,
          name: '二级菜单2-3',
        }],
      }],
    }
  },
  methods: {
    toggleChildren(item) {
      if (this.isOpen(item)) {
        this.$delete(this.openMap, item.id);
      } else {
        this.$set(this.openMap, item.id, true);
      }
    }
    ,
    isOpen(item) {
      return this.openMap[item.id];
    }
    ,
  }
}
</script>