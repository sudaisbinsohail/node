import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import crypto from 'crypto';


function generateCryptoId(length) {
    return crypto.randomBytes(length).toString('hex');
  }


cloudinary.config({ 
    cloud_name: "dg3d2qwkk", 
    api_key: "835785548599522", 
    api_secret:"IPMt8WI-lWzqTRL-9mw1D-DCK9c"
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profileimage',
      format: async (req, file) => 'png',
      public_id: (req, file ) => generateCryptoId(12)
    },
  });


  export {cloudinary , storage}

