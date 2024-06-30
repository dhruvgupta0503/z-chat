import { userSocketIDs } from "../app.js";



export const getOtherMember=(members,userID)=>
     members.find((member)=>member._id.toString()!==userID.toString());


export const getSockets=(users=[])=>{

     const sockets=users.map(user=>userSocketIDs.get(user._id.toString()));

     return sockets;

};


export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;