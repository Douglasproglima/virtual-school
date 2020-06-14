import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      {/* isClosed define que a rota está fechada para o acesso externo  */}
      {/* <MyRoute exact path="/" component={Students} isClosed /> */}
      <PrivateRoute exact path="/" component={Students} isClosed={false} />
      <PrivateRoute exact path="/student/:id/edit" component={Student} isClosed={true} />
      <PrivateRoute exact path="/student/" component={Student} isClosed={true} />
      <PrivateRoute exact path="/photos/:id" component={Photos}  isClosed={true} />
      <PrivateRoute exact path="/login" component={Login} isClosed={false} />
      <PrivateRoute exact path="/register/" component={Register} isClosed={false} />
      <PrivateRoute path="*" component={Page404} />
    </Switch>
  );
}
