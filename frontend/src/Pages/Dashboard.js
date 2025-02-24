import { useEffect, useState } from "react";
import { Authuse } from "../context";
import Server from "../Server";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate()
  const { logout,settoken } = Authuse();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [popupmodel,setpopupmodel]=useState({edit:false,delete:false,random:false})
  const [editingProduct,setEditingProduct]=useState()
  const fetchProducts = async () => {
    try {
      const response = await Server.get('/getproducts');
      console.log(response.data)
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
  };
const handleedit=(item)=>{
    console.log(item)
    setEditingProduct(item)
    setpopupmodel((prev)=>({...prev,edit:true,delete:false,random:true}))
}
const handleeditform=async(e)=>{
    e.preventDefault()
    console.log("hi")
    await Server.post('/editproducts',{...editingProduct}).then((res)=>{
      console.log(res.data)
    if(res.data.msg==="success"){
      fetchProducts()
      setpopupmodel((prev)=>({...prev,edit:false,delete:false,random:false}))
    }}).catch((err)=>{console.log(err)})
}
const handledelete=async(item)=>{
  setEditingProduct(item)
  setpopupmodel((prev)=>({...prev,delete:true,edit:false,random:true}))
}
const Deletemodel=()=>{
  return(
    <>
    <div className="delete-container">
      <div className="inner-container">
    Are you sure you want to delete?
    <button onClick={async()=>{ 
    await Server.post('/deleteproducts',{...editingProduct}).then((res)=>{
    console.log(res.data)
    if(res.data.msg==="success"){
    fetchProducts()
    setpopupmodel((prev)=>({...prev,delete:false,edit:false,random:false}))
  }}).catch((err)=>{console.log(err)})
 }}
>Yes</button>
    <button className="button-2" onClick={()=>  setpopupmodel((prev)=>({...prev,delete:false,edit:false}))}>No</button>
    </div>
    </div>
    </>
  )
}
const Editmodel=()=>{
  return (
    <>
<div className="popupmodel">
    <form className="edit-product-form" onSubmit={(e)=>handleeditform(e)}>
    <label>
        Category:
        <input
            type="text"
            value={editingProduct.category}
            onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
        />
    </label>
    <label>
        Title:
        <input
            type="text"
            value={editingProduct.title}
            onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
        />
    </label>
    <label>
        Description:
        <textarea
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
        />
    </label>
    <label>
        Image URL:
        <input
            type="url"
            value={editingProduct.image}
            onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
        />
    </label>
    <label>
        Price:
        <input
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
        />
    </label>
    <label>
        Rating:
        <input
            type="number"
            step="0.1"
            value={editingProduct.rating.rate}
            onChange={(e) => setEditingProduct({...editingProduct, rating: { ...editingProduct.rating, rate: e.target.value }})}
        />
    </label>
    <button type="submit" >Save Changes</button>
</form>
   </div>
    </>
  )
}

  return (
    <>
   {popupmodel.random? popupmodel.delete?<Deletemodel/>:<Editmodel/>  : <div className="dashboard-container">
      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error">{error}</div>}
      <div className="product-grid">
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <div key={index} className="product-card">
              <figure>
                <img alt={`Image of ${item.title}`} src={item.image} />
                <figcaption >{item.category}</figcaption>
                <figcaption>{item.title}</figcaption>
                <figcaption>{item.description}</figcaption>
                <figcaption className="price-tag">{'$' + item.price}</figcaption>
                </figure>
              <div className="action-buttons">
                <button onClick={()=>{handleedit(item)}}>Edit</button>
                <button onClick={()=>{handledelete(item)}}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
    </div>}
    </>
  );
};

export default Dashboard;
