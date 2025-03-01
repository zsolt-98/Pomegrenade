import mongoose, { Document, Schema, Model, mongo } from "mongoose";

interface FoodEntry extends Document {
  userId: Schema.Types.ObjectId;
  food_id: string;
  food_name: string;
  food_description: string;
  servingSize: string;
  servings: number;
  addedAt: Date;
}

const foodEntrySchema = new Schema<FoodEntry>({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  food_id: { type: String, required: true },
  food_name: { type: String, required: true },
  food_description: { type: String, required: true },
  servingSize: { type: String, required: true },
  servings: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now },
});

const foodModel: Model<FoodEntry> =
  mongoose.models.foodentry ||
  mongoose.model<FoodEntry>("foodentry", foodEntrySchema);

export default foodModel;
