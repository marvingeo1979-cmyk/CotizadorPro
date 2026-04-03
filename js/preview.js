/**
 * Proceso: Vista Previa
 * Descripción: Generación del documento final de cotización con formato de impresión, logo y términos legales.
 */
window.Views = window.Views || {};

window.Views.preview = (q) => `
    <div class="no-print mb-4" style="display:flex; gap:1rem;">
        <button class="btn btn-secondary" onclick="window.app.render(window.app.lastMainView || 'dashboard')">Volver</button> 
        <button class="btn btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Imprimir</button>
    </div>
    <div class="print-area card glass p-5" style="max-width: 900px; margin: auto; background: white !important; color: black !important; font-family: 'Poppins', sans-serif; min-height: 1120px; position: relative;">
        
        <div style="display:flex; align-items:center; gap: 2rem; margin-bottom: 2rem;">
            <img src="Logo.png" style="width: 150px; height: auto;" alt="Logo Chips" onerror="this.src='https://placehold.co/150x60?text=Chips+S.A.'">
            <div style="line-height: 1.4;">
                <h2 style="margin:0; font-weight: 700;">Chips, S.A.</h2>
                <p style="margin:0; font-size: 0.85rem; color: #444;">Col. El Prado, 10 Ave, 17 Calle, Circunvalacion Casa No. 55</p>
                <p style="margin:0; font-size: 0.85rem; color: #444;">Sur Oeste, San Pedro Sula Cortes Honduras</p>
                <p style="margin:0; font-size: 0.85rem; color: #444; font-weight: 600;">RTN: 05019999176400</p>
            </div>
        </div>

        <h1 style="color: #22c55e; font-size: 2.2rem; margin-bottom: 1rem; border-bottom: 3px solid #22c55e; padding-bottom: 0.5rem; letter-spacing: -1px;">Número de cotización ${q.number}</h1>

        <div style="text-align: right; margin-bottom: 2.5rem; line-height: 1.6;">
            <p style="margin:0; font-size: 1.2rem; font-weight: 700; color: #1e293b;">${q.customerName}</p>
            <p style="margin:0; font-size: 0.95rem; color: #334155;">${q.address || ''}</p>
            <p style="margin:0; font-size: 0.95rem; color: #334155;">RTN: ${q.rtn || 'N/A'}</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 2rem; font-size: 0.9rem; background: #f8fafc; padding: 1.2rem; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div><strong style="color:#64748b; font-size:0.7rem; text-transform:uppercase; display:block;">Fecha de cotización:</strong><span>${window.app.formatDisplayDate(q.date)}</span></div>
            <div><strong style="color:#64748b; font-size:0.7rem; text-transform:uppercase; display:block;">Vencimiento:</strong><span>${window.app.formatDisplayDate(q.dueDate)}</span></div>
            <div><strong style="color:#64748b; font-size:0.7rem; text-transform:uppercase; display:block;">Vendedor:</strong><span>${q.seller || ''}</span></div>
        </div>

        <table style="width:100%; border-collapse: collapse; margin-bottom: 3rem; font-size: 0.95rem;">
            <thead>
                <tr style="border-bottom: 2px solid #1e293b; color: #1e293b;">
                    <th style="padding: 12px 10px; text-align:left; width: 15%;">Código</th>
                    <th style="padding: 12px 10px; text-align:left;">Descripción</th>
                    <th style="padding: 12px 10px; text-align:right;">Cantidad</th>
                    <th style="padding: 12px 10px; text-align:right;">Precio</th>
                    <th style="padding: 12px 10px; text-align:right;">Importe</th>
                </tr>
            </thead>
            <tbody>
                ${(q.items || []).map(i => {
                    const qty = Number(i.qty || 0);
                    const price = Number(i.price || 0);
                    const rowTotal = Number(i.total || (qty * price));
                    return `
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 15px 10px; font-weight: 500;">${i.code || ''}</td>
                        <td style="padding: 15px 10px;">${i.description || 'Sin descripción'}</td>
                        <td style="padding: 15px 10px; text-align:right;">${qty.toFixed(2)} Unid.</td>
                        <td style="padding: 15px 10px; text-align:right;">L. ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td style="padding: 15px 10px; text-align:right; font-weight: 700; white-space: nowrap;">L. ${rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>

        <div style="display:flex; justify-content:flex-end; margin-top: 2rem;">
            <div style="width: 350px; font-size: 1rem;">
                <div style="display:flex; justify-content:space-between; padding: 8px 0; color: #475569;">
                    <strong>Subtotal</strong>
                    <span>L. ${(Number(q.total || 0) / 1.15).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding: 8px 0; color: #475569;">
                    <strong>IVA 15%</strong>
                    <span>L. ${(Number(q.total || 0) - (Number(q.total || 0) / 1.15)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div style="display:flex; justify-content:space-between; padding: 15px 0; border-top: 3px solid #1e293b; margin-top: 10px; font-size: 1.3rem;">
                    <strong>Total</strong>
                    <strong style="color: #1e293b;">L. ${Number(q.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
            </div>
        </div>

        ${q.notes ? `
        <div style="margin-top: 2rem; padding: 1.2rem; background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px;">
            <strong style="color:#92400e; font-size: 0.8rem; text-transform:uppercase; display:block; margin-bottom: 0.5rem;">Observaciones:</strong>
            <p style="margin:0; font-size: 0.9rem; color: #78350f; line-height: 1.5; white-space: pre-wrap;">${q.notes}</p>
        </div>
        ` : ''}

        <!-- Footer Final -->
        <div style="margin-top: auto; padding-top: 4rem;">
            <p style="margin-bottom: 2rem; font-size: 0.9rem; color: #1e293b;"><strong>Términos de pago:</strong> 30 días</p>
            
            <div style="border-top: 1px solid #1e293b; border-bottom: 1px solid #1e293b; padding: 10px 0; margin-top: 2rem;">
                <div style="display:flex; justify-content:center; gap: 40px; font-size: 0.8rem; color: #1e293b; font-weight: 500;">
                    <span>(504) 2556-9781 / (504) 2556-9782 / (504) 2556-9797</span>
                    <span>https://www.chipssa.net</span>
                </div>
            </div>
            <div style="text-align: center; margin-top: 10px; font-size: 0.75rem; color: #64748b;">
                Página: 1 de 1
            </div>
        </div>
    </div>
`;
