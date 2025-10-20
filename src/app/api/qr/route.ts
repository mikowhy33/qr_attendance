import QRCode from "qrcode";

export async function GET(request: Request) {

    const randomNr=Math.random()*100
    const randomNrIntoString=String(randomNr)
    //  we get the qr
	const qr = await QRCode.toDataURL(`${randomNrIntoString}`,{
        // much bigger size, when it comes to width
        width:1000,
        margin:1
    });

    //  we return it as a json!
	return Response.json({ qr });
}

