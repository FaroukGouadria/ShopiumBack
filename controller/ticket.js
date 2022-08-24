const { compare } = require('bcrypt');
const OfferModel = require('../model/offresModel');
const ProductModel = require('../model/ProductModel');
const Ticket = require('../model/ticket');
const User = require('../model/user');

const TicketController = {
    
        AddTicket:async(req,res)=>{
                try {
                    let taille;
                    let productTicketDetail
                    let checkProduct;
                    let monanatTotal=0;
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

//::::::::::::::::::::::::::::::: block verification if product in ticket had offer or not ::::::::::::::::::::::::::::::::::::::: 
                   const product = ticket.Product
                   console.log({product})
                    const productOfTicket = product.map((item)=>item.pname)
                    ////a verifier offer toul ////////////////
                    console.log({productOfTicket})
                    const ProductOffer = await OfferModel.find();
                    const nameProduct =ProductOffer.map(item=>item.productName);
                    console.log({nameProduct})
                    const intersection = productOfTicket.filter(element=>nameProduct.includes(element));
                    taille=intersection.length;
                    console.log({inter:intersection.toString()})
                    console.log({taille})
                    if(!intersection){
                        return res.status(404).json({message:"pas de offer dans votre ticket "})
                    }else{
                        console.log({intersection})
                        //make this feature automatically after 24 hours
                        
                        // intersection.forEach(async (element) => {  
                        //     checkProduct = await OfferModel.findOne({productName:element});
                        //     console.log({checkProduct: checkProduct})
                        //     if(checkProduct){
                        //         productTicketDetail = product.filter((elementt)=>elementt.pname===element);
                        //     if(productTicketDetail){
                        //         console.log({te:productTicketDetail[0]})
                        //            ///////calculer montant a rembourser/////////:
                        //         let  montantARembourser = (checkProduct.percentage/100)*productTicketDetail[0].pquantity*productTicketDetail[0].pupri;
                        //         console.log({montantARembourser})
                        //         monanatTotal=monanatTotal + montantARembourser;
                        //         console.log({monanatTotal})
                        //             ////update user historique and cagnotte////////:
                        //             userafterUpdate = await User.findByIdAndUpdate({
                        //                 _id:_id
                        //             },{
                        //                 cagnotte:user.cagnotte + monanatTotal,
                        //                 $push:{
                        //                     historique:{
                        //                         offerId:checkProduct._id,
                        //                         productName:checkProduct.productName,
                        //                         montant:montantARembourser
                        //                     }
                        //                 }
                        //              });
                        //        }else{
                        //            return res.status(404).json({message:"aucun offer dans votre ticket"})
                        //        }
                        //     }else{
                        //         console.log("error")
                        //     }
                        // });  
                        return res.status(200).json({ticket,message:"nous aurons repondu dans 24h"});
                    }}
                        //    return await res.status(200).json({ticket,message:"merci de scanner Votre ticket , nous vous répondrons dans les  48 heures au maximum"});
                } catch (error) {
                    console.log({error})
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
         },

         getAllTicketByUser:async(req,res)=>{
            try {
                const id = req.body.userId
                    console.log({id});
                const tickets = await Ticket.find({idUser:id})
                if(tickets){
                    console.log({tickets})
                    return res.status(200).json(tickets)
                }else{
                    return res.status(404).json({message:'tickets not found !!! '})
                }
            } catch (error) {
                console.log({error})
                    res.status(500).json({error:error})
            }
         },
         changeStatusTicket:async(req,res)=>{
            setInterval(async() => {
            try {
                    
                    let checkProduct;
                    // let prod;
                    let prodTicket;
                    let prodName;
                    let quantity;
                    let prixUnitaire;
                    // let productTicketDetail;
                    let monanatTotal =0;
                    // let  montantARembourser=0;
                    const idUser = req.body.id;
                    const user = await User.findById(idUser);
                    // console.log({user})
                    const tickets = await Ticket.find({idUser}) 
                    // console.log({tickets})
                    // const product = tickets.map(item=>item.Product);
                    // console.log({product}) 
                    // njibou fil les ticket ili etat mta3hom en cours
                    const intersection = tickets.filter(element=>element.etat === 'En Cours');
                    if (intersection.length<=0){
                            return;
                    }else{
                    // console.log({inter:intersection.map((item)=>item.Product)})
                    //nekhdou  minhom les products mta3hom  
                    const product = intersection.map(item=>item.Product);
                        
                        intersection.forEach(async(element)=>{
                            console.log("product of product")
                            const prod = element.Product;
                                console.log({prod})
                                // console.log("Nameproduct of product")
                            const prodName = prod.map(item=>item.pname)
                            console.log({prodName});
                            const ProductOffer = await OfferModel.find();
                            //  console.log("product Name of productOffer")
                            const nameProduct =ProductOffer.map(item=>item.productName);
                            // console.log({nameProduct})
                            //  console.log("intersection")
                            const inter = prodName.filter(elem=>nameProduct.includes(elem))
                            //intersection
                            console.log(inter)
                            if(inter.length<= 0){
                               prodTicket = await Ticket.findById({_id:element._id})
                                        // console.log({prodTicket})
                                        prodTicket.etat="Refusé"
                                        await prodTicket.save();
                                        // console.log({prodTicket})
                            }else{
                                inter.forEach(async (elemn)=>{
                                     checkProduct = await OfferModel.findOne({productName:elemn});
                                        // console.log({checkProduct: checkProduct})
                                        if(checkProduct){
                                            console.log(" inside inter")
                                            console.log({elemn})
                                            // console.log(element._id)
                                            console.log({prod})
                                          const  productTicketDetail = prod.filter((elementt)=>
                                                    elementt.pname===elemn);
                                                productTicketDetail.map((element)=>
                                                    {
                                                       quantity= element.pquantity 
                                                       prixUnitaire = element.pupri
                                                    });
                                        if(productTicketDetail.length>0){
                                            // console.log(productTicketDetail) 
                                            console.log({prixUnitaire,quantity})
                                          const  montantARembourser = (checkProduct.percentage/100) * quantity * prixUnitaire;
                                            console.log(montantARembourser)
                                           monanatTotal=monanatTotal + montantARembourser;
                                           console.log({monanatTotal})
                                            prodTicket = await Ticket.findById({_id:element._id})
                                            console.log({prodTicket})
                                            prodTicket.etat="Accepté"
                                            await prodTicket.save();
                                            console.log({prodTicket})
                                               //update user historique and cagnotte////////:
                                    userafterUpdate = await User.findByIdAndUpdate({
                                        _id:idUser
                                    },{
                                        cagnotte:user.cagnotte + monanatTotal,
                                        $push:{
                                            historique:{
                                                offerId:checkProduct._id,
                                                productName:checkProduct.productName,
                                                montant:montantARembourser
                                            }
                                        }
                                     });
                                            
                                        }else{
                                            console.error('why why')
                                        }
                                    }else{
                                        console.log("pas de offereee")
                                    }
                                })
                            }
                                // if(inter.length<=0){
                                //     res.json('pas de offer in this ticket ')
                                // }else{
                                //     inter.forEach(async(elemnt)=>{
                                //         console.log('inter boucle to check details of product in ticket')
                                //         console.log({elemnt})
                                //         checkProduct = element
                                //         console.log({checkProduct})
        
                                //     });
        
                                // }
                        });
        
                    // res.json({inter:intersection,product})
                    
                    //  const productOfTicket = prod.map((item)=>item.pname);
                    // ////a verifier offer toul ////////////////
                    // console.log({productOfTicket})
                    // const intersections = prodTicket.filter(element=>nameProduct.includes(element));
                    // taille=intersection.length;
                    // console.log({inter:intersections.toString()})
                    // console.log({taille})
                    // intersections.forEach(async (element) => {  
                        
                       }  //     });  
                       return res.status(200).json({tickets})
                    } catch (error) {
                        console.log({error})
                        // res.json({error})
                    }
                }, 10000);   

                
            }
        }
module.exports = TicketController