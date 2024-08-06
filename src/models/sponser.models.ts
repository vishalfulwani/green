import mongoose , {Document,Schema} from 'mongoose'


export interface ISponser extends Document{
    _id:mongoose.Types.ObjectId;
    name:string;
    link:string;
    image:string;
}

const sponserSchema:Schema<ISponser> = new Schema({
    name:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
},{timestamps:true})




const SponserModel = (mongoose.models.Sponser as mongoose.Model<ISponser>)   ||  mongoose.model<ISponser>("Sponser",sponserSchema)
export default SponserModel