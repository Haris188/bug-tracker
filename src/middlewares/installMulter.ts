
import * as multer from 'multer'
import Interactors from '../interactors/Interactors'

const storage = multer.memoryStorage()

const upload = multer({
    storage
})

const sendFileToInteractor = async (req, res, next)=>{
    const result = await new Interactors()
    .addAttachmentToTicketWithId({
        meta:{
            name: req.file.originalname,
            type: req.file.mimetype,
            ticketId: req.body.ticketId,
            serverUrl: `${req.protocol}://${req.get('host')}`
        },
        file:{
            buffer: req.file.buffer
        }
    })

    res.send(result)
}

export default (app)=>{
    app.post(
        '/fileupload', 
        upload.single('file'), 
        sendFileToInteractor
    )}

