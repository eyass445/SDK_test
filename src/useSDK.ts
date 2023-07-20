import useLit from "./useLit";
import useStorage from './useStorage';

type Props = {
    token: string;
    chain: string;
    accessControlConditions: any;
}

const useSDK = ({token , chain  , accessControlConditions } : Props) => {

    

    const lit = useLit(chain,accessControlConditions);
    const storage = useStorage(token);
    // var fileID : any ;
    // var fileSave : any ; 

    const uplodeFile = async (file : File) => {
        const encryptFile = await lit.encryptFile(file);
        console.log(encryptFile);
        
        const id = await storage?.setFile(encryptFile.encryptedFileString, JSON.stringify({esk: encryptFile.encryptedSymmetricKey, name: file.name}));
        console.log("id ::::::::::: " + id)
        return id
    }

    const downloadFile = async (fileID:string) => {
        const fileData :any = await storage?.getFile(fileID)
       const [file, meta] = fileData;

       console.log(meta, 'meta')
       const blob = new Blob([meta], { type: "application/json" });
       const textMetadata = await blob.text();
       console.log(textMetadata, 'tt')
       const binaryData = Buffer.from(textMetadata)
// Convert the binary data to a regular string
const regularString = binaryData.toString('utf8');
console.log(regularString, 222)
       const {esk} = JSON.parse(regularString);
        console.log(file)
        const decryptFile = await lit.decryptFile(file[0],esk);
        console.log(decryptFile)

        const fileDecrypted = new File([decryptFile], "test");
        console.log(fileDecrypted)
        return fileDecrypted
    }

    return {
        uplodeFile,
        downloadFile
    };


}


 export default useSDK;
