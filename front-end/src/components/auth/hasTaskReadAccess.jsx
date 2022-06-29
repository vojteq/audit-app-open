export const hasTaskReadAccess = (user, accessedTeams, taskDetails) => {
  if (
    accessedTeams.some((team) => team.name === taskDetails.teamName) ||
    user.id === taskDetails.taskManagerId ||
    taskDetails.teamMembersNames.some((teamMember) => teamMember.id === user.id)
  ) {
    return true;
  } else {
    return false;
  }
};
