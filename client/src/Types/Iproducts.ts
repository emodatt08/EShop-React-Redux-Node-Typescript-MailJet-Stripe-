
interface Results {
  productId?: string,
  image?: string,
  title?: string,
  price?: string|number,
  description?: string, 
}
export default interface IProducts extends Results {
   results?: Results[] ,
   total?: number,
   per_page?: number,
   current_page?: number,
   next?: {},
   previous?: {}
}