import { createTheme, ThemeProvider } from "smarthr-ui";

type Props = {
  children: React.ReactNode;
};

const theme = createTheme();

export const StyleProvider = ({ children }: Props): React.ReactNode => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
