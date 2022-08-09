const { compare } = require('bcrypt');
const ProductModel = require('../model/ProductModel');
const Ticket = require('../model/ticket');
const User = require('../model/user');

const TicketController = {
    
        AddTicket:async(req,res)=>{
                try {
                    const _id=req.body.id
                    const recu=req.body.recu
                    console.log({id:_id,recu:recu.products})
                    const user =  await User.findById({_id});
                    if(!user){
                        return res.status(404).json({success:'false',message:'User Not Found !'})
                    }else
                        {   
                           const ticket = new Ticket({
                                magasin:recu.name,
                                Product:recu.products,  
                                dateAchat:recu.date,
                                prixTotal:recu.total,
                                idUser:_id
                           });

                           await ticket.save();
                           return await res.status(200).json({ticket})
                        }
                    
                } catch (error) {
                    res.status(500).json({success:'false',message:error})
                }
        },
        getUserTicket:async(req,res)=>{
            try {
                const _id=req.body.id;
                const user=await User.findById({_id});
                if(!user){
                    return res.status(404).json("user not found !!");
                }else{
                    let nom = user.nom
                    let prenom=user.prenom
                    let email=user.email;
                    let dateNaissance = user.date;
                    let genre = user.genre
                    return res.status(200).json({user:{nom,prenom,email,dateNaissance,genre}})
                }
            } catch (error) {
                console.log(error)
            }
        },
        getTicketByUser:async(req,res)=>{
            try {
                const idUser=req.body.id;
                console.log(idUser)
                const ticket= await Ticket.find({idUser});
                if(!ticket)
                    return res.status(404).json("ticket not found !!");

                    const product = await ProductModel.find();
                
                    return res.status(200).json({productOfTicket:ticket.magasin,product});
            } catch (error) {
                return res.status(500).json({success:false,error:error});
            }
        }
}

module.exports = TicketController