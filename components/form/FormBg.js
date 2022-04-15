import React from "react";

const FormBg = ( {children} ) => {
    return (
        <div className="
            w-full h-screen flex flex-col items-center
            before:bg-[url('../sources/bg2.jpg')] before:bg-cover before:brightness-50 before:absolute before:top-[100px] before:left-0 before:right-0 before:bottom-0
        ">
            {children}
        </div>
    );
}

export default FormBg;