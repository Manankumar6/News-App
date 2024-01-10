import React, { Component } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps ={
        country: "in",
        pageSize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
capitalize = (string)=>{
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
        document.title= `${this.capitalize(this.props.category)}-News App`
    }
    async updateNews(){

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2ae96e7267ab4eddbf83c1971403885b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let prsData = await data.json();
        this.setState({
            articles: prsData.articles,
            totalResults: prsData.totalResults,
            loading:false
        });
    }
    async componentDidMount() {
        this.updateNews()
    }

 
    handlepreviosClick = async () => {
        console.log('previous clicked');
        this.setState({page: this.state.page - 1})
        this.updateNews()
    };

    handleNextClick = async () => {
        console.log('next clicked');
        this.setState({  page: this.state.page + 1})
        this.updateNews()
    };

    render() {
        return (
            <div className='my-3'>
                <div className="container my-3">
                    <h1 className='text-center'>News- Top {this.capitalize(this.props.category)} Headline </h1>
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((ele) => (
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
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlepreviosClick}>
                            &larr; Previous
                        </button>
                        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
