import mongoose , {Document,Schema} from 'mongoose'


export interface ISponsor extends Document{
    _id:mongoose.Types.ObjectId;
    name:string;
    link:string;
    image:string;
}

const sponsorSchema:Schema<ISponsor> = new Schema({
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




const SponsorModel = (mongoose.models.Sponsor as mongoose.Model<ISponsor>)   ||  mongoose.model<ISponsor>("Sponsor",sponsorSchema)
export default SponsorModel