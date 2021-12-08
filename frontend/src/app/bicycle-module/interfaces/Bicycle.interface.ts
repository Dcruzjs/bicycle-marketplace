export interface BicycleResponse{
  BicycleDB: BicycleDB
}

export interface BicyclesResponse{
  BicyclesDB: BicycleDB[]
}

export interface BicycleDB{
  _id:string;
  title:string;
  description: string;
  location: string;
  price:number;
  ownerId:string;
  ownerEmail:string;
  ownerName:string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  __v:       number;
}

export interface Bicycle{
  title:string;
  description: string;
  location: string;
  price:number;
  ownerId:string;
  ownerEmail:string;
  ownerName:string;
  image?: string;
}

export interface BicycleErrorMsgs{
  titleError:string;
  descriptionError: string;
  locationError: string;
  priceError:string;
  Error:string;
}