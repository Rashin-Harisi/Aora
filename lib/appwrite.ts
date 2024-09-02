import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


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
const databases = new Databases(client)

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