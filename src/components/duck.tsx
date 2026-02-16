import React, { useState, useEffect } from "react";

import duckStyle from "@/components/duck.module.css";

export default function Duck() {
	return <div></div>;
	/*
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPos({ x: event.pageX, y: event.pageY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    const remToPx = (rem: number) =>
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    
    
    return (
    
        <div className={duckStyle.duck} style={{ top: pos.y - remToPx(3), left: pos.x - remToPx(3) }}>
            <img src={"/media/test/ducky.png"} />
        </div>)
        */
}

//WHAT IF
//1. Liten duck i hörnet som har counter, says something like I bet you cant click me
//2. If clicked, starter ett duck hunt, ducks flyger förbi, skjut för poäng
//change cursor to target, Add a score counter, timer, sound effects. quack on hit
//kolla in i att göra global highscore
