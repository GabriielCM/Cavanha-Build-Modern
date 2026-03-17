import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Store, Clock, Navigation, Truck, Building2, Users } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import {
  DELIVERY_CITIES,
  DELIVERY_CITY_COORDS,
  STORE_LOCATIONS,
  WHATSAPP_MSG,
  WHATSAPP_DELIVERY_MSG,
} from "@/lib/mock-data";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { cn } from "@/lib/utils";

// ─── Constants ─────────────────────────────────────────────────────────────────

const MAP_CENTER: L.LatLngTuple = [-24.0463, -52.3784];
const BRAZIL_CENTER: L.LatLngTuple = [-14.235, -51.925];
const PARANA_BOUNDS: L.LatLngBoundsExpression = [
  [-26.5, -55.0],
  [-22.0, -49.0],
];

// ─── Custom Icons ──────────────────────────────────────────────────────────────

const createStoreIcon = () =>
  L.divIcon({
    className: "",
    html: `<div class="store-marker">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });

const createCityIcon = (isActive: boolean) =>
  L.divIcon({
    className: "",
    html: `<div class="city-marker ${isActive ? "marker-active" : ""}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -8],
  });

const storeIcon = createStoreIcon();

// ─── Ant-Path Component ────────────────────────────────────────────────────────

function AntPath({
  positions,
  show,
  delay = 0,
}: {
  positions: L.LatLngTuple[];
  show: boolean;
  delay?: number;
}) {
  const map = useMap();
  const layerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!show) return;

    const timeout = setTimeout(() => {
      // Animated dashed polyline (CSS-based ant march effect)
      const polyline = L.polyline(positions, {
        color: "#F5841F",
        weight: 2.5,
        opacity: 0.7,
        dashArray: "8 12",
        className: "ant-path-line",
      }).addTo(map);

      layerRef.current = polyline;
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, positions, show, delay]);

  return null;
}

// ─── Map Animator (FlyTo on viewport entry) ────────────────────────────────────

function MapAnimator({
  activeCity,
  onFlyComplete,
}: {
  activeCity: string | null;
  onFlyComplete: () => void;
}) {
  const map = useMap();
  const hasFlown = useRef(false);

  // Initial flyTo from Brazil → Campo Mourão
  useEffect(() => {
    if (hasFlown.current) return;

    // Start zoomed out on Brazil
    map.setView(BRAZIL_CENTER, 4, { animate: false });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFlown.current) {
          hasFlown.current = true;
          observer.disconnect();

          // Cinematic flyTo
          map.flyTo(MAP_CENTER, 11, { duration: 3 });
          map.once("moveend", () => {
            onFlyComplete();
          });
        }
      },
      { threshold: 0.3 }
    );

    const container = map.getContainer();
    observer.observe(container);

    return () => observer.disconnect();
  }, [map, onFlyComplete]);

  // FlyTo when clicking a city chip
  useEffect(() => {
    if (!activeCity || !hasFlown.current) return;

    const coords = DELIVERY_CITY_COORDS[activeCity];
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 12, { duration: 1.5 });
    }
  }, [map, activeCity]);

  return null;
}

// ─── Glow Circle Wrapper ───────────────────────────────────────────────────────

function GlowCircle({ show }: { show: boolean }) {
  const map = useMap();
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!show) return;

    const circle = L.circle(MAP_CENTER, {
      radius: 55000,
      color: "#F5841F",
      fillColor: "#F5841F",
      fillOpacity: 0.06,
      weight: 2.5,
      dashArray: "10 6",
      className: "glow-circle",
    }).addTo(map);

    circleRef.current = circle;

    return () => {
      if (circleRef.current) {
        map.removeLayer(circleRef.current);
      }
    };
  }, [map, show]);

  return null;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function DeliveryMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleFlyComplete = useCallback(() => {
    setShowRoutes(true);
  }, []);

  // Sede coords for route origin
  const sedeCoords: L.LatLngTuple = [
    STORE_LOCATIONS[0].lat,
    STORE_LOCATIONS[0].lng,
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      id="entrega"
      style={{ height: "70vh", minHeight: "500px" }}
    >
      {/* ── Map ──────────────────────────────────────────────────────── */}
      <MapContainer
        center={BRAZIL_CENTER}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={false}
        maxBounds={PARANA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={8}
        maxZoom={14}
        className="delivery-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapAnimator
          activeCity={activeCity}
          onFlyComplete={handleFlyComplete}
        />

        {/* Glow coverage circle */}
        <GlowCircle show={showRoutes} />

        {/* Ant-path routes: Sede → each city */}
        {DELIVERY_CITIES.map((city, i) => {
          const coords = DELIVERY_CITY_COORDS[city];
          if (!coords || city === "Campo Mourao") return null;
          return (
            <AntPath
              key={city}
              positions={[sedeCoords, [coords.lat, coords.lng]]}
              show={showRoutes}
              delay={i * 150}
            />
          );
        })}

        {/* Store markers */}
        {STORE_LOCATIONS.map((store) => (
          <Marker
            key={store.name}
            position={[store.lat, store.lng]}
            icon={storeIcon}
          >
            <Popup className="store-popup" maxWidth={280}>
              <div className="w-65">
                <img
                  src={store.image}
                  alt={store.label}
                  className="h-32 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-store.svg";
                  }}
                />
                <div className="p-3">
                  <h3
                    className="text-base font-bold"
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      color: "#0D2B5C",
                    }}
                  >
                    {store.label}
                  </h3>
                  <p
                    className="mt-1 text-xs text-gray-500"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {store.address}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#F5841F]">
                    <Clock className="h-3 w-3" />
                    {store.hours}
                  </div>
                </div>
              </div>
            </Popup>
            <Tooltip
              permanent
              direction="top"
              offset={[0, -22]}
              className="city-tooltip"
            >
              {store.name}
            </Tooltip>
          </Marker>
        ))}

        {/* City markers */}
        {DELIVERY_CITIES.map((city) => {
          const coords = DELIVERY_CITY_COORDS[city];
          if (!coords || city === "Campo Mourao") return null;
          const isActive = activeCity === city;
          return (
            <Marker
              key={city}
              position={[coords.lat, coords.lng]}
              icon={createCityIcon(isActive)}
            >
              <Popup className="premium-popup" maxWidth={240}>
                <div className="w-55 p-4">
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      color: "#0D2B5C",
                    }}
                  >
                    {city}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                    <Navigation className="h-3 w-3" />
                    ~{coords.distKm}km de Campo Mourão
                  </div>
                  <a
                    href={WHATSAPP_DELIVERY_MSG(city)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1da851]"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Consultar Entrega
                  </a>
                </div>
              </Popup>
              <Tooltip
                permanent
                direction="right"
                offset={[8, 0]}
                className="city-tooltip"
              >
                {city}
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      {/* ── Glassmorphism Card Overlay (left) ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto absolute top-4 bottom-4 left-4 z-1000 hidden w-95 flex-col overflow-y-auto rounded-2xl border border-white/60 bg-white/85 p-6 shadow-2xl backdrop-blur-xl lg:flex"
      >
        <div>
          <h2 className="font-[Barlow_Condensed,sans-serif] text-3xl font-black uppercase leading-none tracking-tight text-[#0D2B5C] xl:text-4xl">
            Entregamos na
            <br />
            <span className="text-[#F5841F]">sua cidade</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-[#F5841F]" />

          <p className="mt-4 font-[Nunito,sans-serif] text-sm leading-relaxed text-gray-600">
            Levamos materiais de construção para toda a região de Campo Mourão e
            arredores. Frota própria, entrega rápida e segura.
          </p>
        </div>

        {/* City Chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {DELIVERY_CITIES.map((city, i) => {
            const isActive = activeCity === city;
            const isHub = city === "Campo Mourao";
            return (
              <motion.button
                key={city}
                onClick={() => setActiveCity(isActive ? null : city)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 font-[Nunito,sans-serif] text-xs font-semibold transition-all",
                  isHub
                    ? "bg-[#F5841F] text-white shadow-md"
                    : isActive
                      ? "border border-[#F5841F] bg-[#F5841F]/10 text-[#F5841F]"
                      : "border border-gray-200 bg-white/80 text-[#0D2B5C] hover:border-[#F5841F]/40 hover:bg-[#F5841F]/5"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-2.5 w-2.5" />
                {city}
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-5">
          <a
            href={WHATSAPP_MSG()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShimmerButton
              variant="orange"
              size="lg"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              Consultar Entrega
            </ShimmerButton>
          </a>
        </div>
      </motion.div>

      {/* ── Mobile Card (below map on small screens) ─────────────── */}
      <div className="absolute inset-x-0 bottom-0 z-1000 bg-white/90 p-4 backdrop-blur-xl lg:hidden">
        <h2 className="font-[Barlow_Condensed,sans-serif] text-xl font-black uppercase text-[#0D2B5C]">
          Entregamos na{" "}
          <span className="text-[#F5841F]">sua cidade</span>
        </h2>
        <div className="mt-2 flex flex-wrap gap-1">
          {DELIVERY_CITIES.slice(0, 6).map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(activeCity === city ? null : city)}
              className={cn(
                "rounded-full px-2.5 py-1 font-[Nunito,sans-serif] text-[10px] font-semibold",
                activeCity === city
                  ? "bg-[#F5841F] text-white"
                  : "border border-gray-200 bg-white text-[#0D2B5C]"
              )}
            >
              {city}
            </button>
          ))}
          <span className="self-center text-xs text-gray-400">
            +{DELIVERY_CITIES.length - 6} cidades
          </span>
        </div>
        <a
          href={WHATSAPP_MSG()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F5841F] px-5 py-2 text-sm font-bold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Consultar Entrega
        </a>
      </div>

      {/* ── Stats Mini-Card (bottom-right) ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute right-4 bottom-4 z-1000 hidden rounded-xl border border-white/60 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-lg lg:block"
      >
        <div className="flex items-center gap-5 font-[Nunito,sans-serif] text-xs font-bold text-[#0D2B5C]">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#F5841F]" />
            12 cidades
          </span>
          <span className="flex items-center gap-1.5">
            <Store className="h-3.5 w-3.5 text-[#F5841F]" />
            2 lojas
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-[#F5841F]" />
            Frota própria
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-[#F5841F]" />
            +5 anos
          </span>
        </div>
      </motion.div>
    </section>
  );
}
