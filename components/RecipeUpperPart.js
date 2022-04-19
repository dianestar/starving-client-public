import React, { useState } from "react";

const RecipeUpperPart = ({ setTitle, setDesc, setCategory, category }) => {
    const categories = ["RICE", "SOUP", "BREAD", "NOODLE", "FRIED"];

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDesc = (e) => {
        setDesc(e.target.value);
    }

    const onChangeRadioBtn = (e) =>{
        setCategory(e.target.value);
    }

    return (
        <section className="space-y-8 my-8">
            <article className="w-full flex items-center justify-between">
                <span className="w-1/4 text-gray-700 font-bold text-xl">레시피 제목</span>
                <input className="w-3/4 h-12 px-4 border-2 rounded" placeholder="레시피의 제목을 입력해주세요" onChange={onChangeTitle}/>
            </article>
            <article className="w-full flex items-center justify-between">
                <span className="w-1/4 text-gray-700 font-bold text-xl">한줄설명</span>
                <input className="w-3/4 h-12 px-4 border-2 rounded" placeholder="레시피를 소개할 수 있는 한줄설명을 입력해주세요" onChange={onChangeDesc}/>
            </article>
            <article className="w-full flex">
                <span className="w-1/4 text-gray-700 font-bold text-xl">카테고리</span>
                <section className="flex space-x-4">
                    {categories.map((v, i) => (
                        <article key={i} className="space-x-2 font-bold">
                            <input type="radio" id={v} value={v} checked={v === category} onChange={onChangeRadioBtn} />
                            <label htmlFor={v}>{v}</label>
                        </article>
                    ))}
                </section>
            </article>
        </section>
    );
}

export default RecipeUpperPart;