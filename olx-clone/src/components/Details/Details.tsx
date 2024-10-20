import { useLocation } from "react-router-dom"

const Details = () => {

const location = useLocation()
const product = location?.state?.data;


console.log(location);


if (!product) {
  return <p>Product details not available.</p>; 
}
  return (
    // <div className="flex p-4">
    //   <img src={location?.state?.data?.image} alt="" />
    //   <div>
    //     <h1 className="font-bold text-3xl">$ {location?.state?.data?.price}</h1>
    //     <h1 className="mt-5"><span className="font-semibold"> Category:</span> {location?.state?.data?.category}</h1>
    //     <h1 className="mt-5"><span className="font-semibold"> Title:</span>{location?.state?.data?.title}</h1>
    //     <h1 className="mt-5"><span className="font-semibold"> Description:</span>{location?.state?.data?.description}</h1>
    //   </div>
    // </div>


    <div className="flex p-4">
    <img src={product?.image} alt={product?.title}  />
    <div className="ml-4">
      <h1 className="font-bold text-3xl">$ {product?.price}</h1>
      <h1 className="mt-5">
        <span className="font-semibold"> Category:</span> {product?.category}
      </h1>
      <h1 className="mt-5">
        <span className="font-semibold"> Title:</span> {product?.title}
      </h1>
      <h1 className="mt-5">
        <span className="font-semibold"> Description:</span> {product?.description}
        Looking for reliable electronics at great prices? Whether you're upgrading your tech or clearing out your gadgets, we have a wide range of products to meet your needs. From smartphones, laptops, and tablets to home appliances and gaming consoles, our collection offers the latest devices with excellent features. All items are well-maintained, fully functional, and ready for use. Browse through the listings, find the perfect gadget, and get the best deals today! Don't miss out on these amazing offers."**
      </h1>
    </div>
  </div>



  )
}

export default Details
