import axios from "axios"

const uploadImage = async ( file ) => {
    
    if( !file ) return null

    try{

        const formData = new FormData()
        formData.append('upload_preset','curso-vue')
        formData.append('file', file)

        const url = 'http://api.cloudinary.com/v1_1/da0fz7qyf/image/upload'
        const { data } = await axios.post(url,formData)

        console.log(data)

        return data.secure_url
    }
    catch(error){
        console.log("Hubo un error al subir la imagen")
        console.log(error)
        return null
    }
    
}

export default uploadImage