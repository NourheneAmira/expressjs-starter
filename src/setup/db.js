import mongoose from 'mongoose'

const databaseConnexion = () => {
    mongoose.connect(`${process.env.DATABASE_URL}`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err)=>console.log(`Could not connect to MongoDB...${err}`))
}

export default databaseConnexion