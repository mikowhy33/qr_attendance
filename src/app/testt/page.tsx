// Plik: qr_attendance/app/testt/page.tsx
// Z OSTATECZNĄ POPRAWKĄ 'await'

import { auth } from '@clerk/nextjs/server'; // Ten import jest poprawny

// Funkcja 'pobierzMojeKlasy' zostaje BEZ ZMIAN (jest poprawna)
async function pobierzMojeKlasy(token: string | null) {
  if (!token) {
    throw new Error('Brak tokena autoryzacyjnego');
  }
  const API_URL = 'http://localhost:3000/api/classes';
  console.log(`[Frontend Server] Uderzam do API: ${API_URL}`);

  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      const errorData = await res.text();
      console.error(`[Backend API] Błąd: ${res.status}`, errorData);
      throw new Error(`Błąd API backendu: ${res.status} - ${errorData}`);
    }
    return res.json();
  } catch (error) {
    console.error('[Frontend Server] Błąd podczas fetchowania:', error);
    return null; 
  }
}

// --- GŁÓWNY KOMPONENT STRONY ---

export default async function StronaTestowa() {
  
  // 1. Pobieramy obiekt auth, ALE TYM RAZEM Z 'await'
  //    To jest ta jedna, brakująca zmiana.
  
  //       👇👇👇👇👇👇👇
  const authObject = await auth();
  //       👆👆👆👆👆👆👆

  // 2. NAJWAŻNIEJSZA ZMIANA (teraz zadziała):
  // Sprawdzamy, czy użytkownik jest zalogowany
  if (!authObject.userId) {
    // Middleware już zajmuje się przekierowaniem.
    // Ten return jest tylko po to, by ZATRZYMAĆ wykonywanie tego kodu
    return (
      <div>
        <h1>Przekierowywanie do logowania...</h1>
      </div>
    );
  }

  // 3. Skoro tu dotarliśmy, jesteśmy zalogowani.
  const token = await authObject.getToken();

  // 4. Używamy naszej funkcji, aby pobrać dane
  const mojeKlasy = await pobierzMojeKlasy(token);

  // 5. Renderujemy stronę z danymi (reszta bez zmian)
  return (
    <div>
      <h1>Strona testowa - Moje Klasy</h1>
      <p>
        Dane pobrane z <strong>{`http://localhost:3000/api/classes`}</strong>:
      </p>

      {mojeKlasy ? (
        <pre>{JSON.stringify(mojeKlasy, null, 2)}</pre>
      ) : (
        <p style={{ color: 'red' }}>
          Nie udało się pobrać danych. Zobacz konsolę serwera frontendu (tam gdzie uruchomiłeś 'npm run dev' dla qr_attendance), aby
          zobaczyć błędy.
        </p>
      )}
    </div>
  );
}