import React from "react";
import Image from "next/image";

import images from "../public/assets";

const Loader = ({ pictureLoading }) => {
  return (
    <div>
      {/* // side by side */}
      <div className="flex flex-col items-center justify-center">
        <Image src={images.loader} alt="loader" width={100} height={100} />
        {pictureLoading ? (
          <p className="text-white">Uploading to IPFS...</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Loader;
