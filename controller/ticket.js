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
                console.log({ticket})
                if(ticket.length===0){
                    return res.status(404).json("ticket not found !!");
                }
                else
                {
                    const productOfTicket = ticket.map((item)=>item.Product)
                    console.log({productOfTicket})
                    const ticketProduct   = productOfTicket.map((item,i)=>{
                        productTicket= item.map((i)=>i.pname)  
                    })
                    console.log({productTicket})
                    ////a verifier offer toul 
                    const ProductOffer = await OfferModel.find();
                    const nameProduct =ProductOffer.map(item=>item.productName);
                    console.log({nameProduct})
                    const intersection = productTicket.filter(element=>nameProduct.includes(element)).toString();
                    if(!intersection){
                        return res.status(404).json("pas de offer dans votre ticket ")
                        
                    }else{

                        console.log({intersection})
                       const checkProduct = await OfferModel.findOne({productName:intersection});
                       console.log({checkProduct: checkProduct})
                    //    const offerId=checkProduct.offer.toString();
                    //    console.log({offerId})
                    //    const offer = await OfferModel.findById(offerId);
                       const detailTicket = productOfTicket.map((item,i)=>{
                       productTicketDetail =item.filter((element)=>element.pname===intersection);
                       });
                       if(productTicketDetail){
                           console.log({productTicketDetail})
                           productTicketDetail.map((item)=>{
                               montantARembourser = (checkProduct.percentage/100)*item.pquantity*item.pupri;
                           })
                           console.log(typeof(montantARembourser))
                           const userbeforeUpdate= await User.findById(idUser);
                           console.log(userbeforeUpdate.cagnotte);
                           const user = await User.findByIdAndUpdate({
                               _id:idUser
                           },{
                               cagnotte:userbeforeUpdate.cagnotte + montantARembourser,
                               $push:{
                                   historique:{
                                       offerId:checkProduct._id,
                                       montant:montantARembourser
                                   }
                               }
       
                           }).exec();
                           return res.status(200).json({productOfTicket,nameProduct,productTicket,intersection,offer:{condition:checkProduct.condition,quantite:checkProduct.quantity,percentage:checkProduct.percentage},productTicketDetail,montantARembourser,user});
                       }else{
                           return res.status(404).json({message:"aucun offer dans votre ticket"})
                       }
                    }
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