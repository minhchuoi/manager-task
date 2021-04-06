import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import HomePage from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import StopWatch from './pages/StopWatch';
import { store } from './store';
import { Provider } from 'react-redux';
type RouterProps = {
   path: string;
   component: React.FC<RouteComponentProps>;
   routes?: RouterProps[] | undefined;
   exact?: boolean;
};

const routes: RouterProps[] = [
   {
      path: '/',
      component: HomePage,
      exact: true,
   },
   {
      path: '/stopWatch',
      component: StopWatch,
   },
   {
      path: '/about',
      component: About,
   },
   {
      path: '',
      component: NotFound,
   },
];

const App: React.FC = () => {
   return (
      <Provider store={store}>
         <Router>
            <Switch>
               {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
               ))}
            </Switch>
         </Router>
      </Provider>
   );
};

function RouteWithSubRoutes(route: RouterProps) {
   return (
      <Route
         path={route.path}
         render={(props) => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} />
         )}
      />
   );
}

export default App;
