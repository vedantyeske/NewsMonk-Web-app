import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,ImageUrl,Url,author,date} = this.props;
    return (
        <div className="card">
        <img src={ImageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>

          <a href={Url} target='_blank' className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default Newsitem