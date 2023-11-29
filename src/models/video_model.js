import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
import { user_model } from "./user_model";

const model_video = new mongoose.Schema({
 videoFile: {
  type: String,
  require: true
 },
 thumbnail: {
  type: String,
  require: true
 },
 title: {
  type: String,
  require: true
 },
 description: {
  type: String,
  require: true
 },
 duration: {
  type: Number,
  require: true
 },
 views: {
  type: String,
  require: true
 },
 isPublished: {
  type: String,
  require: true
 },
 owner:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "user_model"
 }

},{timestamps: true})
model_video.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("video", model_video);