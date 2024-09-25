
import colors from "colors";
import readlineSync from "readline-sync";

const profiles = {
  friendly:
    "You are a friendly and casual assistant, always happy to help with a relaxed tone.",
  formal:
    "You are a formal assistant, providing professional and structured responses.",
  playful:
    "You are a playful assistant, using lighthearted language and emojis.",
};

export const chooseProfile = () => {
  const profileNames = Object.keys(profiles);
  console.log(
    colors.bold.yellow(`Available profiles: ${profileNames.join(", ")}`)
  );
  const choice = readlineSync
    .question(colors.bold.yellow("Choose a profile: "))
    .toLowerCase();

  return profiles[choice] || profiles["friendly"];
};
