import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slick = () => {
    return (
        <div>
            <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={3000}
          >
            <section className="h-[150px] bg-cyan-400 text-white">
              <p className="leading-[150px] font-bold text-4xl text-center">Developed by Starving Project</p>
            </section>
            <section className="h-[150px] bg-cyan-400 text-white !flex flex-col items-center justify-center space-y-4">
              <article className="flex flex-col items-center">
                <p className="font-bold text-2xl">Frontend</p>
                <a className="flex items-center space-x-2 hover:text-cyan-600 hover:cursor-pointer" href="https://github.com/maaaaaaaaad/starving-client" target="_blank" rel="noreferrer">
                  <p className="underline">@starving-client</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg> 
                </a>
              </article>
              <article className="flex space-x-4 ">
                <div className="flex items-center space-x-2">
                  <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/64053930?v=4" alt="Shin Hyeri profile"/>
                  <p className="font-bold">Shin Hyeri</p>
                  <a className="flex items-center space-x-2 hover:text-cyan-600 hover:cursor-pointer" href="https://github.com/Jetom88" target="_blank" rel="noreferrer">
                    <p className="underline">@jetom88</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg> 
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/59408502?v=4" alt="정다은 profile"/>
                  <p className="font-bold">정다은</p>
                  <a className="flex items-center space-x-2 hover:text-cyan-600 hover:cursor-pointer" href="https://github.com/dianestar" target="_blank" rel="noreferrer">
                    <p className="underline">@dianestar</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg> 
                  </a>
                </div>
              </article>
            </section>
            <section className="h-[150px] bg-cyan-400 text-white !flex flex-col items-center justify-center space-y-4">
            <article className="flex flex-col items-center">
                <p className="font-bold text-2xl">Backend</p>
                <a className="flex items-center space-x-2 hover:text-cyan-600 hover:cursor-pointer" href="https://github.com/maaaaaaaaad/starving-server" target="_blank" rel="noreferrer">
                  <p className="underline">@starving-server</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg> 
                </a>
              </article>
              <article className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white">
                  <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/74044653?v=4" alt="MAD profile"/>
                </div>
                <p className="font-bold">MAD</p>
                <a className="flex items-center space-x-2 hover:text-cyan-600 hover:cursor-pointer" href="https://github.com/maaaaaaaaad" target="_blank" rel="noreferrer">
                  <p className="underline">@maaaaaaaaad</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg> 
                </a>
              </article>
            </section>
          </Slider>
        </div>
    );
}

export default Slick;