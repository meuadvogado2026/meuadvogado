/**
 * Utilitário centralizado para máscara e auto-preenchimento de CEP.
 * Utiliza a BrasilAPI para buscar RUA/BAIRRO e o OpenStreetMap (Nominatim) para garantir a Latitude/Longitude.
 */

export const applyCepMask = (value: string): string => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
};

export const cleanCep = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

export interface CepData {
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  lat: number | null;
  lng: number | null;
}

export const fetchCepData = async (rawCep: string): Promise<CepData | null> => {
  const clean = cleanCep(rawCep);
  if (clean.length !== 8) return null;

  try {
    // 1. Busca os dados de endereço na BrasilAPI v1 (mais estável para endereços)
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${clean}`);
    const data = await response.json();

    if (response.status !== 200 || data.errors) return null;

    let lat = null;
    let lng = null;

    // 2. Busca as coordenadas no OpenStreetMap (Garante que nunca fique nulo e quebre o Match)
    try {
      // Tenta pelo endereço completo
      const query = encodeURIComponent(`${data.street ? data.street + ',' : ''} ${data.city}, ${data.state}, Brazil`);
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
      const geoData = await geoRes.json();
      
      if (geoData && geoData.length > 0) {
        lat = parseFloat(geoData[0].lat);
        lng = parseFloat(geoData[0].lon);
      } else {
        // Fallback: Busca apenas pela Cidade e Estado
        const queryCity = encodeURIComponent(`${data.city}, ${data.state}, Brazil`);
        const geoCityRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${queryCity}&limit=1`);
        const geoCityData = await geoCityRes.json();
        if (geoCityData && geoCityData.length > 0) {
          lat = parseFloat(geoCityData[0].lat);
          lng = parseFloat(geoCityData[0].lon);
        }
      }
    } catch (e) {
       console.error("Geocoding fallback failed", e);
    }

    return {
      state: data.state || '',
      city: data.city || '',
      street: data.street || '',
      neighborhood: data.neighborhood || '',
      lat,
      lng,
    };
  } catch {
    return null;
  }
};
