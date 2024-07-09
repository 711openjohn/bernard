import { defineStore } from 'pinia'
import MenuItems, { MenuItem } from '~/types/ui'

export const useMenuStore = defineStore('ui/menu', {
  state: () => {
    return {
      selectedMenu: MenuItems[0],
    }
  },
  actions: {
    select(key: MenuItem) {
      this.selectedMenu = key
    },
  },
})
