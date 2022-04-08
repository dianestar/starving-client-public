import React from "react";

const RecipeCard = ({percent, nickname, desc, title, time, like}) => {
    return (
        <div className="w-[250px] h-[400px] bg-white border-solid border-2 border-neutral-200 flex flex-col items-center justify-between">
            <section className="w-[95%] h-[60%] bg-black mt-1 relative">
                <article className="text-white absolute bottom-0 right-0 mx-2 my-2">
                    <p className="text-sm">해먹지수</p>
                    <p className="text-4xl font-bold">{percent}</p>
                </article>
            </section>
            <section className="relative">
                <article className="w-[60px] h-[60px] absolute top-[-80%] left-[50%] right-[50%] translate-x-[-50%] bg-neutral-200 rounded-full"></article>
                <article className="flex flex-col text-center">
                    <p>{nickname}</p>
                    <p>{desc}</p>
                    <p className="font-bold">{title}</p>
                </article>
            </section>
            <section className="w-full flex border-t-2 text-neutral-400">
                <article className="w-1/3 flex justify-evenly">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{time}</span>
                </article>
                <article className="w-1/3 flex justify-evenly border-l-2 border-r-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{like}</span>
                </article>
                <article className="w-1/3 flex justify-evenly">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>공유</span>
                </article>
            </section>
        </div>
    );
}

export default RecipeCard;