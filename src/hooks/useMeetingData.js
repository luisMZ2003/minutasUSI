import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { toast } from '@/components/ui/use-toast';

const initialMeetingData = {
  logo: '',
  lugar: '',
  fecha: '',
  hora: '',
  selected_normativa: [],
  selected_administrativa: [],
  titulares: {},
  exposicion_ct: '',
  acuerdos: [{ descripcion: '', responsable: '', fecha: '', requerimientos: '' }],
  asistentes: [{ nombre: '', puesto: '', area: '' }],
  signers: [{ text: '', email: '', signature: '' }],
  responsables_programa: [], // Initialize as empty
  personal_apoyo: [],       // Initialize as empty
  exposicion_areas: ''
};

export const useMeetingData = () => {
  const { session } = useAuth();
  const [meetingData, setMeetingData] = useState(initialMeetingData);
  const [loading, setLoading] = useState(false);

  // This effect will run once on component mount to ensure initial data is clean
  useEffect(() => {
    setMeetingData(initialMeetingData);
  }, []);

  const updateField = useCallback((field, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);

  const updateSelectedAreas = useCallback((type, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  }, []);

  const updateTitular = useCallback((area, name) => {
    setMeetingData((prevData) => ({
      ...prevData,
      titulares: {
        ...prevData.titulares,
        [area]: name,
      },
    }));
  }, []);

  const addAcuerdo = useCallback(() => {
    setMeetingData((prevData) => ({
      ...prevData,
      acuerdos: [...prevData.acuerdos, { descripcion: '', responsable: '', fecha: '', requerimientos: '' }],
    }));
  }, []);

  const removeAcuerdo = useCallback((index) => {
    setMeetingData((prevData) => ({
      ...prevData,
      acuerdos: prevData.acuerdos.filter((_, i) => i !== index),
    }));
  }, []);

  const updateAcuerdo = useCallback((index, field, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      acuerdos: prevData.acuerdos.map((acuerdo, i) =>
        i === index ? { ...acuerdo, [field]: value } : acuerdo
      ),
    }));
  }, []);

  const addAsistente = useCallback(() => {
    setMeetingData((prevData) => ({
      ...prevData,
      asistentes: [...prevData.asistentes, { nombre: '', puesto: '', area: '' }],
    }));
  }, []);

  const removeAsistente = useCallback((index) => {
    setMeetingData((prevData) => ({
      ...prevData,
      asistentes: prevData.asistentes.filter((_, i) => i !== index),
    }));
  }, []);

  const updateAsistente = useCallback((index, field, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      asistentes: prevData.asistentes.map((asistente, i) =>
        i === index ? { ...asistente, [field]: value } : asistente
      ),
    }));
  }, []);

  const updateSignerField = useCallback((index, field, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      signers: prevData.signers.map((signer, i) =>
        i === index ? { ...signer, [field]: value } : signer
      ),
    }));
  }, []);

  const addTeamMember = useCallback((type) => {
    setMeetingData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ''],
    }));
  }, []);

  const removeTeamMember = useCallback((type, index) => {
    setMeetingData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((_, i) => i !== index),
    }));
  }, []);

  const updateTeamMember = useCallback((type, index, value) => {
    setMeetingData((prevData) => ({
      ...prevData,
      [type]: prevData[type].map((member, i) =>
        i === index ? value : member
      ),
    }));
  }, []);

  return {
    meetingData,
    loading,
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
  };
};