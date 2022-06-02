import React from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";


// map with redux
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// user
import User from "../../pages/sitemembers";

// permission

import Permission from "../../pages/permissions";
import managePermissions from "../../pages/permissions/manageUser/managePermissions";

// industry
import Industry from "../../pages/industry"
// context
import { useLayoutState } from "../../context/LayoutContext";


function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>

                <Route path="/admin/dashboard" component={Dashboard} />
                
                <Route exact path="/admin/map" component={Map} />
                <Route path="/admin/map/add" component={AddForm} />
                <Route path="/admin/map/edit/:id" component={EditForm} />
                
                <Route exact path="/admin/user/" component={User} />
                {/* <Route exact path="/admin/permission/" component={Permission} /> */}
                <Route exact path="/admin/permission/" component={managePermissions} />
                <Route exact path="/admin/industry/" component={Industry} />

              </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
