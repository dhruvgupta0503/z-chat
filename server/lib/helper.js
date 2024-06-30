import { userSocketIDs } from "../app.js";



export const getOtherMember=(members,userID)=>
     members.find((member)=>member._id.toString()!==userID.toString());


export const getSockets=(users=[])=>{

     const sockets=users.map(user=>userSocketIDs.get(user._id.toString()));

     return sockets;

}