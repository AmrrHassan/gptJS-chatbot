import colors from "colors";
let inactivityTimeout;

export const resetInactivityTimer = () => {
  if (inactivityTimeout) clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    console.log(
      colors.bold.red(`Session timeout due to inactivity. Exiting...`)
    );
    process.exit(0);
  }, 1 * 60 * 1000); // 5 minutes
};
