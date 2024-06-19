import express from "express";
import { isAuthenticated } from "../middlewares/Auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator,  newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";

const router = express.Router();


// User must be logged in to access this route
router.use(isAuthenticated);

router.post("/new",newGroupValidator(),validateHandler,newGroupChat)

router.get("/my",getMyChats)

router.get("/my/groups",getMyGroups);

router.put("/addmembers",addMemberValidator(),validateHandler,addMembers);

router.put("/removemember",removeMemberValidator(),validateHandler,removeMembers);

router.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup)

//send attachment
router.post("/message",attachmentMulter,sendAttachmentValidator(),validateHandler,sendAttachment)
// get messages

router.get("/message/:id",chatIdValidator(),validateHandler,getMessages);


// get chat Details,rename,delete

router.route("/:id").get(chatIdValidator(),validateHandler,getChatDetails).put(renameValidator(),validateHandler,renameGroup).delete(chatIdValidator(),validateHandler,deleteChat)



export default router;
