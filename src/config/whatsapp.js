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
  
  // URL completa de la imagen según el dominio donde esté alojada la web
  let imageUrl = '';
  if (shirt && shirt.image) {
    if (shirt.image.startsWith('http')) {
      imageUrl = shirt.image;
    } else if (typeof window !== 'undefined') {
      const cleanPath = shirt.image.replace(/^\.\//, '');
      const currentUrl = window.location.href.split('?')[0].split('#')[0];
      const dirUrl = currentUrl.endsWith('/') ? currentUrl : currentUrl + '/';
      imageUrl = new URL(cleanPath, dirUrl).href;
    }
  }

  // Mensaje exacto solicitado por el usuario:
  // "como estan, quisiera saber en cuanto sale este modelo"
  const message = `como estan, quisiera saber en cuanto sale este modelo: ${modelName}\n\nImagen: ${imageUrl}`;
  
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedText}`;
}
