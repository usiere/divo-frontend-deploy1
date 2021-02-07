import { mapState, mapGetters, mapActions } from 'vuex'


export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarTheme: (state) => state.leftSidebarTheme,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
  }),
}


export const layoutMethods = mapActions('layout', [
  'changeLayoutType',
  'changeLeftSidebarTheme',
  'changeLeftSidebarType',
  'changeLayoutWidth',
])
