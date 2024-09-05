import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint : "https://cloud.appwrite.io/v1",
    platform: "com.rara.aora",
    projectId :"66d57033002ff4fa5112",
    databaseId : "66d571fc00023e0d5b0b",
    userCollectionId: "66d57206001bce131216",
    videoCollectionId: "66d5721a003a593f073b",
    storageId:"66d57a520038d8ee3ba8"
}


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform) 


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async(email:string,password:string,username:string)=>{
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,password,username
        )
        if(!newAccount) throw new Error
        const userAvatar = avatars.getInitials(username);
        const newUser= await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar:userAvatar,
            }
        )
        return newUser;
        
    } catch (error) {
       if (error instanceof Error) {
        throw new Error(error.message)
    }
    }
}

export const signIn= async(email:string,password:string)=>{
    try {
        const session= await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const getCurrentUser= async()=>{
    try { 
        const currentAccount= await account.get();
        if(!currentAccount) throw new Error;
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId",currentAccount.$id)]
        );
        if(!currentUser) throw new Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
        return null
    }

}
export const signOut = async()=>{
    try {
        const session= await account.deleteSession("current")
        return session;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const getAllPosts = async()=>{
    try {
        const posts= await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );
        return posts.documents
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
export const getLatestPost = async()=>{
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"),Query.limit(7)]
        )
        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
export const getSearchPosts = async(query:any)=>{
    try {
        const posts= await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search("title",query)]
        )
        if(!posts) throw new Error("Something went wrong")
        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
export const getUserPosts= async(userId:string)=>{
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal("creator",userId)]
        )
        return posts.documents;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const uploadFile= async(file:any,type:string)=>{
    if (!file) return;
    const {mimType, ...rest} = file;
    const asset= {type:mimType, ...rest} //this is how appwrite can recognize

    try {
        const uploadedFile= await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        )
    
        const fileUrl = await getFilePreview(uploadedFile.$id,type)
        return fileUrl;
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }

}
export const getFilePreview = async(fileId:any,type:string)=>{
    let fileUrl;
    try {
        if(type === "video"){
            fileUrl =  storage.getFileView(appwriteConfig.storageId,fileId)
        }else if (type === "image"){
            fileUrl =  storage.getFilePreview(appwriteConfig.storageId,fileId,
                2000,
                2000,
                ImageGravity.Top,
                100
            )
        }else{
            throw new Error("Invalid file type")
        }
    
        if(!fileUrl) throw Error

        return fileUrl;
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } 
    }
}

export const createVideoPost = async(form:any)=>{
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video")
        ]);
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title:form.title,
                thumbnail: thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId,
            }
        )
        return newPost;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } 
    }
}