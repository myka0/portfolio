import { Flex, Button } from "@/once-ui/components";
import styles from "@/app/components/Footer.module.scss";

export const Footer = () => {
  return (
    <Flex
      style={{ height: "fit-content" }}
      className={styles.position}
      as="footer"
      zIndex={8}
      fillWidth
      padding="8"
      justifyContent="center"
    >
      <Flex
        as="footer"
        position="relative"
        fillWidth
        paddingX="l"
        paddingY="m"
        justifyContent="right"
      >
        <Flex gap="12" maxWidth={64}>
          <Button
            href="https://github.com/myka0"
            prefixIcon="github"
            size="s"
            variant="tertiary"
          >
            GitHub
          </Button>
          <Button
            href="mailto:mykamayer@gmail.com"
            prefixIcon="person"
            size="s"
            variant="tertiary"
          >
            Contanct Me
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
