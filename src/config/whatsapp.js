// Configuración oficial de WhatsApp e Instagram para la tienda Urban Glow
export const WHATSAPP_CONFIG = {
  phoneNumber: '584121410302', // Número de ventas
  instagramHandle: 'urbanglow358',
  instagramUrl: 'https://www.instagram.com/urbanglow358?igsh=MWRxMHhzb2kzZDdtbw=='
};

/**
 * Genera el enlace directo a WhatsApp con el mensaje exacto solicitado
 * @param {Object} shirt Objeto de la camisa seleccionada
 * @returns {string} Enlace URL para wa.me
 */
export function getWhatsAppLink(shirt) {
  const modelName = shirt ? shirt.name : 'Camisa Urban Glow';
  
  // Obtenemos la URL completa de la imagen o su ruta estática
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://github.com/Zamorafter/isaackdr';
  const imageUrl = shirt ? (shirt.image.startsWith('http') ? shirt.image : `${baseUrl}${shirt.image}`) : '';
  
  // Mensaje exacto solicitado por el usuario:
  // "como estan, quisiera saber en cuanto sale este modelo"
  const message = `como estan, quisiera saber en cuanto sale este modelo: ${modelName}\n\nImagen: ${imageUrl}`;
  
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}
