"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex, ToggleButton } from "@/once-ui/components";
import styles from "@/app/components/Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <Flex
      style={{ height: "fit-content" }}
      className={styles.position}
      as="header"
      zIndex={9}
      fillWidth
      padding="8"
      justifyContent="center"
    >
      <Flex
        background="surface"
        border="neutral-medium"
        borderStyle="solid-1"
        radius="m-4"
        shadow="l"
        padding="4"
        justifyContent="center"
      >
        <Flex gap="4" textVariant="body-default-s">
          <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"}>
            <Flex paddingX="2" hide="s">
              Home
            </Flex>
          </ToggleButton>
          <ToggleButton
            prefixIcon="grid"
            href="/projects"
            selected={pathname === "/projects"}
          >
            <Flex paddingX="2" hide="s">
              Projects
            </Flex>
          </ToggleButton>
          <ToggleButton
            prefixIcon="person"
            href="/resume"
            selected={pathname.startsWith("/resume")}
          >
            <Flex paddingX="2" hide="s">
              Resume
            </Flex>
          </ToggleButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
