// Configuración oficial de WhatsApp para la tienda
export const WHATSAPP_CONFIG = {
  phoneNumber: '584121410302', // Número provisto por el usuario
  instagramHandle: 'streetwear_3d'
};

/**
 * Genera el enlace directo a WhatsApp con el mensaje pre-cargado
 * @param {Object} shirt Objeto de la camisa seleccionada
 * @returns {string} Enlace URL para wa.me
 */
export function getWhatsAppLink(shirt) {
  const modelName = shirt ? shirt.name : 'Camisa Exclusiva 3D';
  const imageUrl = shirt ? shirt.image : '';
  
  // Mensaje exacto solicitado por el usuario:
  // "como estan, quisiera saber en cuanto sale este modelo" + detalles e imagen
  const message = `como estan, quisiera saber en cuanto sale este modelo: ${modelName}\n\nImagen: ${imageUrl}`;
  
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}
