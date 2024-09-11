"use client";

import React from "react";
import { Flex, Text } from "@/once-ui/components";
import styles from "@/app/projects/projects.module.scss";

interface TableOfContentsProps {
  structure: (string | { [key: string]: string[] })[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderItem = (
    item: string | { [key: string]: string[] },
    index: number,
  ) => {
    if (typeof item === "string") {
      return (
        <Flex
          key={index}
          style={{ cursor: "pointer" }}
          className={styles.hover}
          gap="8"
          alignItems="center"
          onClick={() => scrollTo(item, 80)}
        >
          <Flex height="1" width="16" background="neutral-strong" />
          <Text>{item}</Text>
        </Flex>
      );
    } else if (typeof item === "object") {
      const [sectionTitle, nestedItems] = Object.entries(item)[0];
      return (
        <Flex key={index} gap="16" direction="column">
          <Flex
            style={{ cursor: "pointer" }}
            className={styles.hover}
            gap="8"
            alignItems="center"
            onClick={() => scrollTo(sectionTitle, 80)}
          >
            <Flex height="1" width="16" background="neutral-strong" />
            <Text>{sectionTitle}</Text>
          </Flex>

          <Flex direction="column" gap="12" paddingLeft="24">
            {nestedItems.map((nestedItem, nestedIndex) => (
              <Flex
                key={nestedIndex}
                style={{ cursor: "pointer" }}
                className={styles.hover}
                gap="12"
                alignItems="center"
                onClick={() => scrollTo(nestedItem, 80)}
              >
                <Flex height="1" width="8" background="neutral-strong" />
                <Text>{nestedItem}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      );
    }
  };

  return (
    <Flex
      style={{
        left: "0",
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      direction="column"
      hide="s"
    >
      {structure.map((item, index) => renderItem(item, index))}
    </Flex>
  );
};

export default TableOfContents;
