import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <TailSpin
                color="#22D3EE"
                width="100"
                height="100"
                ariaLabel="loading"
            />
        </div>
    );
}

export default Loading;