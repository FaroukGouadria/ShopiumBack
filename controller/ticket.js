const Ticket = require('../model/ticket');
const User = require('../model/user');

const TicketController = {
    
        AddTicket:async(req,res)=>{
                try {
                    const _id=req.body.id
                    const {magasin,products,dateAchat,prixTotal}=req.body
                    console.log({userId:_id,magasin:magasin,products:products,proxTotal:prixTotal,dateAchat:dateAchat})
                    const user =  await User.findById(_id);
                    if(!user){
                        return res.status(404).json({success:'false',message:'USer Not Found !'})
                    }else
                        {   
                           const ticket = new Ticket({
                                magazin:magasin,
                                products:products,
                                dateAchat:dateAchat,
                                prixTotal:prixTotal,

                           })

                           await ticket.save();
                           return res.status(200).json({ticket})
                        }
                    
                } catch (error) {
                    res.status(500).json({success:'false',message:error})
                }
        },
        getUserTicket:async(req,res)=>{
            try {
                const _id=req.body.id;
                const user=await User.findById(_id);
                if(!user){
                    return res.status(404).json("user not found !!");
                }else{
                    let nom = user.nom
                    let prenom=user.prenom
                    let email=user.email;
                    return res.status(200).json({user:{nom,prenom,email}})
                }
            } catch (error) {
                console.log(error)
            }
        }
}

module.exports = TicketController