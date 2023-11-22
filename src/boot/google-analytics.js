import ga from 'src/analytics.js';

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, sessionId);
  });
};
