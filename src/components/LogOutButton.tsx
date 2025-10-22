'use client'

import { redirect } from "next/dist/server/api-utils";
import { Button } from "./ui/button";

export const LogOut = () => {
	// robimy przycisk i na przycisk klikniecie odpalana funkcja
	// funkcja synchriniczna pobiera dane z logoutu i metoda POST

	async function logOutFunction() {
        console.log(`KLIKNEITO MNIE`)
		const res = await fetch("/api/logout", {
			method: "POST",
			// sending json, well were not sending nothing but 4 practice
			headers: { "Content-type": "application/json" },
		});

		// geeting data in json format from backend
		const data = await res.json();

		if (res.ok && data.success === true) {
			console.log("COOKIE HAS BEEN DELETED!");
			window.location.href = "/login";
		}
	}

	return <Button onClick={()=>logOutFunction()}>Log out</Button>;
};
