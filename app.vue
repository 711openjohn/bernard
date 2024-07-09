<template>
  <div class="flex h-full w-full flex-row bg-slate-950">
    <div class="h-full w-[120px] border-r border-solid border-red-300 px-2">
      <menus />
    </div>
    <KeyBinding
      v-if="stores.ms.selectedMenu.key === data.MenuItemKeys.KEY_BINDING"
    />
    <LlmModel
      v-if="stores.ms.selectedMenu.key === data.MenuItemKeys.LLM_MODELS"
    />
  </div>
</template>
<script lang="ts">
import KeyBinding from "./components/pages/KeyBinding.vue";
import LlmModel from "./components/pages/LlmModel.vue";
import Menus from "./components/pages/menus.vue";
import { useKeyBindingStore } from "./stores/keyBindings";
import { useLlmModelStore } from "./stores/llmModels";
import { useMenuStore } from "./stores/menu";
import { MenuItemKeys } from "./types/ui";
export default defineComponent({
  components: {
    Menus,
    KeyBinding,
    LlmModel,
  },
  setup() {
    const ms = useMenuStore();
    const kbs = useKeyBindingStore();
    const ls = useLlmModelStore();
    kbs.notifyBackend(ls.llmModelsLookup);
    return buildDefineComponentSetup(
      {
        data: {
          MenuItemKeys,
        },
        methods: {},
        handlers: {},
        stores: {
          ms,
        },
      },
      {}
    );
  },
});
</script>

<style lang="postcss">
html {
  @apply h-full;
  @apply w-full;
}

#__nuxt {
  @apply h-full;
  @apply w-full;
}

body {
  @apply m-0 !important;
  @apply h-full;
  @apply w-full;
}
</style>
import { buildDefineComponentSetup } from './utils/internal'
