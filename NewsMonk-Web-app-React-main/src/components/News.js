import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: '6',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
   

      constructor(props){
        super(props);
        console.log("this is the constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }

        document.title = `NewsMonk - ${this.props.category}`
      }

     async componentDidMount(){

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f375586dc99242ac8ff942e182de9c84&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true})

             let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading: false
        })
      }


      handleprevclick = async ()=>{
          console.log("prev")
          
          let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f375586dc99242ac8ff942e182de9c84&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

             this.setState({loading: true})
             let data = await fetch(url);
             let parsedData = await data.json()
             console.log(parsedData);
      
            this.setState({
              page: this.state.page - 1,
              articles: parsedData.articles,
              loading: false
        })
      }

      handleNextClick = async ()=>{
        console.log("next")
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f375586dc99242ac8ff942e182de9c84&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

             this.setState({loading: true})
             let data = await fetch(url);
             let parsedData = await data.json()
             console.log(parsedData);
      
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
          
        })
      }
    }
 
  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center' style={{margin: '35px 0px'}}>NewsMonk - Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?element.title:''} description={element.description?element.description:''} ImageUrl={element.urlToImage?element.urlToImage:'https://cdn.wionews.com/sites/default/files/2024/01/06/403973-untitled-design-2024-01-06t112856763.png'} Url={element.url} author={element.author} date={element.publishedAt}/>
                </div>
            })}
            
            <div className="btn1 d-flex flex-row-reverse bd-highlight my-3">
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} onClick={this.handleNextClick} className="btn btn-dark p-2 bd-highlight mx-4">Next &rarr;</button>
            <button type="button" disabled={this.state.page<=1} onClick={this.handleprevclick} className="btn btn-dark p-2 bd-highlight"> &larr; Previous</button>
            
            </div>
            
        </div>
        

      </div>
    )
  }
}

export default News