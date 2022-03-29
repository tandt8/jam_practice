import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'
import { useEffect,useState } from 'react'
import CartLink from '../components/CartLink'
import { InventoryContext } from '../context/inventoryContext'


const Home = ({ inventoryData = [], categories: categoryData = [] }) => {
  
  const[dataInventory, setDataInventory] = useState([...inventoryData.slice(0, 4)]);
  const[categoriesNew, setCategories] = useState([...categoryData.slice(0, 2)]);
  
  useEffect(()=>{
    if(typeof(window) !== 'undefined'){
      const data = window.localStorage.getItem('inventory');

      if(typeof(data) === 'undefined'){
        window.localStorage.setItem('inventory',JSON.stringify(inventoryData));
        
      }
      else{
        const newData =  JSON.parse(data);
        setDataInventory([...newData]);
        
        
        
        
       const  newCategories = dataInventory.reduce((acc, next) => {
          const categories = next.categories
          categories.forEach(c => {
            const index = acc.findIndex(item => item.name === c)
            if (index !== -1) {
              const item = acc[index]
              item.itemCount = item.itemCount + 1
              acc[index] = item
            } else {
              const item = {
                name: c,
                image: next.image,
                itemCount: 1
              }
              acc.push(item)
            }
          })
          return acc
        }, []);
        setCategories([...newCategories.slice(0, 2)]);
        
      }
    
    }
  })
   

  return (
    <> 
      <CartLink />
      <div className="w-full">
        <Head>
          <title>Jamstack ECommerce</title>
          <meta name="description" content="Jamstack ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js." />
          <meta property="og:title" content="Jamstack ECommerce" key="title" />
        </Head>
        <div className="bg-blue-300
        p-6 pb-10 smpb-6
        flex lg:flex-row flex-col">
          <div className="pt-4 pl-2 sm:pt-12 sm:pl-12 flex flex-col">
            <Tag
              year="2021"
              category="SOFAS"
            />
            <Center
              price="200"
              title={dataInventory[2].name}
              link={`/product/${slugify(dataInventory[2].name)}`}
            />
            <Footer
              designer="Jason Bourne"
            />
          </div>
          <div className="flex flex-1 justify-center items-center relative">
              <Showcase
                imageSrc={dataInventory[2].image}
              />
              <div className="absolute
              w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88
              bg-white z-0 rounded-full" />
          </div>
        </div>
      </div>
      <div className="
        lg:my-8 lg:grid-cols-2
        grid-cols-1
        grid gap-4 my-4 
      ">
        <DisplayMedium
          imageSrc={categoriesNew[0].image}
          subtitle={`${categoriesNew[0].itemCount} items`}
          title={titleIfy(categoriesNew[0].name)}
          link={`/category/${slugify(categoriesNew[0].name)}`}
        />
        <DisplayMedium
          imageSrc={categoriesNew[1].image}
          subtitle={`${categoriesNew[1].itemCount} items`}
          title={titleIfy(categoriesNew[1].name)}
          link={`/category/${slugify(categoriesNew[1].name)}`}
        />
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Trending Now</h2>
        <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the house.</p>
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between">
        <DisplaySmall
          imageSrc={dataInventory[0].image}
          title={dataInventory[0].name}
          subtitle={dataInventory[0].categories[0]}
          link={`/product/${slugify(dataInventory[0].name)}`}
        />

        <DisplaySmall
          imageSrc={dataInventory[1].image}
          title={dataInventory[1].name}
          subtitle={dataInventory[1].categories[0]}
          link={`/product/${slugify(dataInventory[1].name)}`}
        />

        <DisplaySmall
          imageSrc={dataInventory[2].image}
          title={dataInventory[2].name}
          subtitle={dataInventory[2].categories[0]}
          link={`/product/${slugify(dataInventory[2].name)}`}
        />

        <DisplaySmall
          imageSrc={dataInventory[3].image}
          title={dataInventory[3].name}
          subtitle={dataInventory[3].categories[0]}
          link={`/product/${slugify(dataInventory[3].name)}`}
        />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  
  const inventoryCategorized = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        }
        acc.push(item)
      }
    })
    return acc
  }, [])
  
  return {
    props: {
      inventoryData: inventory,
      categories: inventoryCategorized
    }
  }
}

export default Home