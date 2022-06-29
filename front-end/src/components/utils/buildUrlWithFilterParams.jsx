export const buildUrlWithFilterParams = (
  baseUrl,
  taskManagersIds,
  teamsIds,
  methodologiesNames,
  taskStatuses,
  adHoc,
  maxDays
) => {
  let url = baseUrl;

  if (!!taskManagersIds && taskManagersIds.length > 0) {
    url = url + "&manager=" + taskManagersIds.join("&manager=");
  }
  if (!!teamsIds && teamsIds.length > 0) {
    url = url + "&team=" + teamsIds.join("&team=");
  }
  if (!!methodologiesNames && methodologiesNames.length > 0) {
    url = url + "&methodology=" + methodologiesNames.join("&methodology=");
  }
  if (!!taskStatuses && taskStatuses.length > 0) {
    url = url + "&status=" + taskStatuses.join("&status=");
  }
  if (!!adHoc && adHoc.length > 0) {
    url = url + "&adHoc=" + adHoc.join("&adHoc=");
  }
  if (!!maxDays) {
    url = url + "&maxDays=" + maxDays;
  }

  return url;
};
