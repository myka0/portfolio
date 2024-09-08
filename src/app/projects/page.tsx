"use client";

import React from "react";
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
} from "@/once-ui/components";
import Link from "next/link";

const projects = [
  {
    title: "Umbra Writer",
    description: "Real-time web-based rich text editor built with Nuxt3.",
    techStack: ["Vue.js", "Nuxt3", "TypeScript", "Prisma", "MongoDB"],
    href: "/projects/umbra-writer",
    github: "https://github.com/myka0/umbra-writer",
    img: "",
    alt: "Umbra Writer",
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
  },
];

export default function Projects() {
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
        maxWidth={48}
        direction="column"
        alignItems="center"
        flex={1}
      >
        <Flex
          as="section"
          direction="column"
          alignItems="center"
          fillWidth
          maxWidth={64}
          paddingY="l"
          gap="l"
        >
          <Heading variant="display-strong-s">Projects</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            A showcase of my projects, exploring web development, programming
            languages, and more.
          </Text>
        </Flex>

        <Grid
          columns="repeat(1, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          gap="l"
          fillWidth
          maxWidth={48}
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

              <SmartImage
                src={project.img}
                alt={project.alt}
                aspectRatio="10/9"
                radius="m"
                objectFit="cover"
              />
            </Flex>
          ))}
        </Grid>

        <Flex
          as="footer"
          position="relative"
          fillWidth
          paddingX="l"
          paddingY="m"
          justifyContent="right"
        >
          <Flex gap="12">
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
              mykamayer0@gmail.com
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
