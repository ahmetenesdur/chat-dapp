import React from "react";
import Image from "next/image";

import images from "../public/assets";

const Loader = () => {
  return (
    <div>
      <div className="text-center	mx-4">
        <Image src={images.loader} alt="loader" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loader;
