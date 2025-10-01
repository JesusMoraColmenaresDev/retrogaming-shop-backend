export type GameAttributes = {
  id?: number;
  name: string;
  description: string;
  releaseDate: Date;
  platformId: number;
  genreId: number;
  stock: number;
  price: number;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
};
