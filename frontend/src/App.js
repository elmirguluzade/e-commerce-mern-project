import './App.css'
import Nav from './components/Nav/Nav'
import Product from './components/Product/Product'
import Category from './components/Category/Category'


const App = () => {
  return (
    <>
      <Nav />
      <div className="d-flex pos">
        <Category />
        <Product />
      </div>
    </>
  );
}

export default App;
