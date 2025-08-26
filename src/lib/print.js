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
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            
            * {
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Roboto', Arial, sans-serif;
              margin: 40px;
              line-height: 1.4;
              color: #1a1a1a;
              font-size: 12px;
            }
            
            /* Controles de salto de página */
            .page-break-before {
              page-break-before: always;
              break-before: always;
            }
            
            .page-break-after {
              page-break-after: always;
              break-after: always;
            }
            
            .avoid-break {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .keep-together {
              page-break-inside: avoid;
              break-inside: avoid;
              overflow: visible;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 25px;
              border-bottom: 3px solid #852a41;
              padding-bottom: 12px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .header-title {
                flex-grow: 1;
                text-align: center;
                color: #852a41;
            }
            
            .logo {
                max-width: 120px;
                max-height: 60px;
                object-fit: contain;
            }
            
            .section {
              margin-bottom: 20px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .section.allow-break {
              page-break-inside: auto;
              break-inside: auto;
            }
            
            .section-title {
              font-weight: 700;
              font-size: 14px;
              margin-bottom: 12px;
              border-bottom: 2px solid #baa579;
              padding-bottom: 4px;
              color: #852a41;
              page-break-after: avoid;
              break-after: avoid;
            }
            
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .info-item {
              padding-bottom: 4px;
            }
            
            .info-label {
              font-weight: 700;
              font-size: 11px;
              color: #852a41;
            }
            
            .info-value {
              margin-top: 4px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 2px;
              min-height: 1em;
            }
            
            .content-box {
              border: 1px solid #e0e0e0;
              padding: 10px;
              min-height: 60px;
              margin-bottom: 12px;
              white-space: pre-wrap;
              background-color: #fcfcfc;
              border-radius: 3px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .content-box.large-content {
              page-break-inside: auto;
              break-inside: auto;
            }
            
            /* Tablas optimizadas para PDF */
            .agreements-table, .attendees-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
              font-size: 11px;
            }
            
            .agreements-table th, .agreements-table td, 
            .attendees-table th, .attendees-table td {
              border: 1px solid #ccc;
              padding: 6px 8px;
              text-align: left;
              vertical-align: top;
            }
            
            .agreements-table th, .attendees-table th {
              background-color: #f2f2f2;
              font-weight: 700;
              color: #333;
              page-break-after: avoid;
              break-after: avoid;
            }
            
            .agreements-table tr, .attendees-table tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .table-container {
              page-break-inside: avoid;
              break-inside: avoid;
              margin-bottom: 20px;
            }
            
            .table-container.large-table {
              page-break-inside: auto;
              break-inside: auto;
            }
            
            /* Sección de firmas optimizada para evitar duplicación */
            .signatures-section {
              margin-top: 30px;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              overflow: hidden;
            }
            
            .signatures-container {
              display: flex;
              flex-wrap: wrap;
              gap: 15px;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            .signature-item {
              flex: 1 1 45%;
              min-width: 280px;
              border: 1px solid #ddd;
              border-radius: 6px;
              padding: 12px;
              margin-bottom: 10px;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              font-size: 11px;
              box-sizing: border-box;
            }
            
            .signature-content {
              width: 100%;
              overflow: hidden;
            }
            
            .signature-area {
              margin-top: 8px;
              min-height: 80px;
            }
            
            .signature-image {
              max-width: 100%;
              max-height: 70px;
              object-fit: contain;
              margin: 5px 0;
              display: block;
            }
            
            .signature-placeholder {
              font-style: italic;
              color: #666;
              padding: 20px 0;
              text-align: center;
              border: 1px dashed #ccc;
              margin-top: 5px;
            }
            
            .signature-row-start {
              page-break-before: avoid !important;
              break-before: avoid !important;
            }
            
            /* Sección final */
            .final-section {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 3px solid #852a41;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .quote-text {
              font-size: 14px;
              font-style: italic;
              margin-bottom: 20px;
              color: #333;
            }
            
            .responsible-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 25px;
              margin-top: 15px;
              text-align: left;
            }
            
            .responsible-group {
              background-color: #f9f9f9;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 3px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            
            .responsible-title {
              font-weight: 700;
              margin-bottom: 8px;
              color: #852a41;
              font-size: 12px;
            }
            
            .responsible-list {
              list-style-type: decimal;
              padding-left: 18px;
              margin: 0;
              font-size: 11px;
            }
            
            .responsible-list li {
              margin-bottom: 3px;
            }
            
            /* Media queries para impresión */
            @media print {
              body { 
                margin: 15px;
                font-size: 11px;
              }
              
              .header {
                font-size: 14px;
                margin-bottom: 20px;
              }
              
              .section-title {
                font-size: 13px;
              }
              
              /* Asegurar que las tablas no se rompan mal */
              .agreements-table, .attendees-table {
                font-size: 10px;
              }
              
              .agreements-table th, .agreements-table td,
              .attendees-table th, .attendees-table td {
                padding: 4px 6px;
              }
              
              /* Controles específicos para firmas en impresión */
              .signatures-section {
                page-break-inside: avoid !important;
                overflow: visible;
              }
              
              .signatures-container {
                page-break-inside: avoid !important;
              }
              
              .signature-item {
                page-break-inside: avoid !important;
                margin-bottom: 8px;
              }
            }
            
            @page {
              margin: 1.5cm;
              size: A4;
            }
          </style>
        </head>
        <body>
          <header class="header avoid-break">
            ${logo ? `<img src="${logo}" alt="Logotipo" class="logo" />` : '<div></div>'}
            <div class="header-title">M I N U T A &nbsp; D E &nbsp; R E U N I Ó N</div>
            <div></div>
          </header>

          <main>
            <section class="section avoid-break">
              <div class="section-title">1. LUGAR, FECHA Y HORA</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">LUGAR:</div>
                  <div class="info-value">${lugar || ''}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">FECHA:</div>
                  <div class="info-value">${fecha || ''}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">HORA:</div>
                  <div class="info-value">${hora || ''}</div>
                </div>
              </div>
            </section>
            
            <section class="section avoid-break">
                <div class="section-title">2. ÁREAS DE TRABAJO SELECCIONADAS</div>
                <p><strong>Área Normativa:</strong> ${(selected_normativa || []).join(', ') || 'N/A'}</p>
                <p><strong>Área Administrativa:</strong> ${(selected_administrativa || []).join(', ') || 'N/A'}</p>
            </section>

            <section class="section avoid-break">
                <div class="section-title">3. TITULARES DE ÁREA</div>
                <div class="content-box">
                    ${(titulares && Object.keys(titulares).length > 0) ? Object.entries(titulares).map(([area, titular]) => 
                      `<div>
                      <strong>${area}:</strong> ${titular}
                      </div>`).join('') : 'No se especificaron titulares.'}
                </div>
            </section>

            <section class="section ${(exposicion_areas && exposicion_areas.length > 200) ? 'allow-break' : 'avoid-break'}">
                <div class="section-title">4. EXPOSICIÓN DE LAS ÁREAS</div>
                <div class="content-box ${(exposicion_areas && exposicion_areas.length > 200) ? 'large-content' : ''}">${exposicion_areas || ''}</div>
            </section>
            
            <section class="section ${(exposicion_ct && exposicion_ct.length > 200) ? 'allow-break' : 'avoid-break'}">
                <div class="section-title">5. EXPOSICIÓN DE LA CT</div>
                <div class="content-box ${(exposicion_ct && exposicion_ct.length > 200) ? 'large-content' : ''}">${exposicion_ct || ''}</div>
            </section>

            <section class="section allow-break">
              <div class="section-title avoid-break">6. ACUERDOS</div>

              ${(acuerdos || []).map(acuerdo => `
                <div class="table-container" style="margin-bottom:20px;">
                  <table class="agreements-table">
                    <thead>
                      <tr>
                        <th>DESCRIPCIÓN</th>
                        <th>RESPONSABLE</th>
                        <th>FECHA ENTREGA</th>
                        <th>REQUERIMIENTOS</th>
                      </tr>
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

                  ${(acuerdo.actividades && acuerdo.actividades.length > 0) ? `
                    <table class="agreements-table" style="margin-top:8px;">
                      <thead>
                        <tr>
                          <th>Actividad</th>
                          <th>Responsables</th>
                          <th>Entregable</th>
                          <th>Fecha Inicio</th>
                          <th>Fecha Fin</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${acuerdo.actividades.map(act => `
                          <tr>
                            <td>${act.actividad || ''}</td>
                            <td>${(act.responsables || []).filter(r => r.trim()).join(', ')}</td>
                            <td>${act.entregable || ''}</td>
                            <td>${act.fechaInicio || ''}</td>
                            <td>${act.fechaFin || ''}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  ` : ''}
                </div>
              `).join('')}
            </section>

            <section class="section allow-break">
              <div class="section-title avoid-break">7. ASISTENTES</div>
              <div class="table-container ${(asistentes && asistentes.length > 10) ? 'large-table' : ''}">
                <table class="attendees-table">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>PUESTO</th>
                            <th>ÁREA</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${(asistentes || []).filter(a => a.nombre && a.nombre.trim()).map(asistente => `
                      <tr>
                        <td>${asistente.nombre || ''}</td>
                        <td>${asistente.puesto || ''}</td>
                        <td>${asistente.area || ''}</td>
                      </tr>
                    `).join('')}
                    </tbody>
                </table>
              </div>
            </section>

            ${(signers && signers.length > 0) ? `
            <section class="section signatures-section page-break-before">
              <div class="section-title">8. FIRMAS DIGITALES DE REPRESENTANTES</div>
              <div class="signatures-container">
                ${(signers || []).map((signer, index) => `
                  <div class="signature-item ${index % 2 === 0 && index > 0 ? 'signature-row-start' : ''}">
                    <div class="signature-content">
                      <div><strong>Nombre:</strong> ${signer.text || ''}</div>
                      <div><strong>Correo:</strong> ${signer.email || ''}</div>
                      <div class="signature-area">
                        <strong>Firma:</strong><br/>
                        ${signer.signature ? `<img src="${signer.signature}" alt="Firma" class="signature-image"/>` : '<div class="signature-placeholder">Sin firma</div>'}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>` : ''}
            

            <footer class="final-section avoid-break">
                <div class="quote-text">"Un dedo no puede aplaudir, pero todos juntos sí."</div>
                <div class="responsible-section">
                  <div class="responsible-group">
                    <div class="responsible-title">Responsables del Programa:</div>
                    <ol class="responsible-list">
                      ${(responsables_programa || []).filter(r => r && r.trim()).map(responsable => `<li>${responsable}</li>`).join('')}
                    </ol>
                  </div>
                  <div class="responsible-group">
                    <div class="responsible-title">Personal de Apoyo:</div>
                    <ol class="responsible-list">
                      ${(personal_apoyo || []).filter(p => p && p.trim()).map(apoyo => `<li>${apoyo}</li>`).join('')}
                    </ol>
                  </div>
                </div>
            </footer>
          </main>
        </body>
      </html>
    `;
};