import json
import os
import plotly.graph_objects as go
import sys

# przykładowe wywołanie:
# python tableA.py "{\"tableName\": \"test_A\",\"content\": [{\"topic\": \"test 2\",\"type\": \"control\",\"status\": \"finished\"},{\"topic\": \"test 1\",\"type\": \"audit\",\"status\": \"inProgress\"}]}

headerColor = '#f8f9fa'
rowEvenColor = '#e9ecef'
rowOddColor = '#ced4da'

statusMapper = {
    'TOTAL': 'Wszystkie',
    'NOT_STARTED': 'Nierozpoczęte',
    'IN_PROGRESS': 'W realizacji',
    'FINISHED': 'Ukończone',
    'CANCELLED': 'Anulowane',
    'MOVED': 'Przeniesione',
    'SUSPENDED': 'Zawieszone',
}

typeMapper = {
    "CONTROL": "Kontrola",
    "AUDIT": "Audyt"
}

inputArgs = json.loads(sys.argv[1])
data = inputArgs["content"]
values = [[i["topic"].replace("__", " ") for i in data],
          [typeMapper.get(i["taskType"]) for i in data],
          [statusMapper.get(i["taskStatus"]) for i in data]]

fig = go.Figure(data=[go.Table(
    columnwidth=[500, 120, 120],
    header=dict(
        values=['<b>Temat</b>', '<b>Rodzaj zadania</b>', '<b>Status realizacji</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['center', 'center'],
        font=dict(color='black', size=16)
    ),
    cells=dict(
        values=values,
        line_color='darkslategray',
        fill_color=[[rowOddColor, rowEvenColor] * int((len(data) / 2) + 1)],
        align=['left', 'center'],
        font=dict(color='black', size=14),
        height=30
    ))
])

fig.update_layout(
    autosize=False,
    width=1200,
    height=35 * len(data) + 150,
    margin=dict(
        l=30,
        r=30,
        b=50,
        t=50,
    ),
)
filePath = os.path.abspath("generatedData") + "/" + inputArgs.get("directory")\
           + "/tabele/tabela_A_{}_{}.jpg".format(inputArgs["taskType"], inputArgs["year"])
fig.write_image(filePath)
# fig.show()
