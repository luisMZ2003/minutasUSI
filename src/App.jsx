import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Upload, LogOut, Loader2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useMeetingData } from '@/hooks/useMeetingData';
import { generatePrintHTML } from '@/lib/print';
import { generarFolio } from '@/lib/generarFolio';
import BasicInfoSection from '@/components/MeetingForm/BasicInfoSection';
import AreaSelectionSection from '@/components/MeetingForm/AreaSelectionSection';
import TitularesSection from '@/components/MeetingForm/TitularesSection';
import ExpositionSection from '@/components/MeetingForm/ExpositionSection';
import AgreementsSection from '@/components/MeetingForm/AgreementsSection';
import AttendeesSection from '@/components/MeetingForm/AttendeesSection';
import SignatureSection from '@/components/MeetingForm/SignatureSection';
import TechTeamSection from '@/components/MeetingForm/TechTeamSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { supabase } from '@/lib/customSupabaseClient';

const AuthForm = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await signIn(email, password);
    } else {
      setRegisterLoading(true);
      result = await signUp(email, password);
      setRegisterLoading(false);
      if (!result?.error) {
        setRegisterSuccess(true);
        // Mostrar notificación de verificación de correo
        toast({
          title: 'Registro exitoso',
          description: 'Se ha enviado un correo de verificación. Por favor revisa tu bandeja de entrada.',
          variant: 'default',
        });
        // Cambiar automáticamente a la vista de inicio de sesión después de 2.5s
        setTimeout(() => {
          setIsLogin(true);
          setRegisterSuccess(false);
        }, 2500);
        return;
      }
    }
    // Si hay error de clave duplicada, no mostrar ningún mensaje y no navegar
    if (result?.error && result?.error?.message && result?.error?.message.includes('duplicate key value')) {
      // Oculta el error completamente
      return;
    }
    // Si hay otro error, mostrarlo normalmente, pero ignora los irrelevantes y el de clave duplicada
    if (result?.error && !(
      result?.error?.message && (
        result?.error?.message.includes('row-level security policy') ||
        result?.error?.message.includes('security purposes') ||
        result?.error?.message.includes('duplicate key value')
      )
    )) {
      toast({
        title: 'Error',
        description: result.error.message,
        variant: 'destructive',
      });
    }
    if (!result?.error) {
      navigate('/minutas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-wine-DEFAULT rounded-xl overflow-hidden">
          <CardHeader className="bg-wine-DEFAULT py-2 p-3">
            <CardTitle className="text-3xl font-extrabold text-[#BF9B69] text-center">
              {isLogin ? 'Bienvenido' : 'Crea tu Cuenta'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {registerSuccess && (
              <div className="flex flex-col items-center justify-center mb-6">
                <CheckCircle className="text-green-600 w-12 h-12 mb-2" />
                <span className="text-green-700 font-bold text-lg text-center">¡Registro exitoso!<br />Verifica tu correo electrónico para continuar.</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2 block">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                  disabled={registerLoading || registerSuccess}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2 block">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                  disabled={registerLoading || registerSuccess}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || registerLoading || registerSuccess} 
                className={`w-full h-12 text-xl bg-[#A7374F] hover:bg-[#D16272] text-white font-bold shadow-lg rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${registerLoading || registerSuccess ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {(loading || registerLoading)
                  ? <span className="flex items-center justify-center w-full"><Loader2 className="h-6 w-6 animate-spin" /></span>
                  : (isLogin ? 'Entrar' : 'Registrarse')}
              </button>
            </form>
            <motion.button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="w-full h-12 pt-2 text-xl font-bold  transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={registerLoading || (registerSuccess && !isLogin)}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


// Componente de formulario de autenticación con redirección tras login
const AuthFormWithRedirect = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }
    if (!result?.error) {
      navigate('/minutas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-wine-DEFAULT rounded-xl overflow-hidden">
          <CardHeader className="bg-wine-DEFAULT py-6">
            <CardTitle className="text-3xl font-extrabold text-white text-center">
              {isLogin ? 'Bienvenido de Nuevo' : 'Crea tu Cuenta'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2 block">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2 block">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 text-xl bg-[#BF9B69]hover:bg-[#D16272] text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : (isLogin ? 'Entrar' : 'Registrarse')}
              </button>
            </form>
            <motion.button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="w-full h-12 text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // Guardar minuta en Supabase
  async function saveMinuta() {
    try {
      toast({
        title: "Guardando minuta...",
        description: "Por favor espere, estamos guardando la información.",
      });
      let folio = meetingData.folio;
      // Solo generar folio si es nueva minuta
      if (!id) {
        // Usar área normativa si existe, si no la administrativa
        const area = meetingData.selected_normativa?.[0] || meetingData.selected_administrativa?.[0] || '';
        folio = await generarFolio(supabase, meetingData.fecha, area);
      }
      const minutaData = {
        ...meetingData,
        folio,
        usuario_id: session?.user?.id,
        fecha: meetingData.fecha === '' ? null : meetingData.fecha
      };
      let error;
      if (id) {
        // Actualizar minuta existente
        const res = await supabase
          .from('minutas')
          .update(minutaData)
          .eq('id', id);
        error = res.error;
      } else {
        // Crear nueva minuta
        const res = await supabase
          .from('minutas')
          .insert([minutaData]);
        error = res.error;
        // Actualizar meetingData local para mostrar el folio
        setMeetingData(prev => ({ ...prev, folio }));
      }
      if (error) {
        toast({
          title: "Error al guardar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Minuta guardada!",
          description: "La información se guardó correctamente.",
        });
      }
    } catch (err) {
      toast({
        title: "Error inesperado",
        description: err && err.message ? err.message : String(err),
        variant: "destructive",
      });
    }
  }
  const { toast } = useToast();
  const { session, signOut, loading: authLoading } = useAuth();
  const {
    meetingData,
    setMeetingData,
    loading: dataLoading,
    updateField,
    updateSelectedAreas,
    updateTitular,
    addAcuerdo,
    removeAcuerdo,
    updateAcuerdo,
    addAsistente,
    removeAsistente,
    updateAsistente,
    updateSignerField,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
  } = useMeetingData();

  useEffect(() => {
    const fetchMinuta = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('minutas')
          .select('*')
          .eq('id', id)
          .single();
        if (data && !error) {
          setMeetingData(data);
        }
      }
    };
    fetchMinuta();
  }, [id, setMeetingData]);

  const addSigner = () => addTeamMember('signers');
  const removeSigner = (index) => removeTeamMember('signers', index);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-16 w-16 text-wine-DEFAULT animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AuthForm navigate={navigate} />;
  }
// Componente de formulario de autenticación con redirección tras login
const AuthFormWithRedirect = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }
    if (!result?.error) {
      navigate('/minutas');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-wine-DEFAULT rounded-xl overflow-hidden">
          <CardHeader className="bg-wine-DEFAULT py-6">
            <CardTitle className="text-3xl font-extrabold text-black text-center">
              {isLogin ? 'Bienvenido de Nuevo' : 'Crea tu Cuenta'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-2 block">Correo Electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@correo.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-lg font-semibold text-gray-700 mb-2 block">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="h-12 text-base border-gray-300 focus:border-wine-DEFAULT focus:ring-wine-DEFAULT transition-all duration-300"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 text-xl bg-yellow-500 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : (isLogin ? 'Entrar' : 'Registrarse')}
              </button>
            </form>
            <motion.button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="w-full h-12 text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </motion.button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
  
  // No longer needed: const allSignaturesCollected = meetingData.signers?.every(s => s.signature);
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logo', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Archivo no válido",
        description: "Por favor, sube un archivo PNG o JPG.",
        variant: "destructive",
      });
    }
  };
  
  const generatePdf = async () => {
    toast({
      title: "Generando PDF...",
      description: "Por favor espere, esto puede tardar un momento.",
    });

    const printContainer = document.createElement('div');
    printContainer.innerHTML = generatePrintHTML(meetingData);
    printContainer.style.position = 'absolute';
    printContainer.style.left = '-9999px';
    printContainer.style.width = '210mm'; 
    document.body.appendChild(printContainer);

    try {
      const canvas = await html2canvas(printContainer, {
        scale: 2,
        useCORS: true, 
        allowTaint: true
      });

      document.body.removeChild(printContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const widthInPdf = pdfWidth - 20; 
      const heightInPdf = widthInPdf / ratio;
      
      let heightLeft = heightInPdf;
      let position = 10; 

      pdf.addImage(imgData, 'PNG', 10, position, widthInPdf, heightInPdf);
      heightLeft -= (pdfHeight - 20);

      while (heightLeft > 0) {
        position = heightLeft - heightInPdf + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, widthInPdf, heightInPdf);
        heightLeft -= (pdfHeight - 20);
      }
      
      pdf.save('minuta-reunion.pdf');

      toast({
        title: "¡Minuta descargada!",
        description: "El PDF de la minuta ha sido generado exitosamente.",
      });

    } catch (error) {
      console.error("Error generating PDF: ", error);
      toast({
        title: "¡Error al generar PDF!",
        description: "Ocurrió un problema al crear el documento.",
        variant: "destructive",
      });
      if (document.body.contains(printContainer)) {
        document.body.removeChild(printContainer);
      }
    }
  }

  // The handleProcessAction function is no longer needed if the button is removed
  // const handleProcessAction = async () => {
  //   const emails = meetingData.signers?.map(s => s.email).filter(e => e);
  //   if (emails.length < meetingData.signers.length) {
  //     toast({
  //       title: "Faltan correos electrónicos",
  //       description: "Por favor, ingrese los correos de todos los firmantes.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }
    
  //   toast({
  //     title: "¡Proceso de firma iniciado!",
  //     description: `Se ha enviado una solicitud de firma a: ${emails.join(', ')}. (Simulación)`,
  //   });
  // };
  
  return (
    <>
      <Helmet>
        <title>Generador de Minutas de Reunión</title>
        <meta name="description" content="Sistema profesional para generar minutas de reunión con formato estructurado y completo" />
      </Helmet>

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4"
          >
            <div className="flex items-center gap-4">
              {meetingData.logo && <img src={meetingData.logo} alt="Logotipo" className="h-16 w-auto object-contain" />}
              <div>
                <h1 className="text-4xl font-bold text-wine-DEFAULT">M I N U T A - EI</h1>
                <p className="text-gray-600 text-lg">Eficiencia Institucional 2025 - 2030</p>
                {meetingData.folio && (
                  <span className="text-black-700 text-xl font-bold block mt-2">Folio: {meetingData.folio}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-64">
                <Label htmlFor="logo-upload" className="text-sm font-medium text-gray-700">Cargar Logotipo</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input id="logo-upload" type="file" accept="image/png, image/jpeg" onChange={handleLogoChange} className="w-full" />
                </div>
              </div>
              <button onClick={() => navigate('/minutas')} variant="outline" className="self-end border-wine-DEFAULT text-wine-DEFAULT hover:bg-wine-DEFAULT hover:text-white">
                <LogOut className="h-4 w-4 mr-2" />
                Regresar
              </button>
            </div>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {dataLoading ? (
               <div className="flex justify-center items-center h-96">
                <Loader2 className="h-12 w-12 text-wine-DEFAULT animate-spin" />
              </div>
            ) : (
              <Card className="shadow-xl border-0 bg-white">
                <CardHeader className="bg-wine-DEFAULT text-black rounded-t-lg">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Formulario de Minuta de Reunión
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-8 space-y-8">
                  <BasicInfoSection meetingData={meetingData} updateField={updateField} />
                  <AreaSelectionSection meetingData={meetingData} updateSelectedAreas={updateSelectedAreas} />
                  <TitularesSection meetingData={meetingData} updateTitular={updateTitular} />
                  <ExpositionSection meetingData={meetingData} updateField={updateField} />
                  <AgreementsSection acuerdos={meetingData.acuerdos} addAcuerdo={addAcuerdo} removeAcuerdo={removeAcuerdo} updateAcuerdo={updateAcuerdo} />
                  <AttendeesSection asistentes={meetingData.asistentes} addAsistente={addAsistente} removeAsistente={removeAsistente} updateAsistente={updateAsistente} />
                  <SignatureSection 
                    signers={meetingData.signers} 
                    updateSignerField={updateSignerField} 
                    removeSigner={removeSigner} 
                    addSigner={addSigner} 
                  />
                  <TechTeamSection 
                    responsables={meetingData.responsables_programa}
                    apoyo={meetingData.personal_apoyo}
                    addTeamMember={addTeamMember} 
                    removeTeamMember={removeTeamMember}
                    updateTeamMember={updateTeamMember}
                  />
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center pt-6 gap-4 w-full">
                    <Button
                      onClick={saveMinuta}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 text-white w-full sm:w-auto"
                      size="lg"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="block text-center">Guardar<br className="sm:hidden" /> Minuta</span>
                    </Button>

                    <Button
                      onClick={generatePdf}
                      className={`bg-green-600 hover:bg-green-700 px-6 py-3 text-base sm:text-lg font-semibold shadow-lg transition-all duration-300 text-white w-full sm:w-auto${!meetingData.folio ? ' opacity-60 cursor-not-allowed' : ''}`}
                      size="lg"
                      disabled={!meetingData.folio}
                      title={!meetingData.folio ? 'Guarda la minuta antes de descargar el PDF' : ''}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      <span className="block text-center">Descargar<br className="sm:hidden" /> Minuta (PDF)</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;
