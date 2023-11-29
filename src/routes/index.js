import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "./HomePage"

export default createRouter({
	history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
	routes: [
    {
      path:"/",
      component: HomePage
    }
  ],
});
