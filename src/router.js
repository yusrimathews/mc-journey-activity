import { createRouter, createWebHistory } from 'vue-router';
import configModal from '@/components/configModal.vue';
import runningHover from '@/components/runningHover.vue';
import runningModal from '@/components/runningModal.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: configModal },
    { path: '/hover', component: runningHover },
    { path: '/modal', component: runningModal }
  ]
});

export default router;
