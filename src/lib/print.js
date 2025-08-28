export const generatePrintHTML = (meetingData) => {
    const {
        logo,
        lugar,
        fecha,
        hora,
        selected_normativa,
        selected_administrativa,
        titulares,
        exposicion_areas,
        exposicion_ct,
        acuerdos,
        asistentes,
        signers,
        responsables_programa,
        personal_apoyo
    } = meetingData;

    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Minuta de Reunión Digital</title>
          <style>
            @page {
              margin: 3cm 2.5cm 3cm 2.5cm;
              size: A4;
            }
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 2rem;
              line-height: 1.6;
              color: #2c3e50;
              font-size: 12px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              min-height: 100vh;
            }
            
            .page-break-before {
              page-break-before: always;
              break-before: always;
              padding-top: 2rem;
            }
            
            .page-break-after {
              page-break-after: always;
              break-after: always;
              padding-bottom: 2rem;
            }
            
            .avoid-break {
              page-break-inside: avoid;
              break-inside: avoid;
              margin-bottom: 1.5rem;
            }
            
            .section-container {
              margin-bottom: 2rem;
              min-height: 4rem;
            }
            
            /* Header rediseñado */
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              font-weight: 600;
              font-size: 18px;
              margin-bottom: 3rem;
              padding: 1.5rem 2rem;
              background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%);
              color: white;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(30, 58, 138, 0.3);
              position: relative;
              overflow: hidden;
            }
            
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%);
              background-size: 20px 20px;
              animation: shine 20s linear infinite;
            }
            
            @keyframes shine {
              0% { background-position: 0 0; }
              100% { background-position: 40px 40px; }
            }
            
            .header-title {
                flex-grow: 1;
                text-align: center;
                letter-spacing: 3px;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                z-index: 1;
                position: relative;
            }
            
            .logo {
                max-width: 140px;
                max-height: 70px;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1;
                position: relative;
            }
            
            /* Secciones */
            .section {
              margin-bottom: 2.5rem;
              background: white;
              border-radius: 12px;
              padding: 1.5rem 2rem;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08);
              border: 1px solid rgba(226, 232, 240, 0.8);
              position: relative;
              overflow: hidden;
            }
            
            .section::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
            }
            
            .section-title {
              font-weight: 700;
              font-size: 16px;
              margin-bottom: 1.5rem;
              color: #1e293b;
              padding-left: 1rem;
              position: relative;
              display: flex;
              align-items: center;
            }
            
            .section-title::before {
              content: '';
              position: absolute;
              left: -1rem;
              width: 6px;
              height: 6px;
              background: #3b82f6;
              border-radius: 50%;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            }
            
            /* Tablas */
            .table-wrapper {
              width: 100%;
              overflow: hidden;
              margin-bottom: 2rem;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.08);
              border: 1px solid #e2e8f0;
            }
            
            .agreements-table, .attendees-table, .activities-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              font-size: 12px;
              table-layout: fixed;
              background: white;
            }
            
            .agreements-table th, .agreements-table td, 
            .attendees-table th, .attendees-table td,
            .activities-table th, .activities-table td {
              padding: 1rem;
              text-align: left;
              vertical-align: top;
              word-wrap: break-word;
              overflow-wrap: break-word;
              border-bottom: 1px solid #f1f5f9;
            }
            
            .agreements-table th, .attendees-table th, .activities-table th {
              background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
              color: white;
              font-weight: 600;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              position: relative;
            }
            
            /* Firmas */
            .signatures-section {
              margin-top: 3rem;
              background: white;
              border-radius: 12px;
              padding: 2rem;
              box-shadow: 0 8px 32px rgba(0,0,0,0.1);
              border: 1px solid #e2e8f0;
              position: relative;
              overflow: hidden;
            }

            /* Sección final */
            .final-section {
              text-align: center;
              margin-top: 4rem;
              padding: 2.5rem 2rem;
              background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
              color: white;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(30, 41, 59, 0.3);
              position: relative;
              overflow: hidden;
            }

            /* 🔹 Reglas impresión */
            @media print {
              body { 
                margin: 0 !important;
                padding: 1.5rem !important;
                font-size: 11px;
                background: white !important;
              }

              /* Solo evitar cortes en headers/títulos/firmas */
              .header,
              .section-title,
              .signatures-section,
              .signature-item {
                page-break-inside: avoid;
                break-inside: avoid;
              }

              /* Secciones grandes pueden dividirse */
              .section,
              .table-wrapper,
              .agreements-table,
              .attendees-table,
              .activities-table,
              .content-box {
                page-break-inside: auto;
                break-inside: auto;
              }

              .page-break-before {
                page-break-before: always;
                break-before: always;
              }

              * {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
            }

            @page {
              margin: 2.5cm;
              size: A4;
            }
          </style>
        </head>
        <body>
          <header class="header">
            ${logo ? `<img src="${logo}" alt="Logotipo" class="logo" />` : '<div></div>'}
            <div class="header-title">M I N U T A &nbsp; D E &nbsp; R E U N I Ó N</div>
            <div></div>
          </header>

          <main>
            <section class="section">
              <div class="section-title">1. LUGAR, FECHA Y HORA</div>
              <div class="info-grid">
                <div class="info-item"><div class="info-label">LUGAR:</div><div class="info-value">${lugar || ''}</div></div>
                <div class="info-item"><div class="info-label">FECHA:</div><div class="info-value">${fecha || ''}</div></div>
                <div class="info-item"><div class="info-label">HORA:</div><div class="info-value">${hora || ''}</div></div>
              </div>
            </section>
            
            <section class="section">
              <div class="section-title">2. ÁREAS DE TRABAJO SELECCIONADAS</div>
              <p><strong>Área Normativa:</strong> ${(selected_normativa || []).join(', ') || 'N/A'}</p>
              <p><strong>Área Administrativa:</strong> ${(selected_administrativa || []).join(', ') || 'N/A'}</p>
            </section>

            <section class="section">
              <div class="section-title">3. TITULARES DE ÁREA</div>
              <div class="content-box">
                ${(titulares && Object.keys(titulares).length > 0) 
                  ? Object.entries(titulares).map(([area, titular]) => `<div><strong>${area}:</strong> ${titular}</div>`).join('') 
                  : 'No se especificaron titulares.'}
              </div>
            </section>

            <section class="section section-container">
              <div class="section-title">4. EXPOSICIÓN DE LAS ÁREAS</div>
              <div class="content-box">${exposicion_areas || ''}</div>
            </section>
            
            <section class="section section-container">
              <div class="section-title">5. EXPOSICIÓN DE LA CT</div>
              <div class="content-box">${exposicion_ct || ''}</div>
            </section>

            <section class="section">
              <div class="section-title">6. ACUERDOS</div>
              ${(acuerdos || []).map((acuerdo, index) => `
                <div style="margin-bottom: 2rem;">
                  <h4 class="agreement-title">Acuerdo ${index + 1}</h4>
                  <div class="table-wrapper">
                    <table class="agreements-table">
                      <thead>
                        <tr><th>DESCRIPCIÓN</th><th>RESPONSABLE</th><th>FECHA ENTREGA</th><th>REQUERIMIENTOS</th></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${acuerdo.descripcion || ''}</td>
                          <td>${acuerdo.responsable || ''}</td>
                          <td>${acuerdo.fecha || ''}</td>
                          <td>${acuerdo.requerimientos || ''}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>`).join('')}
            </section>

            <section class="section">
              <div class="section-title">7. ASISTENTES</div>
              <div class="table-wrapper">
                <table class="attendees-table">
                  <thead><tr><th>NOMBRE</th><th>PUESTO</th><th>ÁREA</th></tr></thead>
                  <tbody>
                    ${(asistentes || []).filter(a => a.nombre && a.nombre.trim()).map(asistente => `
                      <tr><td>${asistente.nombre}</td><td>${asistente.puesto}</td><td>${asistente.area}</td></tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </section>

            ${(signers && signers.length > 0) ? `
            <section class="signatures-section">
              <div class="section-title" style="color: #1e293b;">8. FIRMAS</div>
              <div class="signatures-container">
                ${signers.map(signer => `
                  <div class="signature-item">
                    <div class="signature-content">
                      <div><strong>Nombre:</strong> ${signer.text || ''}</div>
                      <div><strong>Correo:</strong> ${signer.email || ''}</div>
                      <div class="signature-area">
                        <strong>Firma:</strong><br/>
                        ${signer.signature ? `<img src="${signer.signature}" class="signature-image"/>` : '<div>Sin firma</div>'}
                      </div>
                    </div>
                  </div>`).join('')}
              </div>
            </section>` : ''}

            <footer class="final-section page-break-before">
              <div class="quote-text">"Un dedo no puede aplaudir, pero todos juntos sí."</div>
              <div class="responsible-section">
                <div class="responsible-group">
                  <div class="responsible-title">Responsables del Programa:</div>
                  <ul class="responsible-list">${(responsables_programa || []).map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
                <div class="responsible-group">
                  <div class="responsible-title">Personal de Apoyo:</div>
                  <ul class="responsible-list">${(personal_apoyo || []).map(p => `<li>${p}</li>`).join('')}</ul>
                </div>
              </div>
            </footer>
          </main>
        </body>
      </html>
    `;
};
