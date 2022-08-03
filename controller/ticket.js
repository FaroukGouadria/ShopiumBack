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
                            return res.status(200).json({success:'true',data:{nom:user.nom,prenom:user.prenom}})
                        }
                    
                } catch (error) {
                    res.status(500).json({success:'false',message:error})
                }
        }
}

module.exports = TicketController