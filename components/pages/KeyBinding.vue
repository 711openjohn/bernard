<template>
  <div class="flex h-full w-full flex-col py-2 text-red-300">
    <div class="h-12 border-b border-solid border-red-300">
      <div class="flex flex-row items-center px-4">
        <div class="flex-1 font-semibold">Key Binding</div>
        <UiIconButton
          text="Add"
          icon="material-symbols:add-rounded"
          @click="handlers.handleAddKeyBinding"
        />
      </div>
    </div>
    <div
      class="flex max-h-[calc(100dvh-64px)] min-h-[calc(100dvh-64px)] flex-col gap-2 overflow-y-auto p-2"
    >
      <div
        v-for="kb of stores.kbs.keyBinding"
        :key="kb.uuid"
        class="flex flex-col rounded border border-solid border-red-300 p-2"
      >
        <div class="flex flex-row items-center gap-2 p-1">
          <div class="flex w-full flex-1 flex-row items-center">
            <div class="min-w-24">Name:</div>
            <input
              v-model="kb.name"
              type="text"
              class="w-full bg-slate-950"
              @change="handlers.handleUpdateKeyBinding(kb)"
            />
          </div>
          <input
            v-model="kb.enabled"
            type="checkbox"
            @change="
              () => {
                if (kb.enabled) {
                  stores.kbs.enable(kb);
                }
                handlers.handleUpdateKeyBinding(kb);
                handlers.updateBackend();
              }
            "
          />
          <Icon
            name="material-symbols-light:delete-outline-rounded"
            size="20"
            class="cursor-pointer"
            @click="handlers.handleDeleteKeyBinding(kb)"
          />
        </div>
        <div class="flex flex-row items-center p-1">
          <div class="flex w-full flex-1 flex-row items-center">
            <div class="min-w-24">Key:</div>
            <div class="pr-3">command + shift +</div>
            <select
              v-model="kb.key"
              class="bg-slate-950"
              @change="
                () => {
                  kb.enabled = false;
                  stores.kbs.update(kb);
                }
              "
            >
              <option v-for="k of data.avaliableKeys" :key="k" :value="k">
                {{ k }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-row items-center p-1">
          <div class="flex w-full flex-1 flex-row items-center">
            <div class="min-w-24">Model:</div>
            <select
              v-model="kb.llmUuid"
              class="w-full bg-slate-950"
              @change="
                (e: any) => {
                  const llmUuid = e.target.value;
                  const llm = stores.ls.llmModelsLookup.get(llmUuid);
                  kb.llmUuid = llmUuid;
                  kb.enabled = false;
                  stores.kbs.update(kb);
                }
              "
            >
              <option
                v-for="llm of stores.ls.llmModels"
                :key="llm.uuid"
                :value="llm.uuid"
              >
                {{ llm.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-row items-center pt-3">
          <div class="flex w-full flex-1 flex-row items-center">
            <div class="min-w-24">Prompt:</div>
            <textarea
              v-model="kb.prompt"
              type="text"
              class="w-full rounded bg-red-300 p-1 text-slate-950"
              @change="handlers.handleUpdateKeyBinding(kb)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useKeyBindingStore } from "~/stores/keyBindings";
import { useLlmModelStore } from "~/stores/llmModels";
import { KeyBinding } from "~/types/ui";

export default defineComponent({
  components: {},
  setup() {
    const kbs = useKeyBindingStore();
    const ls = useLlmModelStore();
    const handleAddKeyBinding = () => {
      const instance = KeyBinding.newInstance();
      kbs.update(instance);
      kbs.save();
    };
    const handleDeleteKeyBinding = (instance: KeyBinding) => {
      kbs.remove(instance);
      kbs.save();
    };
    const handleUpdateKeyBinding = (instance: KeyBinding) => {
      kbs.update(instance);
      kbs.save();
    };
    const updateBackend = () => {
      kbs.notifyBackend(ls.llmModelsLookup);
    };
    const avaliableKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    return buildDefineComponentSetup(
      {
        data: {
          avaliableKeys,
        },
        methods: {},
        handlers: {
          handleAddKeyBinding,
          handleDeleteKeyBinding,
          handleUpdateKeyBinding,
          updateBackend,
        },
        stores: {
          kbs,
          ls,
        },
      },
      {}
    );
  },
});
</script>
