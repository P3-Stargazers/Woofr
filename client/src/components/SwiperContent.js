import React from 'react'

function SwiperContent(props) {

    return (
        <div className="container">
            <button className="btn btn-primary"><i class="fas fa-comments fa-3x"></i></button>
            <img src={props.data.image} style={{ width: "300px", height: "300px" }} alt="no-image"/>
            <button className="btn btn-primary" onClick={props.nextPage}><i class="fas fa-thumbs-down"></i></button>
            <button className="btn btn-primary" onClick={props.nextPage}><i class="fas fa-thumbs-up"></i></button>
            <h2>Name: {props.data.dogName}</h2>
            <h2>Price: ${props.data.price}</h2>
            <h2>Age: {props.data.age}</h2>
            <h2>Breed: {props.data.breed}</h2>

            <p>Description: {props.data.description}</p>
        </div>
    )
}

export default SwiperContent