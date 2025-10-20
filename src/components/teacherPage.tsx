'use client'
import { useState } from "react";
import { Button } from "./ui/button";

type Data = {
	src: any;

};

export const TeacherPage = ({src}: Data) => {

    // console.log(src.qr)

    const[data,setData]=useState(src);

    const handleGenerateNew= async()=>{

        const res= await fetch('/api/qr', {cache:'no-cache'});
        const data= await res.json();
        setData(data);
    }

	return (
		<>
        <Button onClick={handleGenerateNew}> Click to generate a QR code </Button>
			{src ? (
				<div>
                    {/* gotta access obj qr code */}
					<img src={data.qr}></img>
				</div>
			) : (
				<p>Generating..</p>
			)}
		</>
	);
};
