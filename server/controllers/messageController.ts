import { Request, Response } from "express";
import client from "../db/db.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await client.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await client.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await client.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await client.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({message:"Internal Server error",success:false})
  }
};

export const getMessages = async (req: Request, res: Response)=>{
    try {
        const { id:userToChatId } = req.params;
        const senderId = req.user.id
        const conversation = await client.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[senderId,userToChatId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        if(!conversation){
            return res.status(200).json({message:[],success:true})
        }
        return res.status(200).json({message:conversation.messages,success:true})
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({message:"Internal Server error",success:false})
    }
}

export const getUsersForSidebar = async (req: Request, res: Response) => {
	try {
		const authUserId = req.user.id;

		const users = await client.user.findMany({
			where: {
				id: {
					not: authUserId,
				},
			},
			select: {
				id: true,
				fullName: true,
				profilePic: true,
			},
		});

		res.status(200).json(users);
	} catch (error: any) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
