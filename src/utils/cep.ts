/**
 * Utilitário centralizado para máscara e auto-preenchimento de CEP.
 * Utiliza a BrasilAPI para geocodificação.
 */

/** Aplica a máscara de CEP (XXXXX-XXX) */
export const applyCepMask = (value: string): string => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
};

/** Remove a máscara e retorna apenas os dígitos */
export const cleanCep = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

/** Dados retornados pela BrasilAPI v2 */
export interface CepData {
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  lat: number | null;
  lng: number | null;
}

/**
 * Busca dados de endereço a partir de um CEP limpo (8 dígitos).
 * Retorna null se houver erro ou CEP inválido.
 */
export const fetchCepData = async (rawCep: string): Promise<CepData | null> => {
  const clean = cleanCep(rawCep);
  if (clean.length !== 8) return null;

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${clean}`);
    const data = await response.json();

    if (response.status !== 200 || data.errors) return null;

    return {
      state: data.state || '',
      city: data.city || '',
      street: data.street || '',
      neighborhood: data.neighborhood || '',
      lat: data.location?.coordinates?.latitude
        ? parseFloat(data.location.coordinates.latitude)
        : null,
      lng: data.location?.coordinates?.longitude
        ? parseFloat(data.location.coordinates.longitude)
        : null,
    };
  } catch {
    return null;
  }
};
