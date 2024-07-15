import { v4 as uuidv4 } from "uuid";
export enum MenuItemKeys {
  KEY_BINDING = "KEY_BINDING",
  PROPMT = "PROPMT",
  LLM_MODELS = "LLM_MODELS",
}

export class MenuItem {
  public name = "";
  public icon = "";
  public key: MenuItemKeys = MenuItemKeys.KEY_BINDING;
  constructor(name: string, icon: string, key: MenuItemKeys) {
    this.name = name;
    this.icon = icon;
    this.key = key;
  }
}

const MenuItems: MenuItem[] = [
  new MenuItem("Hotkey", "octicon:keyboard", MenuItemKeys.KEY_BINDING),
  new MenuItem(
    "LLM Models",
    "streamline:travel-map-globe-model-planet-earth-globe-world",
    MenuItemKeys.LLM_MODELS
  ),
];
export default MenuItems;

export enum LLMModelType {
  GoogleGemini = "GoogleGemini",
  OpenAIChatGpt35 = "ChatGpt35",
}

export class LLMModel {
  public name = "";
  public uuid = "";
  public type = LLMModelType.GoogleGemini;
  public apiKey = "";
  public static newInstance(): LLMModel {
    const instance = new LLMModel();
    instance.uuid = uuidv4();
    return instance;
  }
}

export class KeyBinding {
  public uuid = "";
  public name = "";
  public prompt = "";
  public key = "1";
  public enabled = false;
  public keys: string[] = [];
  public llmUuid: string = "";
  public static newInstance(): KeyBinding {
    const instance = new KeyBinding();
    instance.uuid = uuidv4();
    return instance;
  }
}
