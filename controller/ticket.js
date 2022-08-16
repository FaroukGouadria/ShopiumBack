const { compare } = require('bcrypt');
const OfferModel = require('../model/offresModel');
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
                           return await res.status(200).json({ticket,message:"merci de scanner Votre ticket , nous vous répondrons dans les  48 heures au maximum"});
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
           let productTicket;
           let productTicketDetail;
           let montantARembourser ;
            try {
                const idUser=req.body.id;
                console.log(idUser)
                const ticket= await Ticket.find({idUser});
                if(!ticket)
                    return res.status(404).json("ticket not found !!");

                const productOfTicket = ticket.map((item)=>item.Product)
                const ticketProduct   = productOfTicket.map((item,i)=>{
                    productTicket= item.map((i)=>i.pname)  
                })
                // console.log({ticketProduct})
                const product = await ProductModel.find();
                console.log(product)
                const nameProduct =product.map(item=>item.name);
                const intersection = productTicket.filter(element=>nameProduct.includes(element)).toString();
                               console.log({intersection})
                const name = intersection.toString()
                console.log({name})
                const checkProduct = await ProductModel.findOne({name:intersection});
                console.log({checkProduct: checkProduct})
                const offerId=checkProduct.offer;
                console.log({offerId})
                const offer = await OfferModel.findById(offerId);
                 console.log({condition:offer.condition,quantite:offer.quantity,percentage:offer.percentage})
                 const detailTicket = productOfTicket.map((item,i)=>{
                  productTicketDetail =item.filter((element)=>element.pname===intersection);
                 })
                 if(productTicketDetail){
                     console.log({productTicketDetail})
                     productTicketDetail.map((item)=>{
                        console.log(item)
                         montantARembourser = (offer.percentage/100)*item.pquantity*item.pupri;
                     })
                     console.log({montantARembourser})
                     const user = await User.findById(idUser)
                     if(user){
                        user.historique ={offerId:offerId,mantant:montantARembourser}
                        user.cagnotte = offer.cagnotte+montantARembourser
                     }
                     user.save();
                    return res.status(200).json({productOfTicket,nameProduct,productTicket,intersection,offer:{condition:offer.condition,quantite:offer.quantity,percentage:offer.percentage},productTicketDetail,montantARembourser,user});
                 }else{
                    return res.status(404).json({message:"aucun offer dans votre ticket"})
                 }
            } catch (error) {
                console.log({error})
                return res.status(500).json({success:false,error:error});
            }
        },
         sommeAchat:async(req,res)=>{
            try {
                const id=req.body.id
    
                const ticket = await Ticket.find({idUser:id})
                const sumachat = ticket.length
                const user= await User.findByIdAndUpdate({_id:id},{
                    achat:sumachat
                }).exec();
                if(user.achat==!0){
                    return res.status(200).json({user:user.achat})
                }else{
                    return res.status(404).json('user not found !!!')
                }
            } catch (error) {
                console.log(error)
                   return res.status(500).json({errorAchat:error})
            }
         }
}

module.exports = TicketController