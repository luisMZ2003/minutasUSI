// Función para generar folio único para minutas
// Recibe: supabase, fecha (Date o string YYYY-MM-DD), area (string)
// Devuelve: folio string

// Utilidad para obtener iniciales del área desde el value de las opciones
function getAreaInitials(area) {
  if (!area) return '';
  // Ejemplo: "Admisión Educación Básica" => "AEB"
  // Si el área tiene paréntesis, ignora lo que está dentro
  const clean = area.replace(/\(.*?\)/g, '').trim();
  // Toma la primera letra de cada palabra significativa
  return clean
    .split(/\s+/)
    .filter(w => w.length > 2 || /^[A-ZÁÉÍÓÚ]/.test(w))
    .map(w => w[0].toUpperCase())
    .join('');
}

export async function generarFolio(supabase, fecha, area) {
  // 1. Formatear fecha a DDMMYY
  let d;
  if (typeof fecha === 'string') {
    // Asumimos formato YYYY-MM-DD
    const [year, month, day] = fecha.split('-').map(Number);
    d = new Date(year, month - 1, day); // Esto crea la fecha local correctamente
  } else {
    d = fecha;
  }
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  const fechaStr = `${dd}${mm}${yy}`;

  // 2. Iniciales del área
  const areaInitials = getAreaInitials(area);

  // 3. Prefijo
  const prefix = `CT${fechaStr}${areaInitials}`;

  // 4. Consultar supabase para contar minutas con ese prefijo
  const { data, error } = await supabase
    .from('minutas')
    .select('folio')
    .ilike('folio', `${prefix}%`);
  let consecutivo = 1;
  if (!error && data && Array.isArray(data)) {
    consecutivo = data.length + 1;
  }
  const folio = `${prefix}-${String(consecutivo).padStart(2, '0')}`;
  return folio;
}
