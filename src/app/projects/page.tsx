"use client";

import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  InlineCode,
  SmartImage,
  Background,
  Icon,
  Tag,
} from "@/once-ui/components";
import Link from "next/link";

const projects = [
  {
    title: "Umbra Writer",
    description: "Real-time web-based rich text editor built with Nuxt3.",
    techStack: ["Vue.js", "Nuxt3", "TypeScript", "Prisma", "MongoDB"],
    href: "/projects/umbra-writer",
    github: "https://github.com/myka0/umbra-writer",
    img: "/images/umbra-writer.png",
    alt: "Umbra Writer",
    status: "In Progress",
  },
  {
    title: "Wetpaint Lang",
    description:
      "A dynamically typed and interpreted programming language written in C++.",
    techStack: ["C++20", "CMake"],
    href: "/projects/wetpaint",
    github: "https://github.com/myka0/wetpaint",
    img: "/images/wetpaint.svg",
    alt: "Wetpaint Programming Langauge Example",
    status: "Completed",
  },
];

const StatusBadge = ({ status }) => {
  if (status === "Completed") {
    return <Tag variant="success" size="l" label={status}></Tag>;
  } else {
    return <Tag variant="warning" size="l" label={status}></Tag>;
  }
};

export default function Projects() {
  const [maxWidth, setMaxWidth] = useState(48);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (window.innerWidth <= 768) {
        setMaxWidth(40);
      } else {
        setMaxWidth(48);
      }
    };

    updateMaxWidth();

    window.addEventListener("resize", updateMaxWidth);

    return () => window.removeEventListener("resize", updateMaxWidth);
  }, []);

  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}
    >
      <Background dots={true} lines={false} />

      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        minHeight="0"
        maxWidth={maxWidth}
        direction="column"
        alignItems="center"
        flex={1}
      >
        <Flex
          as="section"
          direction="column"
          fillWidth
          marginLeft="64"
          paddingY="l"
          gap="s"
        >
          <Heading variant="display-strong-s">Personal Projects</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            A showcase of my projects, exploring web development and programming
            language design.
          </Text>
        </Flex>

        <Grid
          columns="repeat(1, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          gap="l"
          fillWidth
          maxWidth={maxWidth}
          paddingX="l"
        >
          {projects.map((project, index) => (
            <Flex
              key={index}
              direction="column"
              gap="m"
              padding="l"
              border="neutral-medium"
              borderStyle="solid-1"
              radius="m"
              style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <Link href={project.href}>
                <Flex direction="column">
                  <Flex fillWidth paddingY="8" gap="12" alignItems="center">
                    <Heading>{project.title}</Heading>
                    <Icon size="s" name="arrowUpRight" />
                  </Flex>

                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {project.description}
                  </Text>
                </Flex>
              </Link>

              <Flex alignItems="center" gap="m" justifyContent="space-between">
                <Flex alignItems="center" gap="m">
                  <InlineCode
                    className="shadow-m"
                    style={{
                      width: "fit-content",
                      padding: "var(--static-space-8) var(--static-space-16)",
                    }}
                  >
                    {project.techStack.join(" | ")}
                  </InlineCode>
                  <Link href={project.github} target="_blank">
                    <Icon name="github" size="l" />
                  </Link>
                </Flex>
                <StatusBadge status={project.status} />
              </Flex>

              <SmartImage
                src={project.img}
                alt={project.alt}
                aspectRatio="8/7"
                radius="m"
              />
            </Flex>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
