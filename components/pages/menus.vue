<template>
  <div class="flex flex-col">
    <div class="flex w-full flex-col items-center p-4 text-blue-300">
      <Icon name="carbon:chip" size="48px" />
    </div>
    <div
      v-for="menu of data.MenuItems"
      :key="menu.key"
      class="flex flex-row items-center justify-center p-1"
      @click="handlers.handleMenuClicked(menu)"
    >
      <div
        class="flex w-full cursor-pointer flex-col items-center gap-3 rounded p-2 text-red-300"
        :class="{
          'bg-red-300 text-slate-950': stores.ms.selectedMenu.key === menu.key,
        }"
      >
        <Icon :name="menu.icon" size="24px" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useMenuStore } from "~/stores/menu";
import MenuItems, { MenuItem } from "~/types/ui";

export default defineComponent({
  components: {},
  setup() {
    const ms = useMenuStore();
    const handleMenuClicked = (key: MenuItem) => {
      ms.select(key);
    };
    return buildDefineComponentSetup(
      {
        data: {
          MenuItems,
        },
        methods: {},
        handlers: {
          handleMenuClicked,
        },
        stores: { ms },
      },
      {}
    );
  },
});
</script>
import { buildDefineComponentSetup } from '../../utils/internal'; import {
buildDefineComponentSetup } from '../../utils/internal';
