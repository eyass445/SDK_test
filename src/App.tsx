import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useLit from "./useLit";
import useStorage from './useStorage';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import useSDK from './useSDK';


 function App() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI0YzJkYWM3MzlhMmQ2MDU5NDlCZmNkNjFkOTFDMDVGM0YwN0JlRmQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODk3NTQzNjQyODIsIm5hbWUiOiJJWUFTIn0.hEE9MNvD201AoeDVXzl5UHVlzdaiAtdnU5SiFQp7Z6Q"

  const chain = 'mumbai';
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: chain,
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '0',
      },
    },
  ];

  // const lit = useLit();
  // const storage = useStorage(token);
  const sdk = useSDK({token ,chain,accessControlConditions});
  // var fileID : any ;
  // var fileSave : any ; 

 


  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    const files = fileInput.files;
    if (!files || files.length === 0) {
      return alert("No files selected");
    }
    const file = files[0];
    console.log(file);


    // // let sig =  await lit.getSig();
    // //console.log(sig.authSig);

    // const encryptFile = await lit.encryptFile(file);
    // console.log(encryptFile);
    
    // const id = await storage?.setFile(encryptFile.encryptedFileString);
    // console.log("id ::::::::::: " + id)
    // fileID = id;
    // fileSave = encryptFile.encryptedSymmetricKey;

    ////////////////////////

    await sdk.uplodeFile(file);


  };

  const decryptButt = async () => {
    // console.log(fileSave)
    // const file :any = await storage?.getFile(fileID)
    // // const fileBlob =  await file[0].text()
    // //const metadata = JSON.parse(fileBlob);

    // console.log(file)
    // const decryptFile = await lit.decryptFile(file[0],fileSave);
    // console.log(decryptFile)

    // const fileDecrypted = new File([decryptFile], "test");
    // console.log(fileDecrypted)

    ////////////////

    await sdk.downloadFile("bafybeidg7eylpekgw4sm5voueengu352zb6zwbgmd7mnjeueho44z4crja")
  }


  
  // const decryptFile = async () => {
  //   //const filePromises = hashes.map(async (hash) => {
  //     let incomingData : any;
  //     try {
  //       incomingData = await storage?.getFile("");
  //     } catch (error) {
  //       console.log("error", error);
  //       return;
  //     }
  //     const fileData = incomingData;
  //     // const blob = new Blob([fileMeta], { type: "application/json" });
  //     // const textMetadata = await blob.text();
  //     // const metadata = JSON.parse(textMetadata);

  //     //console.log("metadata.", metadata);
  //     const decryptedFile = await lit.decryptFile(
  //       fileData,
  //       fileSave
  //     );
  //     // const fileDecrypted = new File([decryptedFile], metadata.name);
      
  //     return decryptedFile;
  //   //});

  //   // const decryptedFiles = await Promise.all(filePromises);

  //   // if (hashes.length === 1) {
  //   //   return decryptedFiles[0];
  //   // }
  // };
  
  return (
    <div className="App">
      <header className="App-header">

      <div className="main">
        <form onSubmit={onSubmitHandler}>
          <input type="file" />
          <button type="submit" className="button">Submit</button>
        </form>
      </div>

      
        <button onClick={decryptButt} className="button">decrypt</button>

        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;
