// Patient Table
const columns = [
  {
    dataField: 'dataOra',
    text: 'Data/Ora di prelievo',
  },
  {
    dataField: 'heartRate',
    text: 'Heart Rate',
  },
  {
    dataField: 'temperature',
    text: 'Temperature',
  },
]

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
}

// Sensors data
const dati = [
  { dataOra: '18/03/2021 08:45', heartRate: '60-100', temperature: '22' },
  { dataOra: '19/03/2021 09:45', heartRate: '70-90', temperature: '31' },
  { dataOra: '20/03/2021 10:45', heartRate: '80-120', temperature: '33' },
  { dataOra: '21/03/2021 11:45', heartRate: '130-150', temperature: '42' },
  { dataOra: '22/03/2021 12:45', heartRate: '120-140', temperature: '26' },
  { dataOra: '23/03/2021 13:45', heartRate: '70-130', temperature: '33' },
]

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 1500 },
  { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
  { name: 'Page C', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page D', uv: 100, pv: 2400, amt: 2400 },
]

export { columns, selectRow, dati, data }
