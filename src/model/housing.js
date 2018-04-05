import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let housingSchema = new Schema({
  SaleID: Number,
  ZPID: String,
  Address: String,
  Locality: String,
  State: String,
  ZipCode: Number,
  Latitude: Number,
  Longitude: Number,
  Price: Number,
  Bedrooms: Number,
  Bathrooms: Number,
  AreaSpace_SQFT: Number,
  Status: String,
  EstimatedRent: Number,
  YearBuilt: Number,
  HOAFee: Number,
  DaysOnZillow: Number,
  ViewsSinceListing: Number,
  Index2:	Number,
  Mortgage: String,
  Avg_Index2: Number,
  CashFlow: String,
  Avg_Price: Number,
  Avg_CashFlow: Number,
  Avg_Rent: Number,
  Price_PerSQFT: Number,
  Avg_Price_PerSQFT: Number,
  StdDev_SQFT: Number,
  StdDevPrice: Number,
  Schools: String,
  MLS_NO: String,
  ZEstimatePrice: Number,
  ZEstimateChange: Number,
  NeighborMedian: String,
  ZillowPredict: String,
  Fact: String,
  Description: String,
  FeatureData: String,
  ExtraData: String,
  URL_Link: String
});

let collectionName = 'houses';
module.exports = mongoose.model('Housing', housingSchema, collectionName);
