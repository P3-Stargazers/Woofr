import React, { useRef, useState } from 'react'
import fetchJSON from "../../utils/API";
import { useStoreContext } from '../../utils/GlobalStore'
import "./SellerForm.css"

function SellerForm() {
    const [uploadImage, setUploadImage] = useState()
    const [prefSize, setPrefSize] =useState()
    const [{ id }, dispatch ]= useStoreContext()
    const sellerName = useRef()
    const dogName = useRef()
    const dogAge = useRef()
    const dogBreed = useRef()
    const dogPrice = useRef()
    const website = useRef()
    const description = useRef()

    function updateImage() {

        if (document.getElementById("formFile").files.length > 0) {
           const uploaded = document.getElementById("formFile").files[0]
           setUploadImage(uploaded)
        } else {
            setUploadImage()
        }
    }

    async function submitSeller() {

        const seller = {
            dogName: dogName.current.value,
            // image: response.data.link,
            age: Number(dogAge.current.value),
            size: prefSize,
            breed: dogBreed.current.value,
            price: Number(dogPrice.current.value),
            website: website.current.value,
            description: description.current.value
        }
        const result = await fetchJSON(`/api/users/sellers/${id}`, 'put', seller )
    }
    return (
        <div>
            <div className="input-group mb-3 mt-3">
                <span className="input-group-text" id="name1">Seller Name</span>
                <input type="text" className="form-control" placeholder="Seller Name" aria-label="Username" aria-describedby="name2" ref={sellerName}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Dog Name</span>
                <input type="text" className="form-control" placeholder="Dog Name" aria-label="Username" aria-describedby="basic-addon1" ref={dogName}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Upload Picture</span>
                <input className="form-control" type="file" id="formFile" accept="image/png, image/jpeg" onChange={updateImage} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Age</span>
                <input type="text" id="name2" className="form-control" placeholder="Age" aria-label="Username" aria-describedby="name2" ref={dogAge} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Size:</span>
                <div className="form-check form-check-inline">
                    <input className="form-check-input m-1" type="radio" id="inlineCheckbox1" value="option1" onClick={() => setPrefSize('xSmall')}/>
                    <label className="form-check-label" for="inlineCheckbox1" id="name2">X-Small</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="option2" onClick={() => setPrefSize('small')}/>
                    <label className="form-check-label" id="name2" >Small</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="option2" onClick={() => setPrefSize('medium')}/>
                    <label className="form-check-label" id="name2">Medium</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="option2" onClick={() => setPrefSize('large')}/>
                    <label className="form-check-label" id="name2" >Large</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="option2" onClick={() => setPrefSize('xLarge')} />
                    <label className="form-check-label" id="name2" >X-Large</label>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Breed</span>
                <input type="text" className="form-control" placeholder="Breed" aria-label="Username" aria-describedby="basic-addon1" ref={dogBreed}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Price (CAD)</span>
                <input type="text" className="form-control" placeholder="Price" aria-label="Username" aria-describedby="basic-addon1" ref={dogPrice}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name1">Website (optional)</span>
                <input type="text" className="form-control" placeholder="Website" aria-label="Username" aria-describedby="basic-addon1" ref={website}/>
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a Description here" id="floatingTextarea2" style={{ height: "100px" }} ref={description}></textarea>
                <label for="floatingTextarea2" id="name2">Description</label>
            </div>
            <button className="btn btn-success m-4 ms-0 mb-5" id="continue" onClick={submitSeller}>Continue</button>
        </div>
    )
}

export default SellerForm