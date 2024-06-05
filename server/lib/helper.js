


export const getOtherMember=(members,userID)=>
     members.find((member)=>member._id.toString()!==userID.toString());
