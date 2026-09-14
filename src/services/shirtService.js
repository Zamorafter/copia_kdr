import { supabase, isSupabaseConfigured } from '../config/supabaseClient';
import { SHIRTS_DATA } from '../data/shirts';

const BUCKET_NAME = 'shirt-images';

/**
 * Normaliza los campos de una camisa proveniente de la base de datos
 */
function normalizeShirt(row) {
  return {
    id: row.id,
    name: row.name,
    tag: row.tag || 'NUEVO',
    category: row.category || 'Streetwear',
    image: row.image,
    description: row.description || '',
    color3D: row.color_3d || '#161824',
    accentColor: row.accent_color || '#e1306c',
    createdAt: row.created_at,
  };
}

/**
 * Obtiene todas las camisas desde Supabase o retorna el catálogo por defecto
 */
export async function fetchShirts() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: SHIRTS_DATA, fromSupabase: false };
  }

  try {
    const { data, error } = await supabase
      .from('shirts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error al consultar Supabase, usando catálogo local:', error.message);
      return { data: SHIRTS_DATA, fromSupabase: false, error: error.message };
    }

    if (!data || data.length === 0) {
      // Si la base de datos está vacía, mostramos los datos por defecto para no dejar la web en blanco
      return { data: SHIRTS_DATA, fromSupabase: true, isEmpty: true };
    }

    return {
      data: data.map(normalizeShirt),
      fromSupabase: true,
      isEmpty: false,
    };
  } catch (err) {
    console.warn('Excepción al conectar con Supabase:', err);
    return { data: SHIRTS_DATA, fromSupabase: false, error: err.message };
  }
}

/**
 * Sube un archivo de imagen al bucket público de Supabase Storage
 */
export async function uploadShirtImage(file) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase no está configurado');
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `uploads/${Date.now()}_${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Crea una nueva camisa en la base de datos
 */
export async function createShirt(shirtData, imageFile) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase no está configurado');
  }

  let finalImageUrl = shirtData.image;

  if (imageFile) {
    finalImageUrl = await uploadShirtImage(imageFile);
  }

  if (!finalImageUrl) {
    throw new Error('La camisa debe tener una imagen asignada');
  }

  const payload = {
    name: shirtData.name,
    tag: shirtData.tag || 'NUEVO',
    category: shirtData.category || 'Streetwear',
    image: finalImageUrl,
    description: shirtData.description || '',
    color_3d: shirtData.color3D || '#161824',
    accent_color: shirtData.accentColor || '#e1306c',
  };

  const { data, error } = await supabase
    .from('shirts')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return normalizeShirt(data);
}

/**
 * Actualiza una camisa existente
 */
export async function updateShirt(id, shirtData, newImageFile) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase no está configurado');
  }

  let finalImageUrl = shirtData.image;

  if (newImageFile) {
    finalImageUrl = await uploadShirtImage(newImageFile);
  }

  const payload = {
    name: shirtData.name,
    tag: shirtData.tag,
    category: shirtData.category,
    image: finalImageUrl,
    description: shirtData.description,
    color_3d: shirtData.color3D,
    accent_color: shirtData.accentColor,
  };

  const { data, error } = await supabase
    .from('shirts')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return normalizeShirt(data);
}

/**
 * Elimina una camisa y opcionalmente su imagen en Storage
 */
export async function deleteShirt(id, imageUrl) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase no está configurado');
  }

  // 1. Eliminar de la base de datos
  const { error } = await supabase.from('shirts').delete().eq('id', id);
  if (error) throw error;

  // 2. Si la imagen está en el bucket de Supabase, intentar eliminarla para ahorrar almacenamiento
  if (imageUrl && imageUrl.includes(`/storage/v1/object/public/${BUCKET_NAME}/`)) {
    try {
      const parts = imageUrl.split(`/storage/v1/object/public/${BUCKET_NAME}/`);
      if (parts.length === 2) {
        const filePath = decodeURIComponent(parts[1]);
        await supabase.storage.from(BUCKET_NAME).remove([filePath]);
      }
    } catch (storageErr) {
      console.warn('No se pudo eliminar la imagen del storage:', storageErr);
    }
  }

  return true;
}

/**
 * Sincroniza las camisas iniciales estáticas en Supabase
 */
export async function seedInitialShirts() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase no está configurado');
  }

  const rows = SHIRTS_DATA.map(item => ({
    name: item.name,
    tag: item.tag || 'NUEVO',
    category: item.category || 'Streetwear',
    image: item.image,
    description: item.description || '',
    color_3d: '#161824',
    accent_color: '#e1306c',
  }));

  const { data, error } = await supabase.from('shirts').insert(rows).select();
  if (error) throw error;
  return data.map(normalizeShirt);
}
