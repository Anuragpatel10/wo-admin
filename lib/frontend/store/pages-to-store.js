const pagesToStore = (pages = {}) => Object.entries(pages).map(([key, adminPage]) => ({
  name: key,
  component: adminPage.component,
  icon: adminPage.icon
}));
export default pagesToStore;