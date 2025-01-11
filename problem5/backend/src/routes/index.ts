import resourceRouter  from './resourceRoutes';

export const routes = [
    { path: '/api/resources', router: resourceRouter },
  ];

export { resourceRouter };
