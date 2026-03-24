import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, MapPin, SlidersHorizontal, X, Navigation, LocateFixed, Loader2 } from "lucide-react";
import { specialties } from "@/data/mock";
import { LawyerCard } from "@/components/LawyerCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { toast } from "sonner";
import { estados, cidadesPorEstado } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";

// Função para calcular distância usando a Fórmula de Haversine
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const Search = () => {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [isLoadingLawyers, setIsLoadingLawyers] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [cepParam, setCepParam] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    const fetchLawyers = async () => {
      setIsLoadingLawyers(true);
      try {
        const { data: profiles, error: pErr } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'lawyer');

        const { data: details, error: dErr } = await supabase
          .from('lawyer_details')
          .select('*')
          .eq('status', 'approved'); // Apenas aprovados

        if (profiles && details) {
          const verifiedLawyers = profiles.filter(p => details.some(d => d.id === p.id));

          const mappedData = verifiedLawyers.map(p => {
            const d = details.find(x => x.id === p.id) || {};
            return {
              id: p.id,
              name: p.name || 'Advogado(a)',
              specialty: d.main_specialty || 'Não informada',
              secondarySpecialties: d.secondary_specialties || [], // Adicionando especialidades secundárias
              city: p.city || '',
              state: p.state || '',
              cep: p.cep || '',
              rating: d.rating || 5.0,
              reviews: d.reviews_count || 0,
              verified: d.is_verified || false,
              image: p.avatar_url || '',
              cover: p.cover_url || '',
              bio: d.mini_bio || d.full_bio || '',
              type: d.attendance_type || 'Híbrido (Online e Presencial)',
              phone: d.whatsapp || p.phone || '',
              lat: p.lat ? parseFloat(p.lat) : null,
              lng: p.lng ? parseFloat(p.lng) : null
            };
          });
          setLawyers(mappedData);
        }
      } catch (error) {
        console.error("Erro ao buscar advogados:", error);
        toast.error("Erro ao carregar lista de advogados.");
      } finally {
        setIsLoadingLawyers(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada", { description: "Seu navegador não suporta este recurso." });
      return;
    }

    toast.loading("Buscando sua localização exata...", { id: "loc" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setCepParam("");
        setSelectedCity("");
        setSelectedState("");
        setSortBy("distance");
        toast.success("Localização encontrada com sucesso!", { id: "loc" });
      },
      (error) => {
        toast.error("Erro ao acessar localização", { 
          id: "loc", 
          description: "Permissão negada ou sinal fraco. Use o CEP." 
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const applyCepMask = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const fetchBrasilApiCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`);
      const data = await response.json();

      if (response.status !== 200 || data.errors) {
        toast.error("CEP não encontrado", { description: "Verifique o número e tente novamente." });
        return;
      }

      // Preenche visualmente estado e cidade para o usuário ver onde está
      setSelectedState(data.state);
      setSelectedCity(data.city);
      setSortBy("distance");

      if (data.location && data.location.coordinates && data.location.coordinates.latitude) {
         setUserLocation({
           lat: parseFloat(data.location.coordinates.latitude),
           lng: parseFloat(data.location.coordinates.longitude)
         });
         toast.success("Localização exata encontrada!", { description: `Buscando ao redor de ${data.street || data.neighborhood}` });
      } else {
         // Fallback para o OpenStreetMap caso o BrasilAPI não devolva as coordenadas para esse CEP específico
         try {
            const osmRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cleanCep}&country=Brazil`);
            const osmData = await osmRes.json();
            if (osmData && osmData.length > 0) {
                setUserLocation({
                    lat: parseFloat(osmData[0].lat),
                    lng: parseFloat(osmData[0].lon)
                });
                toast.success("Região identificada com sucesso!", { description: `Buscando advogados próximos do CEP ${cep}` });
                return;
            }
         } catch (e) {
            console.error("OSM Geocoding failed", e);
         }

         // Se falhar a geolocalização do CEP, ficamos com a busca estrita por Cidade e Estado
         setUserLocation(null);
         toast.success("Região identificada!", { description: `Buscando advogados em ${data.city} - ${data.state}` });
      }
      
    } catch (error) {
      toast.error("Erro na busca do CEP", { description: "Tente selecionar o estado e cidade manualmente." });
    } finally {
      setIsFetchingCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCep = applyCepMask(e.target.value);
    setCepParam(maskedCep);
    if (maskedCep.length === 9) fetchBrasilApiCep(maskedCep);
  };

  const processedLawyers = lawyers.map(lawyer => {
    let distance = lawyer.distance; 
    if (userLocation && lawyer.lat && lawyer.lng) {
      distance = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, lawyer.lat, lawyer.lng);
    }
    return { ...lawyer, distance };
  });

  const filteredLawyers = processedLawyers
    .filter(lawyer => {
      const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Checa tanto a especialidade principal quanto as secundárias
      const matchesSpecialty = selectedSpecialty === "all" || 
                               lawyer.specialty === selectedSpecialty || 
                               (lawyer.secondarySpecialties && lawyer.secondarySpecialties.includes(selectedSpecialty));
      
      let matchesCity = true;
      let matchesState = true;

      if (!userLocation) {
        matchesCity = selectedCity === "" || lawyer.city.toLowerCase() === selectedCity.toLowerCase();
        matchesState = selectedState === "" || lawyer.state.toLowerCase() === selectedState.toLowerCase();
      }
      
      let matchesType = true;
      if (selectedType === "Online") matchesType = lawyer.type.includes("Online") || lawyer.type.includes("Híbrido");
      if (selectedType === "Presencial") matchesType = lawyer.type.includes("Presencial") || lawyer.type.includes("Híbrido");

      return matchesSearch && matchesSpecialty && matchesCity && matchesState && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        const distA = a.distance ?? 999999; 
        const distB = b.distance ?? 999999;
        if (distA !== distB) {
          return distA - distB; 
        }
      }
      return b.rating - a.rating;
    });

  const clearFilters = () => {
    setSearchTerm("");
    setCepParam("");
    setSelectedSpecialty("all");
    setSelectedCity("");
    setSelectedState("");
    setSelectedType("all");
    setSortBy("recommended");
    setUserLocation(null);
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#1E3A5F]" /> Localização
        </h3>
        
        <div className="space-y-4">
          <Button 
            variant={userLocation ? "default" : "outline"}
            onClick={handleUseLocation}
            className={`w-full h-11 font-bold rounded-xl ${userLocation ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-50/50 border-blue-200 text-blue-700 hover:bg-blue-100'}`}
          >
            <LocateFixed className="w-4 h-4 mr-2" /> 
            {userLocation ? "Localização GPS Ativa" : "Usar minha localização GPS"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Ou informe a região</span></div>
          </div>

          <div className="relative">
            <Input 
              placeholder="Digite seu CEP" 
              value={cepParam}
              onChange={handleCepChange}
              maxLength={9}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 pr-10"
            />
            {isFetchingCep && (
              <div className="absolute right-3 top-3.5">
                <Loader2 className="w-4 h-4 animate-spin text-[#1E3A5F]" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <select 
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity(""); 
                setUserLocation(null); 
                setCepParam(""); 
                setSortBy("recommended");
              }}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 col-span-1 px-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
            >
              <option value="">UF</option>
              {estados.map(estado => (
                <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
              ))}
            </select>
            
            <select 
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setUserLocation(null); 
                setCepParam("");
              }}
              disabled={!selectedState}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 col-span-2 px-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none disabled:opacity-50"
            >
              <option value="">Cidade</option>
              {selectedState && cidadesPorEstado[selectedState]?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div>
        <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Especialidade</h3>
        <select 
          value={selectedSpecialty} 
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none font-medium"
        >
          <option value="all">Todas as áreas</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div className="w-full h-px bg-slate-100" />

      <div>
        <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider mb-4">Modalidade de Atendimento</h3>
        <div className="space-y-3">
          {[
            { id: 'all', label: 'Qualquer formato' },
            { id: 'Presencial', label: 'Apenas Presencial (Próximos)' },
            { id: 'Online', label: 'Online (Todo Brasil)' }
          ].map(type => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-transparent hover:bg-slate-50 hover:border-slate-200 transition-colors">
              <input 
                type="radio" 
                name="attendanceType" 
                value={type.id}
                checked={selectedType === type.id}
                onChange={() => setSelectedType(type.id)}
                className="w-4 h-4 text-[#1E3A5F] focus:ring-[#1E3A5F] border-slate-300" 
              />
              <span className="text-sm font-semibold text-slate-700">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="ghost" onClick={clearFilters} className="w-full h-11 rounded-xl text-slate-500 font-bold hover:bg-slate-100 hover:text-slate-700">
        <X className="w-4 h-4 mr-2" /> Limpar Filtros
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Search Area */}
        <div className="bg-[#0F172A] p-6 rounded-3xl shadow-xl shadow-slate-900/10 mb-8 flex flex-col md:flex-row gap-4 items-center border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none -mt-10 -mr-10"><MapPin className="w-64 h-64 text-white" /></div>
          
          <div className="relative flex-1 w-full z-10">
            <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Buscar por nome ou palavra-chave..." 
              className="pl-12 h-14 text-base rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-white/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Mobile Filter Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full md:hidden h-14 rounded-2xl bg-white text-[#0F172A] font-black hover:bg-slate-100 z-10">
                <SlidersHorizontal className="w-5 h-5 mr-2" /> Filtros e Localização
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-[2rem]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-black text-[#0F172A]">Filtros da Busca</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-full pb-24 px-1">
                <FilterSidebar />
                <SheetClose asChild>
                  <Button className="w-full h-14 mt-8 rounded-2xl bg-[#0F172A] text-white font-bold text-lg">
                    Ver Resultados
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="hidden md:block w-[300px] shrink-0">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-[#1E3A5F]" />
                <h2 className="text-lg font-black text-[#0F172A]">Refinar Busca</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* List */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-medium text-slate-600">
                {isLoadingLawyers ? (
                  <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Buscando...</span>
                ) : (
                  <>Exibindo <span className="font-black text-[#0F172A]">{filteredLawyers.length}</span> advogados</>
                )}
              </h2>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-500">Ordenar por:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-[#0F172A] focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recomendados</option>
                  <option value="distance">Mais Próximos</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {!isLoadingLawyers && filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
              
              {!isLoadingLawyers && filteredLawyers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <Navigation className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-[#0F172A] mb-2">Nenhum profissional encontrado</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">Tente remover alguns filtros ou buscar em outras regiões para encontrar especialistas.</p>
                  <Button onClick={clearFilters} className="rounded-xl font-bold bg-[#1E3A5F] hover:bg-[#0F172A] h-12 px-6">
                    Limpar Filtros e Tentar Novamente
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};