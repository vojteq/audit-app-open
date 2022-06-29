import json
import plotly.graph_objects as go
import sys
import os

# przykładowe wywołanie:
# python tableD.py "{\"tableName\": \"test_D\",\"content\": [{\"name\": \"test1\",\"count\": 15},{\"name\": \"test2\",\"count\": 4},{\"name\": \"test3\",\"count\": 41}]}"

headerColor = '#f8f9fa'
rowEvenColor = '#e9ecef'
rowOddColor = '#ced4da'

statusMapper = {
    'NOT_STARTED': 'Nierozpoczęte',
    'IN_PROGRESS': 'W realizacji',
    'FINISHED': 'Ukończone',
    'CANCELLED': 'Anulowane',
    'MOVED': 'Przeniesione',
    'SUSPENDED': 'Zawieszone',
}


def formatTitle(name, status):
    name = name.replace("__", " ")
    status = statusMapper[status]
    return name + " - " + status


inputArgs = json.loads(sys.argv[1])
data = inputArgs["taskStats"]
values = [[formatTitle(i["name"], i["taskStatus"]) for i in data],
          [i["taskCount"] for i in data]]

fig = go.Figure(data=[go.Table(
    columnwidth=[500, 200],
    header=dict(
        values=['<b>Spółka - status zadania</b>', '<b>Status realizacji na dzień raportowania</b>'],
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
filePath = os.path.abspath("generatedData") + "/" + inputArgs.get("directory") \
           + "/tabele/tabela_D_{}.jpg".format(inputArgs["year"])
fig.write_image(filePath)
# fig.show()
