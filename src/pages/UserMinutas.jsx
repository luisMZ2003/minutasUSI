import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/SupabaseAuthContext.jsx';
import { supabase } from '../lib/customSupabaseClient.js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@/components/ui/button';

const UserMinutas = () => {
  const { user, signOut } = useAuth();
  const [minutas, setMinutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchMinutas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('minutas')
        .select('*')
        .eq('usuario_id', user.id);
      if (!error) setMinutas(data);
      setLoading(false);
    };
    fetchMinutas();
  }, [user]);

  const handleEdit = (id) => {
    navigate(`/edit-minuta/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar esta minuta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;
    await supabase.from('minutas').delete().eq('id', id);
    setMinutas(minutas.filter(m => m.id !== id));
  };

  const handleCreate = () => {
    navigate('/create-minuta');
  };

  if (loading) {
    return <div className="p-6 text-center text-lg">Cargando minutas...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-red-600 font-bold">No hay usuario autenticado.</div>;
  }

  return (
    <div className="container-xl px-2 sm:px-4">
      <header className="bg-[#235B4E] font-bold uppercase text-white py-6 px-4 sm:py-10 sm:px-6 rounded shadow-lg mt-4 mb-4" style={{marginTop: '32px'}}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-0 outfit-title">Mis Minutas</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="btn bg-[#BF9B69] hover:bg-[#C8AB7C] d-flex align-items-center justify-center px-4 py-2 text-white w-full sm:w-auto" style={{minWidth: '140px'}} onClick={handleCreate}>
              <i className="material-icons mr-2"></i> Crear nueva minuta
            </button>
            <Button
              className="btn bg-[#A7374F] hover:bg-[#D16272] d-flex align-items-center justify-center px-4 py-2 w-full sm:w-auto"
              style={{minWidth: '140px'}}
              onClick={async () => {
                await signOut();
                navigate('/login');
              }}
            >
              <i className="material-icons mr-2"></i> Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      <div className="table-responsive" style={{overflowX: 'auto'}}>
        <div className="table-wrapper min-w-full">
          <table className="table table-striped table-hover min-w-full text-sm sm:text-base">
            <thead>
              <tr>
                <th className="whitespace-nowrap">#</th>
                <th className="whitespace-nowrap">Folio</th>
                <th className="text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {minutas.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">No tienes minutas registradas.</td>
                </tr>
              ) : (
                minutas.map((minuta, idx) => (
                  <tr key={minuta.id}>
                    <td className="whitespace-nowrap">{idx + 1}</td>
                    <td className="whitespace-nowrap">{minuta.folio || minuta.titulo || `Minuta #${minuta.id}`}</td>
                    <td className="text-center whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                        <button className="btn bg-[#98989A] hover:bg-[#6F7271] d-flex align-items-center justify-center text-white px-3 py-2 w-full sm:w-auto" style={{minWidth: '90px'}} onClick={() => handleEdit(minuta.id)} title="Editar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 24 24" className="mr-2"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                          Editar
                        </button>
                        <button className="btn btn-danger d-flex align-items-center justify-center px-3 py-2 w-full sm:w-auto" style={{minWidth: '90px'}} onClick={() => handleDelete(minuta.id)} title="Eliminar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 24 24" className="mr-2"><path d="M3 6h18v2H3V6zm2 3h14v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2z"/></svg>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserMinutas;
