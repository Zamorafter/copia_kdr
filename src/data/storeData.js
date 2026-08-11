export const INITIAL_STORE_DATA = {
  "producto": {
    "nombre": "Camiseta Samurai Fury",
    "etiqueta": "NUEVO",
    "precio": 39.99,
    "moneda": "USD",
    "valoracion": {
      "puntuacion": 5,
      "numero_resenas": 126
    },
    "descripcion": "Camiseta de edición limitada con un diseño inspirado en la fuerza y el honor samurái. Estampado de alta calidad sobre tela premium para mayor comodidad y estilo.",
    "opciones": {
      "colores_disponibles": [
        { "nombre": "Negro", "seleccionado": true, "hex": "#121212", "color3D": "#121212" },
        { "nombre": "Blanco", "seleccionado": false, "hex": "#f8fafc", "color3D": "#f1f5f9" },
        { "nombre": "Rojo", "seleccionado": false, "hex": "#dc2626", "color3D": "#991b1b" }
      ],
      "tallas_disponibles": ["S", "M", "L", "XL", "XXL"],
      "talla_seleccionada": "M"
    },
    "detalles_tecnicos": [
      "Tela: 100% algodón peinado",
      "Estampado de alta calidad",
      "Ajuste unisex",
      "Cuello redondo",
      "Hecho para durar"
    ],
    "beneficios": [
      "Envío gratis en pedidos +$75",
      "Devoluciones fáciles 30 días",
      "Pago seguro y protegido"
    ],
    "miga_de_pan": ["Inicio", "Hombre", "Camisetas", "Camiseta Samurai Fury"],
    "imagenes": [
      "./shirts/japan-samurai-front.jpg",
      "./shirts/samurai-back.jpg",
      "./shirts/japan-samurai-front.jpg",
      "3d"
    ]
  },
  "tienda": {
    "nombre": "BrandMakers",
    "anuncio_top": "ENVÍO GRATIS EN PEDIDOS +$75",
    "menu_navegacion": ["NUVEDADES", "HOMBRE", "MUJER", "ACCESORIOS", "OFERTAS"]
  },
  "productos_relacionados": [
    {
      "id": "rel-1",
      "nombre": "Camiseta Dragón",
      "etiqueta": "NUEVO",
      "precio": 39.99,
      "moneda": "USD",
      "imagen": "./shirts/shirt_dragon_1786467778150.jpg",
      "descripcion": "Edición especial Dragón Imperial con ilustración mística en impresión de alta precisión.",
      "opciones": {
        "colores_disponibles": [
          { "nombre": "Negro", "seleccionado": true, "hex": "#121212", "color3D": "#121212" },
          { "nombre": "Rojo", "seleccionado": false, "hex": "#dc2626", "color3D": "#991b1b" }
        ],
        "tallas_disponibles": ["S", "M", "L", "XL"],
        "talla_seleccionada": "L"
      },
      "detalles_tecnicos": [
        "Tela: 100% algodón peinado 240g",
        "Estampado serigráfico plastisol",
        "Ajuste oversized",
        "Cuello acanalado"
      ],
      "beneficios": [
        "Envío gratis en pedidos +$75",
        "Devoluciones fáciles 30 días",
        "Pago seguro y protegido"
      ],
      "miga_de_pan": ["Inicio", "Hombre", "Camisetas", "Camiseta Dragón"],
      "imagenes": [
        "./shirts/shirt_dragon_1786467778150.jpg",
        "./shirts/shirt_dragon_1786467778150.jpg",
        "3d"
      ]
    },
    {
      "id": "rel-2",
      "nombre": "Camiseta TOKYO",
      "etiqueta": "NUEVO",
      "precio": 37.99,
      "moneda": "USD",
      "imagen": "./shirts/shirt_tokyo_1786467788288.jpg",
      "descripcion": "Diseño inspirada en la cultura nocturna de Tokio con tipografía kanji y detalles urbanos.",
      "opciones": {
        "colores_disponibles": [
          { "nombre": "Negro", "seleccionado": true, "hex": "#121212", "color3D": "#121212" },
          { "nombre": "Blanco", "seleccionado": false, "hex": "#f8fafc", "color3D": "#f1f5f9" }
        ],
        "tallas_disponibles": ["S", "M", "L", "XL", "XXL"],
        "talla_seleccionada": "M"
      },
      "detalles_tecnicos": [
        "Tela: 100% algodón premium",
        "Estampado de alta definición",
        "Corte relaxed fit",
        "Cuello redondo reforzado"
      ],
      "beneficios": [
        "Envío gratis en pedidos +$75",
        "Devoluciones fáciles 30 días",
        "Pago seguro y protegido"
      ],
      "miga_de_pan": ["Inicio", "Hombre", "Camisetas", "Camiseta TOKYO"],
      "imagenes": [
        "./shirts/shirt_tokyo_1786467788288.jpg",
        "./shirts/shirt_tokyo_1786467788288.jpg",
        "3d"
      ]
    },
    {
      "id": "rel-3",
      "nombre": "Camiseta CHAOS",
      "etiqueta": "NUEVO",
      "precio": 35.99,
      "moneda": "USD",
      "imagen": "./shirts/shirt_chaos_1786467798927.jpg",
      "descripcion": "Estilo vintage desgastado en color blanco hueso con tipografía rebelde CHAOS.",
      "opciones": {
        "colores_disponibles": [
          { "nombre": "Blanco", "seleccionado": true, "hex": "#f8fafc", "color3D": "#f1f5f9" },
          { "nombre": "Negro", "seleccionado": false, "hex": "#121212", "color3D": "#121212" }
        ],
        "tallas_disponibles": ["S", "M", "L", "XL"],
        "talla_seleccionada": "M"
      },
      "detalles_tecnicos": [
        "Tela: 100% algodón vintage wash",
        "Estampado envejecido",
        "Ajuste regular",
        "Cosido reforzado"
      ],
      "beneficios": [
        "Envío gratis en pedidos +$75",
        "Devoluciones fáciles 30 días",
        "Pago seguro y protegido"
      ],
      "miga_de_pan": ["Inicio", "Hombre", "Camisetas", "Camiseta CHAOS"],
      "imagenes": [
        "./shirts/shirt_chaos_1786467798927.jpg",
        "./shirts/shirt_chaos_1786467798927.jpg",
        "3d"
      ]
    },
    {
      "id": "rel-4",
      "nombre": "Camiseta Máscara Oni",
      "etiqueta": "NUEVO",
      "precio": 42.99,
      "moneda": "USD",
      "imagen": "./shirts/shirt_oni_1786467810389.jpg",
      "descripcion": "Edición de colección con gráficos dorados de Máscara Oni folklore japonés.",
      "opciones": {
        "colores_disponibles": [
          { "nombre": "Negro", "seleccionado": true, "hex": "#121212", "color3D": "#121212" },
          { "nombre": "Rojo", "seleccionado": false, "hex": "#dc2626", "color3D": "#991b1b" }
        ],
        "tallas_disponibles": ["M", "L", "XL", "XXL"],
        "talla_seleccionada": "L"
      },
      "detalles_tecnicos": [
        "Tela: 100% algodón peinado pesado",
        "Estampado de pan de oro sintético",
        "Ajuste streetwear boxy",
        "Resistente a lavados"
      ],
      "beneficios": [
        "Envío gratis en pedidos +$75",
        "Devoluciones fáciles 30 días",
        "Pago seguro y protegido"
      ],
      "miga_de_pan": ["Inicio", "Hombre", "Camisetas", "Camiseta Máscara Oni"],
      "imagenes": [
        "./shirts/shirt_oni_1786467810389.jpg",
        "./shirts/shirt_oni_1786467810389.jpg",
        "3d"
      ]
    }
  ]
};
