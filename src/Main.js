import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Newsfeed from './Newsfeed';
import FullArcticle from './FullArcticle/FullArcticle';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      page: 1,
      parent: this
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact render={() => <Newsfeed {...this.state} />} />
          <Route path={'/:id'} render={() => <FullArcticle {...this.state} />} />
        </Switch>
      </div>
    );
  }
}

export default Blog;