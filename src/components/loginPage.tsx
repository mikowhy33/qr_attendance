import { useState } from "react";
import { Button } from "./ui/button";
import { NextResponse } from "next/server";

export const LoginPage = () => {
	const [mail, setMail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function onSubmitFunction(e: React.FormEvent) {
		
		e.preventDefault()

		console.log('WYSYLAM FORMULARZ ')


		const res=await fetch('./api/login',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			// converting into json and sending
			body:JSON.stringify({mail,password})	
		})

		// have 2 wait for response

		const data=await res.json();

		// if response fine and data is a success we want 2 redirect to the page
		if(res.ok && data.success){

			console.log('🔵 REDIRECTING RIGHT NOW ')
			window.location.href='/attendance_reports'
		}

	}

	return (
		<div className="flex flex-col flex-1 h-full items-center p-4">
			<form
				onSubmit={onSubmitFunction}
				className=" flex flex-col items-center w-[60%] border-2 rounded-md  border-amber-200 gap-3 p-4">
				<label htmlFor="email">
					<strong>Enter your email:</strong>
				</label>

				<input
					type="text"
					name="email"
					value={mail}
					className="border-2 border-amber-50 p-2"
					onChange={(e) => setMail(e.target.value)}></input>

				<label htmlFor="password">
					<strong>Enter your password:</strong>
				</label>

				<input
					type="password"
					name="password"
					value={password}
					className="border-2 border-amber-50 p-2"
					onChange={(e) => setPassword(e.target.value)}></input>

				<Button type="submit">Sumbit</Button>
			</form>
		</div>
	);
};
