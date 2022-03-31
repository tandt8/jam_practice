import React from 'react'
import { toast } from 'react-toastify'
import { BehaviorSubject, debounceTime } from 'rxjs'
import axios from 'axios'
const initialState = {
  name: '', brand: '', price: '', categories: [], image: '', description: '', currentInventory: ''
}

class AddInventory extends React.Component {
  subject = new BehaviorSubject(false);
  state = initialState
  clearForm = () => {
    this.setState(() => (initialState))
  }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value})
  }
  onImageChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ image: file })
    // const storageUrl = await Storage.put('example.png', file, {
    //     contentType: 'image/png'
    // })
    // this.setState({ image: storageUrl  })
  }
  addItem = async () => {
   
    const { name, brand, price, categories, image, description, currentInventory } = this.state

    
     
    if (!name || !brand || !price || !categories.length || !description || !currentInventory || !image) return
    if(image !== ''){
      
      const body = new FormData();
    // console.log("file", image)
    body.append("file", image);    
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
    let categoriesData =[];
    categoriesData.push(`${categories}`); 
    const data = window.localStorage.getItem('inventory');
    const inventory = JSON.parse(data);
   
    const newFileName = image.name.split('.');

            const newFormat = newFileName[1].toLowerCase();

            const newString = `${newFileName[0]}.${newFormat}`;

    const dataPush = {categories:categoriesData.join(","),name:name,price:parseInt(price),image:`/products/${newString}`,description:description,brand:brand,currentInventory:parseInt(currentInventory)};
    console.log(JSON.stringify(dataPush));
    const checkInsert =await axios.post('http://192.168.0.103:100/api/WeatherForecast/insertData',JSON.stringify(dataPush),{
      headers:{
        'Content-Type': 'application/json'
      }
    });
    if(checkInsert.status === 200 && checkInsert.data === 1)
    toast("Successfully added item to the inventory!", {
      position: toast.POSITION.TOP_LEFT
    })
    this.subject.next(true);

    this.subject.pipe(debounceTime(3000)).subscribe((x)=>{
      this.props.setView();
    })
     
    }
    this.clearForm();
    
    
    
  }
  render() {
    const {
      name, brand, price, categories, image, description, currentInventory
    } = this.state
    return (
      <div>
        <h3 className="text-3xl">Add Item</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Item name
                </label>
                <input
                onChange={this.onChange}
                value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Item price
                </label>
                <input
                onChange={this.onChange}
                value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Item price" name="price" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Item Description
                </label>
                <input
                onChange={this.onChange}
                value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Item Description" name="description" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                  Item image
                </label>
                <span className="sr-only">Choose file</span>
                <input className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-20
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
                  type="file"
                  onChange={(e) => this.onImageChange(e)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentInventory">
                  In stock
                </label>
                <input
                onChange={this.onChange}
                value={currentInventory} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="currentInventory" placeholder="Items in stock" name="currentInventory" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
                  Item categories
                </label>
                <input
                onChange={this.onChange}
                value={categories} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="categories" placeholder="Comma separated list of item categories" name="categories" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                  Item brand
                </label>
                <input
                onChange={this.onChange}
                value={brand} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="brand" placeholder="Item brand" name="brand" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={this.addItem} className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Add Item
                </button>
                <a onClick={this.clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                  Clear Form
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory