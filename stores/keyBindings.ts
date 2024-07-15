import { defineStore } from "pinia";
import { KeyBinding, LLMModel } from "~/types/ui";

const storageKey = "ui/keybinding";

export const useKeyBindingStore = defineStore("ui/keybinding", {
  state: () => {
    const storage = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    ) as KeyBinding[];
    return {
      keyBinding: storage,
      keyBindingLookup: new Map<string, KeyBinding>(
        storage.map((lm) => {
          return [lm.uuid, lm];
        })
      ),
    };
  },
  actions: {
    save() {
      localStorage.setItem(storageKey, JSON.stringify(this.keyBinding));
    },
    enable(kb: KeyBinding) {
      this.keyBinding
        .filter((k) => {
          return kb.key === k.key && kb.uuid !== k.uuid;
        })
        .forEach((k) => {
          k.enabled = false;
        });
      this.keyBindingLookup = new Map<string, KeyBinding>(
        this.keyBinding.map((k) => {
          return [k.uuid, k];
        })
      );
    },
    update(kb: KeyBinding) {
      this.keyBindingLookup.set(kb.uuid, kb);
      this.keyBinding = Array.from(this.keyBindingLookup.values());
    },
    remove(kb: KeyBinding) {
      this.keyBindingLookup.delete(kb.uuid);
      this.keyBinding = Array.from(this.keyBindingLookup.values());
    },
    notifyBackend(llmIdLookUp: Map<string, LLMModel>) {
      const dataString = JSON.stringify(
        this.keyBinding.map((e: KeyBinding) => {
          const obj = new KeyBinding();
          obj.api_key = llmIdLookUp.get(e.llmUuid)?.apiKey || "";
          obj.type = llmIdLookUp.get(e.llmUuid)?.type || "";
          return Object.assign(obj, e);
        })
      );
      window.electronAPI.sendData(JSON.parse(dataString));
    },
  },
});
