import React, { Component } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.capitalize(this.props.category)}-News App`
    }
    async updateNews() {
      this.props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      this.props.setProgress(30)
      let prsData = await data.json();

      this.props.setProgress(50)
      this.setState({
          articles: prsData.articles,
          totalResults: prsData.totalResults,
          loading: false
        });
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
        let data = await fetch(url);
        let prsData = await data.json();
        this.setState({
            articles: this.state.articles.concat(prsData.articles),
            totalResults: prsData.totalResults,
         
        });
    }

    render() {
        return (
         
           <>
                    <h1 className='text-center'>News- Top {this.capitalize(this.props.category)} Headline </h1>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">

                            <div className="row">
                                { this.state.articles.map((ele) => (
                                    <div className="col-md-4" key={ele.url}>
                                        <NewItem title={ele.title ? ele.title : ""}
                                            description={ele.description ? ele.description.slice(0, 88) : ""}
                                            imageUrl={ele.urlToImage}
                                            newUrl={ele.url}
                                            author={ele.author}
                                            date={ele.publishedAt}
                                            source={ele.source.name}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </InfiniteScroll>
                   
              
           </>
         
        );
    }
}

export default News;
