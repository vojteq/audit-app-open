export const hasTaskWriteAccess = (user, accessedTeams, taskDetails) => {
  if (
    user.roles.includes("ADMIN") ||
    user.id === taskDetails.taskManagerId ||
    taskDetails.teamMembersNames.some((teamMember) => teamMember.id === user.id)
  ) {
    return true;
  } else {
    return false;
  }
};
