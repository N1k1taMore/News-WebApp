import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title ,description,imageUrl,newsUrl,author} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <img src={!imageUrl?"image.webp":imageUrl} className="card-img-top" alt="..."></img>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author}</small></p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
