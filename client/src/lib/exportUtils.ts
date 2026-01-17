// Utilitários de exportação para Excel e PDF

/**
 * Exporta dados para arquivo CSV (compatível com Excel)
 */
export function exportToCSV(data: Record<string, any>[], filename: string, headers?: Record<string, string>) {
  if (data.length === 0) return;

  const keys = Object.keys(data[0]);
  const headerRow = headers 
    ? keys.map(key => headers[key] || key).join(';')
    : keys.join(';');

  const rows = data.map(item => 
    keys.map(key => {
      let value = item[key];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string' && value.includes(';')) {
        return `"${value}"`;
      }
      return String(value);
    }).join(';')
  );

  const csvContent = [headerRow, ...rows].join('\n');
  const BOM = '\uFEFF'; // UTF-8 BOM para Excel reconhecer acentos
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  downloadBlob(blob, `${filename}.csv`);
}

/**
 * Exporta dados para arquivo Excel (XLSX) usando formato XML
 */
export function exportToExcel(data: Record<string, any>[], filename: string, sheetName: string = 'Dados', headers?: Record<string, string>) {
  if (data.length === 0) return;

  const keys = Object.keys(data[0]);
  const headerLabels = headers ? keys.map(key => headers[key] || key) : keys;

  // Criar XML do Excel
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Styles>
    <Style ss:ID="Header">
      <Font ss:Bold="1" ss:Color="#FFFFFF"/>
      <Interior ss:Color="#F59E0B" ss:Pattern="Solid"/>
      <Alignment ss:Horizontal="Center"/>
    </Style>
    <Style ss:ID="Currency">
      <NumberFormat ss:Format="R$ #,##0.00"/>
    </Style>
    <Style ss:ID="Percent">
      <NumberFormat ss:Format="0.00%"/>
    </Style>
    <Style ss:ID="Date">
      <NumberFormat ss:Format="dd/mm/yyyy"/>
    </Style>
  </Styles>
  <Worksheet ss:Name="${sheetName}">
    <Table>`;

  // Header row
  xml += '<Row>';
  headerLabels.forEach(header => {
    xml += `<Cell ss:StyleID="Header"><Data ss:Type="String">${escapeXml(header)}</Data></Cell>`;
  });
  xml += '</Row>';

  // Data rows
  data.forEach(item => {
    xml += '<Row>';
    keys.forEach(key => {
      const value = item[key];
      const type = typeof value === 'number' ? 'Number' : 'String';
      const displayValue = value === null || value === undefined ? '' : String(value);
      xml += `<Cell><Data ss:Type="${type}">${escapeXml(displayValue)}</Data></Cell>`;
    });
    xml += '</Row>';
  });

  xml += `</Table>
  </Worksheet>
</Workbook>`;

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
  downloadBlob(blob, `${filename}.xls`);
}

/**
 * Gera e exporta relatório em PDF
 */
export function exportToPDF(
  title: string,
  content: PDFContent[],
  filename: string,
  options?: PDFOptions
) {
  const { orientation = 'portrait', pageSize = 'A4' } = options || {};
  
  // Criar HTML para impressão/PDF
  const html = generatePDFHTML(title, content, { orientation, pageSize });
  
  // Abrir em nova janela para impressão
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    
    // Aguardar carregamento e imprimir
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
}

interface PDFContent {
  type: 'title' | 'subtitle' | 'text' | 'table' | 'summary' | 'divider' | 'space';
  data?: any;
  headers?: Record<string, string>;
}

interface PDFOptions {
  orientation?: 'portrait' | 'landscape';
  pageSize?: 'A4' | 'Letter';
}

function generatePDFHTML(title: string, content: PDFContent[], options: PDFOptions): string {
  const isLandscape = options.orientation === 'landscape';
  
  let bodyContent = '';
  
  content.forEach(item => {
    switch (item.type) {
      case 'title':
        bodyContent += `<h1 class="pdf-title">${escapeHtml(item.data)}</h1>`;
        break;
      case 'subtitle':
        bodyContent += `<h2 class="pdf-subtitle">${escapeHtml(item.data)}</h2>`;
        break;
      case 'text':
        bodyContent += `<p class="pdf-text">${escapeHtml(item.data)}</p>`;
        break;
      case 'table':
        bodyContent += generateTableHTML(item.data, item.headers);
        break;
      case 'summary':
        bodyContent += generateSummaryHTML(item.data);
        break;
      case 'divider':
        bodyContent += '<hr class="pdf-divider"/>';
        break;
      case 'space':
        bodyContent += '<div class="pdf-space"></div>';
        break;
    }
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page {
      size: ${options.pageSize} ${options.orientation};
      margin: 15mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #333;
      padding: 20px;
    }
    
    .pdf-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 3px solid #F59E0B;
      margin-bottom: 20px;
    }
    
    .pdf-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .pdf-logo-icon {
      width: 40px;
      height: 40px;
      background: #F59E0B;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    
    .pdf-logo-text {
      font-size: 20px;
      font-weight: bold;
      color: #1a1a1a;
    }
    
    .pdf-date {
      color: #666;
      font-size: 10pt;
    }
    
    .pdf-title {
      font-size: 18pt;
      font-weight: bold;
      color: #1a1a1a;
      margin: 20px 0 10px 0;
    }
    
    .pdf-subtitle {
      font-size: 14pt;
      font-weight: 600;
      color: #333;
      margin: 15px 0 10px 0;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
    }
    
    .pdf-text {
      margin: 10px 0;
      text-align: justify;
    }
    
    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      font-size: 10pt;
    }
    
    .pdf-table th {
      background: #F59E0B;
      color: white;
      padding: 10px 8px;
      text-align: left;
      font-weight: 600;
    }
    
    .pdf-table td {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
    
    .pdf-table tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    .pdf-table tr:hover {
      background: #fff8e6;
    }
    
    .pdf-table .number {
      text-align: right;
    }
    
    .pdf-table .center {
      text-align: center;
    }
    
    .pdf-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    
    .pdf-summary-item {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #F59E0B;
    }
    
    .pdf-summary-label {
      font-size: 9pt;
      color: #666;
      text-transform: uppercase;
    }
    
    .pdf-summary-value {
      font-size: 16pt;
      font-weight: bold;
      color: #1a1a1a;
      margin-top: 5px;
    }
    
    .pdf-divider {
      border: none;
      border-top: 1px solid #ddd;
      margin: 20px 0;
    }
    
    .pdf-space {
      height: 20px;
    }
    
    .pdf-footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
      font-size: 9pt;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-header">
    <div class="pdf-logo">
      <div class="pdf-logo-icon">AO</div>
      <span class="pdf-logo-text">AppObras</span>
    </div>
    <div class="pdf-date">
      Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
    </div>
  </div>
  
  ${bodyContent}
  
  <div class="pdf-footer">
    <p>AppObras - Sistema de Gestão de Obras</p>
    <p>Documento gerado automaticamente</p>
  </div>
</body>
</html>`;
}

function generateTableHTML(data: Record<string, any>[], headers?: Record<string, string>): string {
  if (!data || data.length === 0) return '<p>Sem dados para exibir</p>';
  
  const keys = Object.keys(data[0]);
  const headerLabels = headers ? keys.map(key => headers[key] || key) : keys;
  
  let html = '<table class="pdf-table"><thead><tr>';
  headerLabels.forEach(header => {
    html += `<th>${escapeHtml(header)}</th>`;
  });
  html += '</tr></thead><tbody>';
  
  data.forEach(item => {
    html += '<tr>';
    keys.forEach(key => {
      const value = item[key];
      const isNumber = typeof value === 'number';
      const cellClass = isNumber ? 'number' : '';
      const displayValue = value === null || value === undefined ? '-' : 
        isNumber ? formatNumber(value) : String(value);
      html += `<td class="${cellClass}">${escapeHtml(displayValue)}</td>`;
    });
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  return html;
}

function generateSummaryHTML(items: { label: string; value: string | number }[]): string {
  let html = '<div class="pdf-summary">';
  items.forEach(item => {
    html += `
      <div class="pdf-summary-item">
        <div class="pdf-summary-label">${escapeHtml(item.label)}</div>
        <div class="pdf-summary-value">${escapeHtml(String(item.value))}</div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

// Helpers
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

// Funções específicas para relatórios do AppObras

export function exportOrcamentoToExcel(orcamento: any) {
  const data = orcamento.itens.map((item: any) => ({
    Categoria: item.categoria,
    Descrição: item.descricao,
    Unidade: item.unidade,
    Quantidade: item.quantidade,
    'Valor Unitário': item.valorUnitario,
    'Valor Total': item.valorTotal
  }));

  exportToExcel(data, `orcamento_${orcamento.nome.replace(/\s+/g, '_')}`, 'Orçamento', {
    Categoria: 'Categoria',
    Descrição: 'Descrição',
    Unidade: 'Un.',
    Quantidade: 'Qtd.',
    'Valor Unitário': 'Valor Unit. (R$)',
    'Valor Total': 'Valor Total (R$)'
  });
}

export function exportDiarioObraToPDF(registro: any) {
  const content: PDFContent[] = [
    { type: 'title', data: `Diário de Obra - ${new Date(registro.data).toLocaleDateString('pt-BR')}` },
    { type: 'summary', data: [
      { label: 'Clima', value: registro.clima.condicao },
      { label: 'Temperatura', value: `${registro.clima.temperatura}°C` },
      { label: 'Trabalhadores', value: Object.values(registro.maoDeObra).reduce((a: number, b: any) => a + (typeof b === 'number' ? b : 0), 0) },
      { label: 'Responsável', value: registro.responsavel }
    ]},
    { type: 'divider' },
    { type: 'subtitle', data: 'Mão de Obra' },
    { type: 'table', data: [
      { Função: 'Pedreiros', Quantidade: registro.maoDeObra.pedreiros },
      { Função: 'Serventes', Quantidade: registro.maoDeObra.serventes },
      { Função: 'Eletricistas', Quantidade: registro.maoDeObra.eletricistas },
      { Função: 'Encanadores', Quantidade: registro.maoDeObra.encanadores },
      { Função: 'Outros', Quantidade: registro.maoDeObra.outros },
    ]},
    { type: 'subtitle', data: 'Atividades Realizadas' },
    { type: 'table', data: registro.atividadesRealizadas.map((at: string, i: number) => ({ '#': i + 1, Atividade: at })) },
    { type: 'subtitle', data: 'Observações' },
    { type: 'text', data: registro.observacoesGerais || 'Sem observações.' }
  ];

  exportToPDF(`Diário de Obra - ${registro.data}`, content, `diario_obra_${registro.data}`);
}

export function exportMedicoesToPDF(etapas: any[], resumo: any) {
  const content: PDFContent[] = [
    { type: 'title', data: 'Relatório de Medições e Avanço' },
    { type: 'summary', data: [
      { label: 'Avanço Físico', value: `${resumo.percentualFisico.toFixed(1)}%` },
      { label: 'Avanço Financeiro', value: `${resumo.percentualFinanceiro.toFixed(1)}%` },
      { label: 'Valor Medido', value: `R$ ${resumo.valorMedido.toLocaleString('pt-BR')}` },
      { label: 'Valor Total', value: `R$ ${resumo.valorTotal.toLocaleString('pt-BR')}` }
    ]},
    { type: 'divider' },
    { type: 'subtitle', data: 'Avanço por Etapa' },
    { type: 'table', data: etapas.map(e => ({
      Etapa: e.nome,
      'Peso (%)': e.pesoPercentual,
      'Previsto (R$)': e.valorPrevisto,
      'Medido (R$)': e.valorMedido,
      'Avanço (%)': e.percentualAcumulado
    })), headers: {
      Etapa: 'Etapa',
      'Peso (%)': 'Peso (%)',
      'Previsto (R$)': 'Valor Previsto',
      'Medido (R$)': 'Valor Medido',
      'Avanço (%)': 'Avanço (%)'
    }}
  ];

  exportToPDF('Relatório de Medições', content, `relatorio_medicoes_${new Date().toISOString().split('T')[0]}`, {
    orientation: 'landscape'
  });
}

export function exportFolhaPagamentoToExcel(trabalhadores: any[], periodo: string) {
  const data = trabalhadores.map(t => ({
    Nome: t.nome,
    Função: t.funcao,
    'Dias Trabalhados': t.diasTrabalhados,
    'Horas Normais': t.horasTrabalhadas,
    'Horas Extras': t.horasExtras,
    'Valor/Hora': t.valorHora,
    'Total Bruto': t.valorTotal
  }));

  exportToExcel(data, `folha_pagamento_${periodo}`, 'Folha de Pagamento');
}
