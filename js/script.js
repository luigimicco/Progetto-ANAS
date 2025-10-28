const { createApp, reactive } = Vue;

createApp({
  data() {
    return {
      // Array roads con 5 strade siciliane
      roads: [
        {
          id: 101,
          name: 'E45 Sicilia (Messina-Gela)',
          type: 'Autostrada',
          coordinates: [
            // --- A18 Messina-Catania ---
            [38.1938, 15.5540], // Messina
            [38.1708, 15.5677], // Tremestieri
            [38.1264, 15.5458], // Roccalumera
            [37.8597, 15.2997], // Taormina
            [37.7632, 15.1869], // Giardini Naxos
            [37.7308, 15.1620], // Fiumefreddo
            [37.7173, 15.1721], // Giarre
            [37.6153, 15.1709], // Acireale
            [37.5271, 15.0732], // Catania Nord
            [37.5079, 15.0830], // Catania Sud

            // --- Tangenziale Catania/RA15, Passo Martino sud ---
            [37.4829, 15.0527], // Asse tangenziale
            [37.4312, 15.0180], // Passo Martino (RA15 sud)

            // --- Svincoli Autostrada Catania-Siracusa (A18dir) ---
            [37.3625, 15.0631], // Lentini
            [37.3046, 15.0586], // Carlentini

            // --- Augusta e Orientale Sicula ---
            [37.2191, 15.2147], // Augusta
            [37.1671, 15.2222], // Melilli
            [37.1209, 15.2088], // Priolo Gargallo
            [37.0755, 15.2866], // Siracusa

            // --- Siracusa-Gela (A18 Sud e SS115) ---
            [36.9676, 15.1630], // Noto
            [36.9000, 15.1400], // Rosolini
            [36.8601, 14.7618], // Modica
            [36.6810, 14.7136], // Comiso/Licata (appross.)
            [37.0734, 14.2442]  // Gela (capolinea sud)
          ],
          length: 270, // circa chilometraggio del tratto siciliano
          isInterrotta: false,
          provincia: 'Sicilia'
        },

        {
          id: 103,
          name: 'SS121 Catanese (Catania-Palermo storica)',
          type: 'Statale',
          coordinates: [
            [37.5079, 15.0830],   // Catania
            [37.5153, 15.0270],   // Misterbianco
            [37.5670, 14.8843],   // Motta Sant’Anastasia
            [37.6172, 14.8478],   // Paternò
            [37.6789, 14.8431],   // Santa Maria di Licodia
            [37.7045, 14.8322],   // Adrano (imbocco SS284)
            [37.7285, 14.8306],   // Biancavilla
            [37.7470, 14.8393],   // Centuripe
            [37.7153, 14.6087],   // Regalbuto
            [37.6507, 14.2716],   // Agira
            [37.5676, 14.0572],   // Leonforte
            [37.5644, 13.9473],   // Villarosa
            [37.5831, 13.8230],   // Vallelunga Pratameno
            [37.6811, 13.7933],   // Caltanissetta (traversa SS121 antica)
            [37.8293, 13.7126],   // Alimena
            [37.8184, 13.6581],   // Petralia Sottana
            [37.8501, 13.5912],   // Gangi
            [37.8739, 13.5132],   // Castellana Sicula
            [38.0117, 13.4630],   // Alia
            [38.0365, 13.3639],   // Valledolmo
            [38.0999, 13.3502],   // Roccapalumba
            [38.1108, 13.3113],   // Lercara Friddi
            [38.1383, 13.3041],   // Mezzojuso
            [38.0981, 13.2505],   // Villafrati
            [38.0678, 13.2789],   // Bolognetta
            [38.0836, 13.3887],   // Misilmeri
            [38.1000, 13.4340],   // Belmonte Mezzagno
            [38.1254, 13.4360],   // Palermo (Acqua dei Corsari, fine SS121 storica)
          ],
          length: 225,
          isInterrotta: false,
          provincia: 'Sicilia'
        },
        {
          id: 104,
          name: 'SP121 Recupero–Santa Maria del Focallo',
          type: 'Provinciale',
          coordinates: [
            [36.7464, 14.9952], // Recupero (inizio tratto)
            [36.7445, 15.0203], // Incrocio SP37
            [36.7435, 15.0417], // Santa Maria del Focallo, area balneare/Ispica (fine)
          ],
          length: 6.2,
          isInterrotta: false,
          provincia: 'Ragusa'
        }


        /*                
                        {
                            id: 2,
                            name: 'SS113 Settentrionale Sicula',
                            type: 'Statale',
                            coordinates: [[38.1157, 13.3615], [37.9138, 12.7969]],
                            length: 85.2,
                            isInterrotta: true,
                            provincia: 'Palermo'
                        },
                        {
                            id: 3,
                            name: 'SP25 Provinciale Agrigentina',
                            type: 'Provinciale',
                            coordinates: [[37.3089, 13.5858], [37.2966, 13.6189]],
                            length: 12.8,
                            isInterrotta: false,
                            provincia: 'Agrigento'
                        },
                        {
                            id: 4,
                            name: 'A18 Messina-Catania',
                            type: 'Autostrada',
                            coordinates: [[37.5079, 15.0830], [38.1938, 15.5540]],
                            length: 76.8,
                            isInterrotta: false,
                            provincia: 'Multiple'
                        },
                        {
                            id: 5,
                            name: 'SS117 Centrale Sicula',
                            type: 'Statale',
                            coordinates: [[37.5079, 15.0830], [37.4922, 14.0681]],
                            length: 94.5,
                            isInterrotta: true,
                            provincia: 'Catania'
                        }
        */
      ],
      availableTypes: ['Autostrada', 'Statale', 'Provinciale'],
      activeFilters: ['Autostrada', 'Statale', 'Provinciale'],
      map: null,
      layers: new Map()
    }
  },

  computed: {
    filteredRoads() {
      return this.roads.filter(road => this.activeFilters.includes(road.type));
    },

    interruptedCount() {
      return this.filteredRoads.filter(road => road.isInterrotta).length;
    },

    visibleCount() {
      return this.filteredRoads.length;
    }
  },

  watch: {
    activeFilters: {
      handler() {
        this.renderRoads();
      },
      deep: true
    },

    roads: {
      handler() {
        this.renderRoads();
      },
      deep: true
    }
  },

  methods: {
    initMap() {
      // Fix icone Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Crea mappa Leaflet
      this.map = L.map('map').setView([37.5999, 14.0154], 8);

      // Tile layer OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 16,
        minZoom: 6
      }).addTo(this.map);

      // Render strade dopo init
      this.renderRoads();
    },

    renderRoads() {
      if (!this.map) return;

      // Rimuovi tutti i layer esistenti
      this.layers.forEach((layer) => {
        this.map.removeLayer(layer);
      });
      this.layers.clear();

      // Aggiungi polyline per strade filtrate
      this.filteredRoads.forEach(road => {
        let color;
        let weight;
        let dashArray = null;

        // Determina colore e stile
        if (road.isInterrotta) {
          color = '#e74c3c'; // Rosso per interrotte
          dashArray = '10, 10';
        } else {
          switch (road.type) {
            case 'Autostrada':
              color = '#2ecc71'; // Verde
              break;
            case 'Statale':
              color = '#3498db'; // Blu
              break;
            case 'Provinciale':
              color = '#f39c12'; // Arancione
              break;
            default:
              color = '#95a5a6';
          }
        }

        // Determina weight
        switch (road.type) {
          case 'Autostrada':
            weight = 6;
            break;
          case 'Statale':
            weight = 4;
            break;
          case 'Provinciale':
            weight = 3;
            break;
          default:
            weight = 3;
        }

        // Crea polyline
        const polyline = L.polyline(road.coordinates, {
          color: color,
          weight: weight,
          opacity: 0.8,
          dashArray: dashArray
        });

        // Popup con dettagli strada
        const popupContent = `
                    <div class="popup-content">
                        <h3>${road.name}</h3>
                        <p><strong>Tipo:</strong> ${road.type}</p>
                        <p><strong>Lunghezza:</strong> ${road.length} km</p>
                        <p><strong>Provincia:</strong> ${road.provincia}</p>
                        <p class="status ${road.isInterrotta ? 'interrupted' : 'active'}">
                            <strong>Stato:</strong> ${road.isInterrotta ? 'INTERROTTA' : 'ATTIVA'}
                        </p>
                    </div>
                `;

        polyline.bindPopup(popupContent);

        // Eventi hover
        polyline.on('mouseover', function () {
          this.setStyle({ weight: weight + 2 });
        });

        polyline.on('mouseout', function () {
          this.setStyle({ weight: weight });
        });

        // Aggiungi a mappa e salva layer
        polyline.addTo(this.map);
        this.layers.set(road.id, polyline);
      });
    },

    focusOnRoad(road) {
      if (!this.map || !road.coordinates.length) return;

      // Calcola bounds e centra mappa
      const bounds = L.latLngBounds(road.coordinates);
      this.map.fitBounds(bounds, { padding: [20, 20] });

      // Apri popup della strada
      const layer = this.layers.get(road.id);
      if (layer) {
        layer.openPopup();
      }
    },

    toggleInterrotta(road) {
      // Inverte stato isInterrotta
      road.isInterrotta = !road.isInterrotta;
      // renderRoads() verrà chiamato automaticamente dal watcher
    },

    toggleFilter(type) {
      // Aggiunge/rimuove type da activeFilters
      const index = this.activeFilters.indexOf(type);
      if (index === -1) {
        this.activeFilters.push(type);
      } else {
        this.activeFilters.splice(index, 1);
      }
      // renderRoads() verrà chiamato automaticamente dal watcher
    }
  },

  mounted() {
    // Attendi che Leaflet sia caricato
    if (typeof L !== 'undefined') {
      this.initMap();
    } else {
      // Fallback se Leaflet non è ancora caricato
      const checkLeaflet = setInterval(() => {
        if (typeof L !== 'undefined') {
          clearInterval(checkLeaflet);
          this.initMap();
        }
      }, 100);
    }
  }
}).mount('#app');
