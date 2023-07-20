import { Web3Storage, File , CIDString  } from 'web3.storage'

const useStorage = (token : string ) => {

  if (!token) {
    console.error('A token is needed. You can create one on https://web3.storage')
    return
  }

  const storage = new Web3Storage({ token })


  const getFile = async (hash : CIDString) => {
    let files;
    try {
      const res = await storage.get(hash);
      files = await res?.files(); // Web3File[]
    } catch (error) {
      console.log(error);
    }
  
    return files;
  };

  const setFile = async (data : BlobPart , metadata : any) => {

    const files = [
      new File(
        [data],
        '/dir/data.txt'
      ),
      new File([metadata], "text/plain")

    ]
    const cid = await storage.put(files)

    //console.log('Content added with CID:', cid)
    return cid;
  };

  
  

  
//   const xx = await setFile("iyas")
//   const x = await getFile(xx)

//   console.log('Content added with :', xx)
//   console.log('Content added with :', x)

    return {
        getFile,
        setFile
    };

}


export default useStorage;






