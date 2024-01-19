import React, { Component } from 'react'

export class NewItem extends Component {
    render() {
        let { title, description, imageUrl, newUrl, date, author,source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <div style={{display:'flex', justifyContent:'flex-end',position:'absolute', right:'0'}}>
                        
                <span className="badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}} >{source?source:"unkown"}</span>
                    </div>
                    <img src={!imageUrl ? "https://www.nasa.gov/wp-content/uploads/2024/01/gateway-airlock-photo.png" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title"> {title} 
                           </h5>

                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-muted'>By {author ? author : "Unknow"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newUrl} target='_blank' className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewItem
