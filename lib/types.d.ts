type CollectionType = {
  _id: string;
  title: string;
  image: string;
  description: string;
  products: CollectionType[];
};
type ProductsType = {
  _id: string;
  title: string;
  barcode: string;
  description: string;
  media: [string];
  collections:[CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: string;
  expense :string;
  createdAt : Date;
  updatedAt : Date;

}
type cartType = {
  item: [ProductsType];
  size:string;
  quantity: string;
}

type OrderType = {
  _id:string;
  username:string;
  cart:[cartType];
  createdAt : Date;
  updatedAt : Date;

}
