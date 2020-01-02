import React, { Component } from "react";
import { Redirect } from "react-router";
import { Switch } from "react-router-dom";

import PrivateRoute from "@routes/privateRoute";

import DialectType from '@pages/dialectType';
import Dialect from '@pages/dialect';
import Topic from '@pages/topic'
import Achieve from '@pages/achieve';
import Activity from '@pages/activity';
import Ad from '@pages/ad';
// import Course from '@pages/course';
import Feedback from '@pages/feedback';
import Notes from '@pages/notes';
import StartUp from '@pages/startUp';
import Union from '@pages/union';
import UnionDetail from '@pages/union/detail';
import ActivityMember from '@pages/union/activityMemberList';
import Unit from '@pages/unit';
import User from '@pages/user';
import Vip from '@pages/vip';
import Role from '@pages/role';

class Index extends Component {

    render() {
        return (
            <Switch>
                <PrivateRoute exact path="/dialect/type" component={DialectType} />
                <PrivateRoute exact path="/dialect/list" component={Dialect} />
                <PrivateRoute exact path="/unit" component={Unit} />
                {/* <PrivateRoute exact path="/course" component={Course} /> */}
                <PrivateRoute exact path="/topic" component={Topic} />
                <PrivateRoute exact path="/achieve" component={Achieve} />
                <PrivateRoute exact path="/activity" component={Activity} />
                <PrivateRoute exact path="/ad" component={Ad} />
                <PrivateRoute exact path="/feedback" component={Feedback} />
                <PrivateRoute exact path="/notes" component={Notes} />
                <PrivateRoute exact path="/startUp" component={StartUp} />
                <PrivateRoute exact path="/union" component={Union} />
                <PrivateRoute exact path="/union/detail" component={UnionDetail} />
                <PrivateRoute exact path="/union/detail/activity/member" component={ActivityMember} />
                <PrivateRoute exact path="/user" component={User} />
                <PrivateRoute exact path="/vip" component={Vip} />
                <PrivateRoute exact path="/role" component={Role} />
                <Redirect exact from="" to="/dialect/type" />
            </Switch>
        );
    }
}

export default Index;
