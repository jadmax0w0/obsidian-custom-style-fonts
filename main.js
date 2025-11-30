var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CustomStyleFontsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  boldFont: "",
  boldKeepStyle: true,
  italicFont: "",
  italicKeepStyle: true
};
var CustomStyleFontsPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.styleElement = null;
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new CustomFontSettingTab(this.app, this));
    this.updateCustomStyles();
  }
  onunload() {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.updateCustomStyles();
  }
  // 核心功能：生成并注入 CSS
  updateCustomStyles() {
    if (!this.styleElement) {
      this.styleElement = document.createElement("style");
      this.styleElement.id = "custom-style-fonts-plugin";
      document.head.appendChild(this.styleElement);
    }
    const cssRules = [];
    if (this.settings.boldFont && this.settings.boldFont.trim() !== "") {
      const weight = this.settings.boldKeepStyle ? "bold" : "normal";
      cssRules.push(`
				.markdown-preview-view strong,
				.cm-s-obsidian .cm-strong,
				strong {
					font-family: ${this.settings.boldFont} !important;
					font-weight: ${weight} !important;
				}
			`);
    }
    if (this.settings.italicFont && this.settings.italicFont.trim() !== "") {
      const style = this.settings.italicKeepStyle ? "italic" : "normal";
      cssRules.push(`
				.markdown-preview-view em,
				.cm-s-obsidian .cm-em,
				em {
					font-family: ${this.settings.italicFont} !important;
					font-style: ${style} !important;
				}
			`);
    }
    this.styleElement.textContent = cssRules.join("\n");
  }
};
var CustomFontSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "\u81EA\u5B9A\u4E49\u7C97\u4F53\u4E0E\u659C\u4F53\u5B57\u4F53" });
    containerEl.createEl("h3", { text: "\u7C97\u4F53 (Bold)" });
    new import_obsidian.Setting(containerEl).setName("\u7C97\u4F53\u5B57\u4F53\u5217\u8868").setDesc("\u8F93\u5165\u5B57\u4F53\u540D\u79F0\uFF0C\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\u3002\u4F8B\u5982\uFF1AArial, \u9ED1\u4F53, Microsoft YaHei\u3002\u7559\u7A7A\u5219\u4F7F\u7528\u9ED8\u8BA4\u5B57\u4F53\u3002").addText((text) => text.setPlaceholder("\u4F8B\u5982: Arial, \u9ED1\u4F53").setValue(this.plugin.settings.boldFont).onChange(async (value) => {
      this.plugin.settings.boldFont = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("\u4FDD\u7559\u7C97\u4F53\u52A0\u7C97\u6548\u679C").setDesc("\u5F00\u542F\uFF1A\u65B0\u5B57\u4F53\u5C06\u5E94\u7528\u52A0\u7C97\u6837\u5F0F\u3002\u5173\u95ED\uFF1A\u65B0\u5B57\u4F53\u5C06\u4EE5\u6807\u51C6\u5B57\u91CD(Normal Weight)\u663E\u793A\uFF08\u5373\u4F7F\u5B83\u662F\u7C97\u4F53\u6587\u672C\uFF09\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.boldKeepStyle).onChange(async (value) => {
      this.plugin.settings.boldKeepStyle = value;
      await this.plugin.saveSettings();
    }));
    containerEl.createEl("h3", { text: "\u659C\u4F53 (Italic)" });
    new import_obsidian.Setting(containerEl).setName("\u659C\u4F53\u5B57\u4F53\u5217\u8868").setDesc("\u8F93\u5165\u5B57\u4F53\u540D\u79F0\uFF0C\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\u3002\u4F8B\u5982\uFF1ATimes New Roman, \u6977\u4F53\u3002\u7559\u7A7A\u5219\u4F7F\u7528\u9ED8\u8BA4\u5B57\u4F53\u3002").addText((text) => text.setPlaceholder("\u4F8B\u5982: Times New Roman, \u6977\u4F53").setValue(this.plugin.settings.italicFont).onChange(async (value) => {
      this.plugin.settings.italicFont = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName("\u4FDD\u7559\u659C\u4F53\u503E\u659C\u6548\u679C").setDesc("\u5F00\u542F\uFF1A\u65B0\u5B57\u4F53\u5C06\u5E94\u7528\u503E\u659C\u6837\u5F0F\u3002\u5173\u95ED\uFF1A\u65B0\u5B57\u4F53\u5C06\u4EE5\u6B63\u7ACB\u6837\u5F0F(Normal Style)\u663E\u793A\uFF08\u5373\u4F7F\u5B83\u662F\u659C\u4F53\u6587\u672C\uFF09\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.italicKeepStyle).onChange(async (value) => {
      this.plugin.settings.italicKeepStyle = value;
      await this.plugin.saveSettings();
    }));
  }
};
