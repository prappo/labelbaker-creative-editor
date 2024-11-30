export default class Sheet {
  constructor(inputElement) {
    var input_dom_element = document.getElementById(inputElement);
    input_dom_element.addEventListener('change', this.handleFileAsync, false);
  }

  async handleFileAsync(e) {
    const file = e.target.files[0];
    const inputData = await file.arrayBuffer();

    const wb = XLSX.read(inputData);
    const ws = wb.Sheets[wb.SheetNames[0]];

    /* Generate HTML */
    // var output = document.getElementById('TableContainer');
    // output.innerHTML = XLSX.utils.sheet_to_html(ws);

    var data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    localStorage.setItem('sheetData', JSON.stringify(data));
  }
}
