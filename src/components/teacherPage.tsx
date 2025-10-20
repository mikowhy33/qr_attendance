"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type Data = {
	src: any;
};

export const TeacherPage = ({ src }: Data) => {
	// console.log(src.qr)

	const [data, setData] = useState(src);

	const [seconds, setSeconds] = useState<number>(5);

	// we are keeping the reference to the interval!
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// we control the visibility of the state
	const [visible, setVisible] = useState(true);

	const handleGenerateNew = async () => {
		const res = await fetch("/api/qr", { cache: "no-cache" });
		const data = await res.json();
		setData(data);
	};
	// Wygenerowac funkcje, ktora odliczy 30 sekund, po tym czasie qr code ma zniknac!
	// 1. Najpierw wygenerowac timer i wyswietlic funkcje

	const timerForQrCode = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		// every second the state will change and the seconds will go down
		// we have to clean the interval

		intervalRef.current = setInterval(() => {
			setSeconds((prev) => {
				// interval started
				console.log("Tick:", prev);
				if (prev <= 1) {
					// interval ended
					console.log("STOP interval");
					clearInterval(intervalRef.current!);
                    // we want this to
					setVisible(false);
					setData(src);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleClick = () => {
		handleGenerateNew();
		timerForQrCode();
	};

	// every time the app opens, it checks for running interval,
	// if there are any it will be cleared!
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<>
			{/* We are taking whole space from the body, also width is a screen */}
			<div className="flex flex-col flex-1 items-center w-screen  gap-3 p-5">
				<Button onClick={handleClick} className="max-w-2xs">
					{" "}
					Click to generate a QR code{" "}
				</Button>
				<p>Seconds untill the QR code dissapears! {seconds}</p>

				{src || data ? (
                    // position relative so the divs position will match this
					<div className="flex flex-1 w-full justify-center items-center relative">
						<div
						className={`transition-opacity duration-1000 ${
							visible ? "opacity-100" : "opacity-0"
						}`}>
						
							<img src={data.qr} className="w-128 h-128 object-contain" />
						</div>
						{visible===false && (
                            // position absolute, not in the normal flow, getting him out
							<div className="absolute text-red-500 text-lg">
								Your time has ended!
							</div>
						)}
					</div>
				) : (
					<p>Generating...</p>
				)}
			</div>
		</>
	);
};
