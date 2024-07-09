<template>
  <div class="flex h-full w-full flex-col py-2 text-red-300">
    <div class="h-12 border-b border-solid border-red-300">
      <div class="flex flex-row items-center px-4">
        <div class="flex-1 font-semibold">LLM Models</div>
        <UiIconButton
          text="Add"
          icon="material-symbols:add-rounded"
          @click="handlers.handleAddLlm"
        />
      </div>
    </div>
    <div
      class="flex max-h-[calc(100dvh-64px)] min-h-[calc(100dvh-64px)] flex-col gap-2 overflow-y-auto p-2"
    >
      <div
        v-for="llm of stores.ls.llmModels"
        :key="llm.uuid"
        class="flex flex-col rounded border border-solid border-red-300 p-2"
      >
        <div class="flex flex-row items-center">
          <div class="flex w-full flex-1 flex-row items-center p-1">
            <div class="min-w-24">Name:</div>
            <input
              v-model="llm.name"
              type="text"
              class="w-full bg-slate-950"
              @change="handlers.handleUpdateLlm(llm)"
            />
          </div>
          <Icon
            name="material-symbols-light:delete-outline-rounded"
            size="20"
            class="cursor-pointer"
            @click="handlers.handleDeleteLlm(llm)"
          />
        </div>
        <div class="flex flex-row items-center p-1">
          <div class="flex w-full flex-1 flex-row items-center gap-2">
            <div class="w-24">API Key:</div>
            <input
              v-model="llm.apiKey"
              type="text"
              class="w-full bg-slate-950"
              @change="handlers.handleUpdateLlm(llm)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useLlmModelStore } from '~/stores/llmModels'
import { LLMModel } from '~/types/ui'

export default defineComponent({
  components: {},
  setup() {
    const ls = useLlmModelStore()
    const handleAddLlm = () => {
      const instance = LLMModel.newInstance()
      ls.update(instance)
      ls.save()
    }
    const handleDeleteLlm = (instance: LLMModel) => {
      ls.remove(instance)
      ls.save()
    }
    const handleUpdateLlm = (instance: LLMModel) => {
      ls.update(instance)
      ls.save()
    }
    return buildDefineComponentSetup(
      {
        data: {},
        methods: {},
        handlers: {
          handleAddLlm,
          handleDeleteLlm,
          handleUpdateLlm,
        },
        stores: {
          ls,
        },
      },
      {}
    )
  },
})
</script>
