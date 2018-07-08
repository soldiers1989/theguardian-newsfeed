import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom'

import Article from './Article/Article'

class Newsfeed extends Component {

  componentDidMount() {
    if (this.props.items.length === 0) {
      this.fetchMoreData();
    }
  }

  componentHandler = (id) => {
    this.props.history.push(id);
  }

  fetchMoreData = () => {
    axios.get(`https://content.guardianapis.com/search?api-key=90d49681-1cb7-4c04-b0f6-067da9d6e6cb&show-fields=thumbnail&page-size=20&page=${this.props.page}`).then(
      response => {
        const items = response.data.response.results.map((page, index) => {
          if (!page.fields) {
            page = {
              ...page, ...{
                fields:
                  { thumbnail: 'https://res-1.cloudinary.com/crunchbase-production/image/upload/v1412098443/kdic4eww1d9eatobvr5n.jpg' }
              }
            }
          }
          return (
            <Article
              key={page.id + index}  // if news was updated api does not give new id so only page.id gives key error.
              cliked={() => this.componentHandler(page.id)}
              img={page.fields.thumbnail}
              title={page.webTitle}
            />
          )
        })
        this.props.parent.setState({
          items: [...this.props.items, ...items],
          page: this.props.page + 1
        })
      }
    )
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', backgroundColor: 'lightGreen' }} >Infinite Scroll</h1>
        <hr />
        <InfiniteScroll
          dataLength={this.props.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        >
          {this.props.items}
        </InfiniteScroll>
      </div>
    );
  }
}
export default withRouter(Newsfeed);