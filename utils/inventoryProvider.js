import axios from 'axios'
import inventory from './inventory'


/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

async function fetchInventory() {

 const reponse = await axios.get('http://192.168.0.103:100/api/WeatherForecast/products',{
   headers:{
    'Content-Type': 'application/json'
  }

 });
 
  
  return Promise.resolve(reponse.data)
}

export {
  fetchInventory, inventory as staticInventory
}