import React, { Component } from 'react';
import NewsItem from './Newsitem';
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:6,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    document.title=`${this.capitalizeFirst(this.props.category)}`-News;
  }

  capitalizeFirst = (str )=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  async componentDidMount() {
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d20e3f7d421d4f988fa1206322ead983&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30)
    this.setState({loading:true});
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100)
  }
  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d20e3f7d421d4f988fa1206322ead983&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  handleNext = async () => {
    this.props.setProgress(0)
    if (
      !(this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize))
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d20e3f7d421d4f988fa1206322ead983&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
      this.props.setProgress(100)
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'30px 0px',marginTop:'85px'}}>Top {this.capitalizeFirst(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((Element) => {
            return (
              <div className="col-md-4" key={Element.url}>
                <NewsItem
                  title={Element.title ? Element.title.slice(0, 45) : ' '}
                  description={
                    Element.description ? Element.description.slice(0, 88) : ' '
                  }
                  imageUrl={Element.urlToImage}
                  newsUrl={Element.url}
                  author={Element.author}
                  date={Element.published}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
//d20e3f7d421d4f988fa1206322ead983
export default News;
