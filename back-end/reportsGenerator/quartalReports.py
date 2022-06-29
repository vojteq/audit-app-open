import json

import matplotlib.pyplot as plt
import math
import sys
import os

# przykładowe wywołanie:
# python quartalReports.py "{\"total\":14, \"notStarted\":5, \"inProgress\":2, \"finished\":3, \"cancelled\":1, \"moved\":1, \"suspended\":2, \"year\":2021, \"teamName\":\"TW\", \"quarter\":3}"

statusMapper = {
    'total': 'Wszystkie',
    'notStarted': 'Nierozpoczęte',
    'inProgress': 'W realizacji',
    'finished': 'Ukończone',
    'cancelled': 'Anulowane',
    'moved': 'Przeniesione',
    'suspended': 'Zawieszone',
}

colors = ['#8ecae6', '#219ebc', '#00a6fb', '#0582ca', '#006494', '#003554', '#0a1128']

inputArgs = json.loads(sys.argv[1])
data = {
    'total': inputArgs.get('total'),
    'notStarted': inputArgs.get('notStarted'),
    'inProgress': inputArgs.get('inProgress'),
    'finished': inputArgs.get('finished'),
    'cancelled': inputArgs.get('cancelled'),
    'moved': inputArgs.get('moved'),
    'suspended': inputArgs.get('suspended'),
}
maxCount = max(data.values())

fileName = "/report-team_{}-year_{}-quarter_{}.png" \
    .format(inputArgs.get('teamName'), inputArgs.get('year'), inputArgs.get('quarter'))

filePath = os.path.abspath("generatedData") + "/" + inputArgs.get("directory") + fileName

f = open(filePath, "w+")
f.close()

x_pos = list(data.keys())
plt.style.use('ggplot')
plt.figure(figsize=(10, 5))  # size = (x * 100 px, y * 100 px)
plt.yticks(range(0, math.ceil(maxCount) + 1, math.ceil(maxCount/8)))
barList = plt.bar(x_pos, data.values())
for i in range (0, len(barList)):
    barList[i].set_color(colors[i])
plt.xlabel("Status zadania")
plt.ylabel("Ilość zadań o danym statusie")
plt.title("Zespół {} - PLAN {} - KWARTAŁ {}"
          .format(inputArgs.get('teamName').replace("__", " "), inputArgs.get('year'), inputArgs.get('quarter')))
plt.xticks(x_pos, statusMapper.values())
plt.savefig(filePath)
