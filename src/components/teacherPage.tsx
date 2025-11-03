'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

type Data = {
  src: any;
};

export const TeacherPage = ({ src }: Data) => {
  // console.log(src.qr)

  const [data, setData] = useState<any>('');

  const [seconds, setSeconds] = useState<number>(5);

  // we are keeping the reference to the interval!
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // we control the visibility of the state
  const [visible, setVisible] = useState(true);

  const handleGenerateNew = async () => {
    const res = await fetch('/api/qr', { cache: 'no-cache' });
    const data = await res.json();
    setData(data);
  };

  const timerForQrCode = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // every second the state will change and the seconds will go down
    // we have to clean the interval

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        // interval started
        console.log('Tick:', prev);
        if (prev <= 1) {
          // interval ended
          console.log('STOP interval');
          clearInterval(intervalRef.current!);
          // we want this to
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    setVisible(true); // reset visibility
    setSeconds(5); // reset timer
    handleGenerateNew(); // setting new qr code
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
      <div className="flex flex-col flex-1 items-center w-screen  gap-3   ">
        <Button onClick={handleClick} className="max-w-2xs">
          {' '}
          Click to generate a QR code{' '}
        </Button>
        <p>Seconds untill the QR code dissapears! {seconds}</p>

        {src ? (
          // position relative so the divs position will match this
          <div className="flex flex-1 w-full justify-center items-center relative ml-2 mr-2">
            <div
              className={`transition-opacity duration-1000 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={data.qr}
                className="w-90 h-90 sm:w-128 sm:h-128 object-contain"
              />
            </div>
            {visible === false && (
              // position absolute, not in the normal flow, getting him out of the flow and he is in the place of qr code
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
