<template>
  <div
    class="flex cursor-pointer flex-row items-center gap-2 rounded border border-solid border-red-300 p-2 hover:border-amber-300 hover:text-amber-300"
  >
    <Icon v-if="icon" :name="icon" size="18" />
    <div>{{ text }}</div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  components: {},
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: () => undefined,
    },
  },
  setup() {
    return buildDefineComponentSetup(
      {
        data: {},
        methods: {},
        handlers: {},
        stores: {},
      },
      {}
    )
  },
})
</script>
