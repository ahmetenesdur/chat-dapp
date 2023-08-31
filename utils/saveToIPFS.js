import axios from "axios";

const saveToIPFS = async (file) => {
  // Create a new FormData instance to store the file
  const formData = new FormData();
  // Append the file to the form data
  formData.append("file", file);

  // Configure the axios request
  const config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  // Send the request to the IPFS API
  const response = await axios(config);
  // Return the CID of the file
  return response.data.cid;
};

export default saveToIPFS;