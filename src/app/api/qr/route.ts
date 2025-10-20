import QRCode from "qrcode";

export async function GET(request: Request) {

    const randomNr=Math.random()*100
    const randomNrIntoString=String(randomNr)
    //  we get the qr
	const qr = await QRCode.toDataURL(`${randomNrIntoString}`);

    //  we return it as a json!
	return Response.json({ qr });
}

