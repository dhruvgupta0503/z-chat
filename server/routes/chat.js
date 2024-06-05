import express from "express";
import { isAuthenticated } from "../middlewares/Auth.js";
import { addMembers, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";

const router = express.Router();


// User must be logged in to access this route
router.use(isAuthenticated);

router.post("/new",newGroupChat)
router.get("/my",getMyChats)
router.get("/my/groups",getMyGroups);
router.put("/addmembers",addMembers);
router.put("/removemember",removeMembers);
router.delete("/leave/:id",leaveGroup)
//send attachment
router.post("/message",attachmentMulter,sendAttachment)
// get messages


// get chat Details,rename,delete

router.route("/:id").get(getChatDetails).put(renameGroup).delete()



export default router;
