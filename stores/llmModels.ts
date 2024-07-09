import { defineStore } from 'pinia'
import type { LLMModel } from '~/types/ui'

const storageKey = 'ui/llmmodels'

export const useLlmModelStore = defineStore('ui/llmmodels', {
  state: () => {
    const storage = JSON.parse(localStorage.getItem(storageKey) || '[]') as LLMModel[]
    return {
      llmModels: storage,
      llmModelsLookup: new Map<string, LLMModel>(
        storage.map((lm) => {
          return [lm.uuid, lm]
        })
      ),
    }
  },
  actions: {
    save() {
      localStorage.setItem(storageKey, JSON.stringify(this.llmModels))
    },
    update(llmModel: LLMModel) {
      this.llmModelsLookup.set(llmModel.uuid, llmModel)
      this.llmModels = Array.from(this.llmModelsLookup.values())
    },
    remove(llmModel: LLMModel) {
      this.llmModelsLookup.delete(llmModel.uuid)
      this.llmModels = Array.from(this.llmModelsLookup.values())
    },
  },
})
