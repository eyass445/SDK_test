// @ts-nocheck
import * as LitJsSdk from "@lit-protocol/lit-node-client";

const useLit = (chain : string , accessControlConditions : any) => {


  const client = new LitJsSdk.LitNodeClient();

  let litNodeClient: any;

  const connect = async () => {
    await client.connect();
    litNodeClient = client;
  };

  const getSig =async () => {

     let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain
    });

    return {authSig}
    
  }


  const encryptFile = async (file: File ) => {
    if (!litNodeClient) {
      await connect();
    }


    let authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: chain
    });

    console.log(authSig)

    const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({
      file,
    });

    // first sig
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
      permanent: false,
    });

    // const encryptedFileString = await LitJsSdk.blobToBase64String(
    //   encryptedFile
    // );
    return {
      encryptedFileString: encryptedFile,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16"
      ),
    };
  };

  const decryptFile = async (
    encryptedFile: string,
    encryptedSymmetricKey: string,
  ) => {
    if (!litNodeClient) {
      await connect();
    }

    let authSig = JSON.parse(
      localStorage.getItem("lit-auth-signature") || "{}"
    );
    
    const symmetricKey = await litNodeClient.getEncryptionKey({
      accessControlConditions: accessControlConditions,
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });
    // const encryptedFileBlob = LitJsSdk.base64StringToBlob(encryptedFile);

    // const encryptedFileBlob = new Blob([encryptedFile]);
    const file = new File([encryptedFile], "419MB.avi");
    const decryptedFile = await LitJsSdk.decryptFile({
      file,
      symmetricKey,
    });
    return decryptedFile;
  };

  const updateCondition = async (
    newAccessControlConditions: any,
    encryptedSymmetricKey: string
  ) => {
    if (!litNodeClient) {
      await connect();
    }
    let authSig = JSON.parse(
      localStorage.getItem("lit-auth-signature") || "{}"
    );
    
    const encryptedSymmetricKeyArray = LitJsSdk.uint8arrayFromString(
      encryptedSymmetricKey,
      "base16"
    );

    const newEncryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
      accessControlConditions: newAccessControlConditions,
      encryptedSymmetricKey: encryptedSymmetricKeyArray,
      authSig,
      chain,
      permanent: false,
    });

    console.log("newEncryptedSymmetricKey", newEncryptedSymmetricKey);
    console.log('encryptedSymmetricKeyArray', encryptedSymmetricKeyArray)
    console.log('accessControlConditions', newAccessControlConditions)
  };

  return {
    accessControlConditions,
    encryptFile,
    decryptFile,
    updateCondition,
    getSig
  };
};

export default useLit;

